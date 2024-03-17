import http from 'k6/http';
import {Trend} from 'k6/metrics';

/*
- What is the difference between build in http req duration and the custom duration metrics?
 */

let trendPolteqDuration = new Trend('trend_polteq_duration');
let trendGoogleDuration = new Trend('trend_google_duration');

export let options = {
    vus: 10,
    duration: '30s',
    iterations: 10
}

export default function () {
    let polteqResponse = http.get('https://www.polteq.com');
    console.log(`Polteq http duration: ${JSON.stringify(polteqResponse.timings.duration)}`)

    // add the response duration to the custom trend metric
    trendPolteqDuration.add(polteqResponse.timings.duration);

    let googleResponse = http.get('https://www.google.com');
    console.log(`Google http duration: ${JSON.stringify(googleResponse.timings.duration)}`)

    // add the response duration to the custom trend metric
    trendGoogleDuration.add(googleResponse.timings.duration);

}