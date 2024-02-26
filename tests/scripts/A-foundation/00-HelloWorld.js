import http from "k6/http";
import {check, sleep} from "k6";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";

// const domain = `${__ENV.DOMAIN}`;

export async function sayHello() {

    let url = `https://httpbin.test.k6.io/post`;
    let response = await http.post(url, 'Hello world!');
    check(response, {
        'Application says hello': (r) => r.body.includes('Hello world!'),
        'is status 200': (r) => r.status === 200
    });

    console.debug(response.json().data)

    //let randomSleep = Math.random() * 5;
    let randomSleep = randomIntBetween(1,5);
    console.debug(`random sleep: ${randomSleep}`)
    sleep(randomSleep);
}