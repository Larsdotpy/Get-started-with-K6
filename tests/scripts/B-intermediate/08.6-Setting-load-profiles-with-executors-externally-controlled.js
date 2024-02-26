import http from 'k6/http';
import { sleep } from 'k6';
import exec from "k6/execution";

/*
As noted in Setting load profiles with executors, this particular executor delegates the control of VUs and the running
state of tests to external processes. Feel free to use Bash, Python, or some automation component; the source of these
processes is of no consequence of the executor.
 */

export const options = {
    scenarios: {
        k6_workshop: {
            executor: 'externally-controlled',
            duration: '5m',
        },
    },
};

export default function () {
    console.log(`[VU: ${exec.vu.idInInstance}, Iteration: ${exec.vu.iterationInInstance}] Starting iteration...`);
    http.get('https://test.k6.io/contacts.php');
    sleep(3);
}