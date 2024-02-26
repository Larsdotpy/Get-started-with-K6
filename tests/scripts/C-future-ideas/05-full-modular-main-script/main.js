import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { SharedArray } from "k6/data";

// export defined scenario's
export { login } from "../../../scenarios/login.js";

// load test config, used to populate exported options object:
let config = __ENV.config || 'login-option.json';
const testConfig = JSON.parse(open(`../../../config/${config}`));
export const options = testConfig;

// open user data
const users = new SharedArray("Shared logins", function () {
  let users = JSON.parse(open( '../../../data/users.json')).users;
  return users;
})

globalThis.users = users;

export default function () {
  console.log('No scenarios in config found. Executing default function...');
}

export function handleSummary(data) {
  return {
    "tests/reports/result.html": htmlReport(data, {title: 'Polteq loadtest report'}),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}