import http from 'k6/http';
import { sleep } from 'k6';
import exec from "k6/execution";

/*
Per VU Iterations is a slight evolution on the Shared Iterations executor. With this executor, we're still focused on
the number of iterations, however, this time we want each virtual user to execute the same number of iterations.
 */

export const options = {
    scenarios: {
        k6_workshop: {
            executor: 'per-vu-iterations',
            iterations: 10,
            vus: 10,
            maxDuration: '10s',
        },
    },
};

export default function () {
    console.log(`[VU: ${exec.vu.idInInstance}, Iteration: ${exec.vu.iterationInInstance}] Starting iteration...`);
    http.get('https://test.k6.io/contacts.php');
    sleep(1);
}