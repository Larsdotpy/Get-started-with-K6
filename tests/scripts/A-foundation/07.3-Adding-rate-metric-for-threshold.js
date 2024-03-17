import http from "k6/http";
import { check } from "k6";
import { Rate } from "k6/metrics";

/*
- split up the two checks into two separate checks and add them to the error rate variable
- see the difference in error response metric
 */

// define a new rate metric
export let errorRate = new Rate('errors')

// define options with the thresholds
export let options = {
    vus: 10,
    duration: '30s',
    iterations: 10,
    thresholds: {
        errors: ['rate<0.1'] // less than 10% errors otherwise execution stops
    }
}

export default function (){
    let response = http.get('https://www.polteq.com');

    console.log(`Response status: ${response.status}, body size: ${response.body.length} bytes`)

    // alternative for rounding body.length to MiB
    // console.log(`Response status: ${response.status}, body size: ${Math.round(response.body.length/1024).toFixed(2)} MiB`)

    let results = check(response, {
        'is response status 200:': (r) => r.status === 200,
        'body size is less than 70.000 bytes:' : (r) => r.body.length <= 70000  // home page of the Polteq website should be smaller than ≈ 70 Mb
    });

    errorRate.add(!results) // error rate is boolean value, if results from checks are OK, than error is not true. That's why there is a !
}