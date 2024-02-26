import grpc from 'k6/net/grpc';
import { check } from 'k6';

/*
- open de proto file van de addsvc service
- Welke getallen zijn toegestaan als input op de Sum methode
- wijzig de response van de Sum mehtode in een number
- Welke sting waardes/lengtes zijn toegestaan op de Concat methode


Zie grpc request&response server: https://grpcbin.test.k6.io

 */

const client = new grpc.Client();
client.load(['proto-definitions'], 'addsvc.proto');

export default () => {
    client.connect('grpcbin.test.k6.io:9001', {
        // plaintext: false
    });

    // Sum method
    const sum = { a: -1, b: 0 };
    const responseAdd = client.invoke('addsvc.Add/Sum', sum);

    check(responseAdd, {
        'status is OK': (r) => r && r.status === grpc.StatusOK,
    });

    console.log(JSON.stringify(responseAdd.message));
    // console.log(responseAdd.message.v);

    // Concat method
    const concat = { a: "Marc ", b: "Marc" };
    const responseConcat = client.invoke('addsvc.Add/Concat', concat);

    check(responseConcat, {
        'status is OK': (r) => r && r.status === grpc.StatusOK,
    });

    console.log(`Concat response: ${responseConcat.message.v}`);
    // console.log(responseAdd.message.v);

    client.close();
};



