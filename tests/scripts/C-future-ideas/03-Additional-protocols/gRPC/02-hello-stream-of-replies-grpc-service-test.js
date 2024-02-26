import grpc from 'k6/net/grpc';

/*
- voeg je naam toe aan het array en controleer of er gedag gezegd wordt

Zie grpc request&response server: https://grpcbin.test.k6.io

 */

const client = new grpc.Client();
client.load(['proto-definitions'], 'hello.proto');

export default () => {
    client.connect('grpcbin.test.k6.io:9001', {
        // plaintext: false
    });

    // LotsOfReplies method
    const stream = new grpc.Stream(client,'hello.HelloService/LotsOfReplies');
    const data = [{greeting:'Bert'}, {greeting:'Marc'}, {greeting:'Tim'}, {greeting:'Nadine'}, {greeting:'Riny'}];

    stream.on('data', (data) => {
        console.log(`received: ${JSON.stringify(data)}`);
    })

    // write one message
    let randomMember = Math.floor(Math.random() * data.length)
    let member = data[randomMember];
    stream.write(member);

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
};





