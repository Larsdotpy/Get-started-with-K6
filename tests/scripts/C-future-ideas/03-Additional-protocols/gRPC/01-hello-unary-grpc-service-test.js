import grpc from 'k6/net/grpc';
import { check, sleep } from 'k6';

/*
- vervang naam met je eigen naam
- voeg een check toe op basis van status constants: https://k6.io/docs/javascript-api/k6-net-grpc/constants/
- open het proto file en zie wat voor gRPC methode SayHello is

Zie grpc request&response server: https://grpcbin.test.k6.io

 */

const client = new grpc.Client();
client.load(['proto-definitions'], 'hello.proto');

export default () => {
    client.connect('grpcbin.test.k6.io:9001', {
        // plaintext: false
    });

    // SayHello method
    const data = { greeting: 'Bert' };
    const response = client.invoke('hello.HelloService/SayHello', data);

    check(response, {
        'status is OK': (r) => r && r.status === grpc.StatusOK,
    });

    console.log(JSON.stringify(response.message));

    client.close();
    sleep(1);
};



