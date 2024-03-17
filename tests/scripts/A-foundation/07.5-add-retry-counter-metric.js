import http from "k6/http";
import {Counter} from "k6/metrics";
import {sleep} from "k6";
import {vu} from "k6/execution";

/*
- How can you see that a metric is a global value for all VUs?
- Change the options and console log to make this visual
 */

export let options = {
    vus: 1,
    duration: '10s',
    iterations: 1
}

// counter is a global metric over all the VUs
let retryCounter = new Counter('max_retry_counter');

export default function () {
    //add retry loop
    let maxAttemps = 5;
    for (let retries = maxAttemps; retries > 0; retries--) {
        let numberOfAttemps = maxAttemps - retries + 1;
        let response = http.get('https://www.polteq.com');

        // if status is not 200, then retry the request
        if (response.status !== 404) {
            retryCounter.add(1);
            console.log(`Response status is not correct, retry attempt is ${numberOfAttemps}`);
            // console.log(`Response status is not correct, retry attempt is ${numberOfAttemps} VU: ${vu.idInTest}`);
            sleep(1);
        } else {
            retries = 0
        }
    }
}

