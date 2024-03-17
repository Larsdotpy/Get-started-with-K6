import http from 'k6/http';
import {Counter} from 'k6/metrics';

/*
- what is the custom counter counting?
- what is the impact of the summaryTrendStats in the options on the metrics?
 */

let myCounter = new Counter('my_counter');

export let options = {
    vus: 10,
    duration: '30s',
    iterations: 10,
    // summaryTrendStats: ['count', 'p(95)', 'p(99)', 'p(99.9)']
}

export default function () {
    let response = http.get('https://www.polteq.com');
    console.log(`timings-duration: ${JSON.stringify(response.timings.duration)}`)

    // count number of home-page duration is below 100 ms
    if (response.timings.duration <= 100) {
        myCounter.add(1)
    }
}