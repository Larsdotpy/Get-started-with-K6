import http from 'k6/http';
import { sleep } from 'k6';
import exec from "k6/execution";

/*
Ramping VUs is an evolution of the Constant VUs executor which introduces stages. This allows k6 to transition the number
of desired VUs from one stage to another. Each stage defines its own timeframe for which all VUs will continually perform
your test.

- install xk6
- read info about the xk6 dashboard: https://github.com/grafana/xk6-dashboard
- build new K6: $ xk6 build --with github.com/grafana/xk6-dashboard@latest
- run script: ./k6 run --out web-dashboard 03-xk6-dashboard-with-executors-ramping-VUs.js

LET op: documentatie spreekt soms nog over --out dashboard ipv --out web-dashboard

More info about custom dashboards: https://github.com/grafana/xk6-dashboard/blob/master/docs/.dashboard-custom.js
 */

// Ramping up
export const options = {
    scenarios: {
        k6_workshop: {
            executor: 'ramping-vus',
            stages: [
                { target: 10, duration: "30s" },
            ],
        },
    },
};

// Ramping down
// export const options = {
//     scenarios: {
//         k6_workshop: {
//             executor: 'ramping-vus',
//             stages: [
//                 { target: 1, duration: "30s" },
//             ],
//             startVUs: 10,
//         },
//     },
// };

// Ramping with a spike
// export const options = {
//     scenarios: {
//         k6_workshop: {
//             executor: 'ramping-vus',
//             stages: [
//                 { target: 1, duration: "12s" },
//                 { target: 10, duration: "3s" },
//                 { target: 3, duration: "3s" },
//                 { target: 3, duration: "12s" },
//             ],
//             startVUs: 1,
//         },
//     },
// };

export default function () {
    console.log(`[VU: ${exec.vu.idInInstance}, Iteration: ${exec.vu.iterationInInstance}] Starting iteration...`);
    http.get('https://test.k6.io/contacts.php');
    sleep(1);
}