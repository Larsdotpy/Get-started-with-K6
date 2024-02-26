import http from 'k6/http';
import { sleep } from 'k6';
import { Trend } from 'k6/metrics';
const duration = new Trend('timings_duration');
import exec from 'k6/execution';
import { envLogger } from "../../../common/environmentLogger.js";

/*
- maak een locale console functie die alle environment variable via debug flag afdrukt

met de -v optie worden de console.debug afgedrukt:
    k6 run -v 01-execution-context-varables.js
 */

export const options = {
    vus: 1,
    duration: '30s',
    ext: {
        loadimpact: {
            distribution: {
                ashburnDistribution: { loadZone: 'amazon:us:ashburn', percent: 50 },
                dublinDistribution: { loadZone: 'amazon:ie:dublin', percent: 50 },
            },
        },
    },
};

export default function () {
    const res = http.get('https://test-api.k6.io/');
    duration.add(res.timings.duration);
    sleep(1);
    envLogger(true,true,true,true,true);
}
