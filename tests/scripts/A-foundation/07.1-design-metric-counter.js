import http from 'k6/http';
import { Counter } from 'k6/metrics';

let myCounter = new Counter('my_counter');

export let options = {
    vus: 10,
    duration: '30s',
    iterations: 10
}

export default function (){
    let response = http.get('https://www.polteq.com');
 console.log(`timings-duration: ${JSON.stringify(response.timings.duration)}`)

    // count number of home-page duration is below 100 ms
    if (response.timings.duration <= 100){
        myCounter.add(1)
    }
}