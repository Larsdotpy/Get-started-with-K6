import http from 'k6/http';
import { sleep } from 'k6';
import exec from "k6/execution";

/*
Ramping VUs is an evolution of the Constant VUs executor which introduces stages. This allows k6 to transition the number
of desired VUs from one stage to another. Each stage defines its own timeframe for which all VUs will continually perform
your test.

- install xk6
- read to install influxDB: https://docs.influxdata.com/influxdb/v2/install/
- brew install influxdb
- read info about the xk6 output-influxdb: https://github.com/grafana/xk6-output-influxdb
- build new K6: xk6 build --with github.com/grafana/xk6-output-influxdb
- Start in new console tab influxDB: influxd and open in browser: http://localhost:8086
- prepare a bucket to collect the performance data:
    K6_INFLUXDB_ORGANIZATION="<INFLUXDB-ORGANIZATION-NAME>"
    K6_INFLUXDB_BUCKET="<INFLUXDB-BUCKET-NAME>"
    K6_INFLUXDB_TOKEN="<INFLUXDB-TOKEN>"
    k6_INFLUXDB_ADDR="<INFLUXDB-HTTP-ADDRESS>"

- run script (update config to local influxDB bucket):
K6_INFLUXDB_ORGANIZATION="Polteq" \
K6_INFLUXDB_BUCKET="test" \
K6_INFLUXDB_TOKEN="hFF7IQlOY30CZI4IzWuZFBeRpq_yJXWmjqi4gENnuoHK0ec3lDP3O_HGmzBF6EXFKH5q2XFIA35s-m_IVOZ0ug==" \
./k6 run -o xk6-influxdb=http://localhost:8086 tests/scripts/C-future-ideas/06-xk6-expirimental/02-xk6-output-to-influxdb-dashboard.js

More info about creating dashboards: https://docs.influxdata.com/influxdb/v2/visualize-data/
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