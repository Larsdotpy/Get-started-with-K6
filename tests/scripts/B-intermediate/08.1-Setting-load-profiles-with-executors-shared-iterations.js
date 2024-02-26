import http from 'k6/http';
import {sleep} from 'k6';
import exec from "k6/execution";

/*
Shared Iterations is the most basic of the executors. As can be inferred from the name, the primary focus will be the
number of iterations for your test; this is the number of times your test function will be run.
 */

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
    /*
    __VU and __ITER are global variables: https://k6.io/docs/using-k6/execution-context-variables/
    now use execution context variables: https://k6.io/docs/using-k6/execution-context-variables/#__vu-and-__iter-discouraged
     */
    console.log(`
    [VU: ${__VU}, iteration: ${__ITER}] Starting iteration...
    [VU: ${exec.vu.idInInstance}, Iteration id: ${exec.vu.iterationInInstance}]
    `);
    http.get('https://test.k6.io/contacts.php');
    sleep(1);
}