import grpc from 'k6/experimental/grpc';
import { check, sleep } from 'k6';

/*
- laat de service falen door het verlagen van de thresholds

Zie grpc request&response server: https://grpcbin.test.k6.io

see more info and training about grpc services:
- https://grpc.io/docs/what-is-grpc/core-concepts/
- https://tamerlan.dev/the-beginners-guide-to-grpc-with-examples/
- https://www.youtube.com/playlist?list=PLy_6D98if3UJd5hxWNfAqKMr15HZqFnqf
 */

export const options = {
// discardResponseBodies: true,
    vus: 5000,  // Use too many VUs to fail the test by thresholds
    duration: "5s",
    thresholds: {
        grpc_req_duration: [
            {
                threshold: "p(95)<=10000",  // Set to a very low value to test thresholds
                abortOnFail: true,
                delayAbortEval: "1s",
            },
            {
                threshold: "p(99.9)<=30000",  // 99.9 percentage of the requests are under 500ms
            },
        ],
    },
    summaryTrendStats: ['p(95)', 'p(99)', 'p(99.9)']
};


const client = new grpc.Client();
client.load(['proto-definitions'], 'hello.proto');

export default () => {
    client.connect('grpcbin.test.k6.io:9001', {
        // plaintext: false
    });

    const data = { greeting: 'Bert' };
    const response = client.invoke('hello.HelloService/SayHello', data);

    check(response, {
        'status is OK': (r) => r && r.status === grpc.StatusOK,
    });

    console.log(JSON.stringify(response.message));

    client.close();
    sleep(1);
};



