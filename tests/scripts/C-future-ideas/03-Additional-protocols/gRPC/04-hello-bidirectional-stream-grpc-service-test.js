import grpc from 'k6/net/grpc';
import { check, sleep } from 'k6';

/*
- voeg je naam toe aan het array en controleer of er gedag gezegd wordt
- vergelijk gedrag van BidiHello en LotsOfGreetings methode

Zie grpc request&response server: https://grpcbin.test.k6.io

 */

const client = new grpc.Client();
client.load(['proto-definitions'], 'hello.proto');

export default () => {
    client.connect('grpcbin.test.k6.io:9001', {
        // plaintext: false
    });

    // BidiHello method
    const stream = new grpc.Stream(client,'hello.HelloService/BidiHello');

    // write one message
    stream.write({greeting:'Bert'})
    stream.write({greeting:'Marc'});
    stream.write({greeting:'Tim'});
    stream.write({greeting:'Nadine'});
    stream.write({greeting:'Riny'});
    stream.write({greeting:'Riny'});


    // listen to receiving data events
    stream.on('data', (data) => {
        console.log(`received: ${JSON.stringify(data)}`);
    })

    // Signals the server that the client has finished sending the data
    stream.on('end', function (){
        client.close();
        console.log('All done');
    });

    // sets up a handler for the error event (an error occurs)
    stream.on('error', function (e) {
        // An error has occurred and the stream has been closed.
        console.log('Error: ' + JSON.stringify(e));
    });

    stream.end();
    sleep(1);
};





