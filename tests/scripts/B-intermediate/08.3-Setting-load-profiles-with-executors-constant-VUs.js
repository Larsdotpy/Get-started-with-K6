import http from 'k6/http';
import { sleep } from 'k6';
import exec from "k6/execution";

/*
Constant VUs focuses on continually performing your test over a specified amount of time. This allows each virtual user
to perform as many requests as it can within the allowed timeframe.
 */

export const options = {
    scenarios: {
        k6_workshop: {
            executor: 'constant-vus',
            vus: 10,
            duration: '30s',
        },
    },
};

export default function () {
    console.log(`[VU: ${exec.vu.idInInstance}, Iteration: ${exec.vu.iterationInInstance}] Starting iteration...`);
    http.get('https://test.k6.io/contacts.php');
    sleep(1);
}