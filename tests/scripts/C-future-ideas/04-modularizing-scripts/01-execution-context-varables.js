import http from 'k6/http';
import { sleep } from 'k6';
import { Trend } from 'k6/metrics';
const duration = new Trend('timings_duration');
import exec from 'k6/execution';

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
    console();
    console.log(`

All info except abort.

// Cloud Environment variables

${__ENV.LI_LOAD_ZONE}
${__ENV.LI_INSTANCE_ID}
${__ENV.LI_DISTRIBUTION}

// Other variables

Instance info
-------------
Vus active: ${exec.instance.vusActive}
Iterations completed: ${exec.instance.iterationsCompleted}
Iterations interrupted:  ${exec.instance.iterationsInterrupted}
Iterations completed:  ${exec.instance.iterationsCompleted}
Iterations active:  ${exec.instance.vusActive}
Initialized vus:  ${exec.instance.vusInitialized}
Time passed from start of run(ms):  ${exec.instance.currentTestRunDuration}

Scenario info
-------------
Name of the running scenario: ${exec.scenario.name}
Executor type: ${exec.scenario.executor}
Scenario start timestamp: ${exec.scenario.startTime}
Percenatage complete: ${exec.scenario.progress}
Iteration in instance: ${exec.scenario.iterationInInstance}
Iteration in test: ${exec.scenario.iterationInTest}

Test info
---------
All test options: ${JSON.stringify(exec.test.options)}

vu info
-------
Iteration id: ${exec.vu.iterationInInstance}
Iteration in scenario: ${exec.vu.iterationInScenario}
VU ID in instance: ${exec.vu.idInInstance}
VU ID in test: ${exec.vu.idInTest}
VU tags: ${JSON.stringify(exec.vu.tags)}


`);
}
