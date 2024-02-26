import http from 'k6/http';
import { sleep, check } from 'k6';
import { Trend } from 'k6/metrics';

const transactionDuration = new Trend('transaction_duration');
const thinkTime = new Trend('thinkTime');

export const options = {
    scenarios: {
        k6_workshop: {
            executor: 'shared-iterations',
            iterations: 10,
            vus: 10
        },
    },
};

export default function () {

    // This is a transaction
    let timeStart = Date.now();
    let res = http.get('https://test.k6.io', {tags: { name: '01_Home' }});
    check(res, {
        'is status 200': (r) => r.status === 200,
    });

    let randomWait = Math.random() * 5;
    thinkTime.add(randomWait);
    sleep(randomWait);

    let timeEnd = Date.now();
    transactionDuration.add(timeEnd - timeStart);
    console.log('The transaction took', timeEnd - timeStart, 'ms to complete.');

    // This is another transaction
    res = http.get('https://test.k6.io/about', {tags: { name: '02_About' }});
}