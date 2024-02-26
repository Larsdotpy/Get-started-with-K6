import http from 'k6/http';
import { sleep } from 'k6';
import exec from "k6/execution";

/*
With the Constant Arrival Rate, we now start to focus on the rate at which your test iterations are performed over a
prescribed period of time. k6 will dynamically adjust the number of VUs to achieve the desired rate.
 */

// Constant Arrival Rate focuses on the iteration rate - iteration rate
export const options = {
    scenarios: {
        k6_workshop: {
            executor: 'constant-arrival-rate',
            rate: 50,
            duration: '30s',
            preAllocatedVUs: 100,
        },
    },
};

// Constant Arrival Rate focuses on the iteration rate - iterations per timeunit
// export const options = {
//     scenarios: {
//         k6_workshop: {
//             executor: 'constant-arrival-rate',
//             rate: 200000,
//             timeUnit: '15m',
//             duration: '30s',
//             preAllocatedVUs: 500,
//         },
//     },
// };

export default function () {
    console.log(`[VU: ${exec.vu.idInInstance}, Iteration: ${exec.vu.iterationInInstance}] Starting iteration...`);
    http.get('https://test.k6.io/contacts.php');
    sleep(1);
}