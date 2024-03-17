import http from 'k6/http';
import { Trend } from 'k6/metrics';

let myDurationTrend = new Trend('my_duration_trend');

export let options = {
    vus: 10,
    duration: '30s',
    iterations: 10
}

export default function (){
    let response = http.get('https://www.polteq.com');
    console.log(`timings-duration: ${JSON.stringify(response.timings.duration)}`)

    // add the response duration to the custom trend metric
    myDurationTrend.add(response.timings.duration);

}