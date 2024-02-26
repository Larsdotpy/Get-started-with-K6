import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";

// K6 options for the load script
export let options = {
    vus: 10,
    iterations: 40,
};

export default function() {
    let url = 'https://httpbin.test.k6.io/post';
    let response = http.post(url, 'Hello world!');
    check(response, {
        'Application says hello': (r) => r.body.includes('Hello world!')
    });

    let thinkTime;
    // fixed sleep time
    thinkTime = sleep(1);

    // random sleep time
    // thinkTime = sleep(Math.random() * 5);

    // random between boundaries sleep time
    // thinkTime = sleep(randomIntBetween(1,5));
}