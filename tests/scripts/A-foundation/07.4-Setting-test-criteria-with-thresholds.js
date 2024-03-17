import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 10,
    iterations: 40,
    thresholds: {
        http_req_failed: ['rate<=0.05'],
        http_req_duration: [{
            threshold: 'p(95)<=500',
            abortOnFail: false,
        }],
        // The threshold states that 90% or more of all checks in the test should be successful. Otherwise, the test will fail.
        checks: ['rate>=0.9'],
    },
};

export default function() {
    let url = 'https://httpbin.test.k6.io/post';
    let response = http.post(url, 'Hello world!');
    check(response, {
        'Application says hello': (r) => r.body.includes('Hello world!'),
        // 'Application says Bonjour': (r) => r.body.includes('Bonjour!')
    });
}