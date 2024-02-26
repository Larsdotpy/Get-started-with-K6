import http from 'k6/http';
import { Trend, Gauge } from "k6/metrics";

const bodySize = new Gauge('body_size');
// https://k6.io/docs/javascript-api/k6-metrics/trend/ => when trend is time, then set isTime to true
const requestDuration = new Trend('rec_send_differential',true)

export const options = {
    thresholds: {
        rec_send_differential: ['p(99.9)<2'],
    },
    summaryTrendStats: ['count', 'p(95)', 'p(99)', 'p(99.9)']
};

/*
    k6 run --iterations 20 11.2-Creating-and-using-custom-metrics.js
 */

export default function () {
    let response = http.get('https://test-api.k6.io/public/crocodiles/', {
        tags: { name: 'All crocs' },
    });

    const crocs = JSON.parse(response.body)
    //bodySize is een beetje misleidend, want lengte verwijst na het parsen naar aantal elementen in het object dus herschreven naar aantal bytes body
    const crocsLength = response.body.length;
    gaugeSize(crocsLength);
    timingDuration(response);

    // Use tags to filter the crocs
    crocs.forEach((croc) => {
        response = http.get(`https://test-api.k6.io/public/crocodiles/${croc['id']}/`, {
            tags: { name: `${croc['sex']}` },
        });

        const crocLenght = response.body.length
        gaugeSize(crocLenght);
        timingDuration(response);
    });
}

export function gaugeSize(len){
    bodySize.add(len);
}

export function timingDuration(res){
    requestDuration.add(res.timings.receiving - res.timings.sending)
}
