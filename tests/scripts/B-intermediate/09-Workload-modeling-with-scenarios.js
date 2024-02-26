import { sleep } from 'k6';
import exec from "k6/execution";

export const options = {
    scenarios: {
        // Scenario 1: Users browsing through our product catalog
        users_browsing_products: {
            executor: 'shared-iterations', // name of the executor to use
            env: { WORKFLOW: 'browsing' }, // environment variable for the workflow

            // executor-specific configuration
            vus: 3,
            iterations: 10,
            maxDuration: '10s',
        },
        // Scenario 2: Users adding items to their cart and checking out
        users_buying_products: {
            executor: 'per-vu-iterations', // name of the executor to use
            exec: 'usersBuyingProducts', // js function for the purchasing workflow
            env: { WORKFLOW: 'buying' }, // environment variable for the workflow
            startTime: '2s', // delay start of purchasing workflow

            // executor-specific configuration
            vus: 3,
            iterations: 1,
            maxDuration: '10s',
        },
    },
};

export default function () {
    // Model your workflow for searching through products
    console.log(`[VU: ${exec.vu.idInInstance}, Iteration: ${exec.vu.iterationInInstance}, workflow: ${__ENV.WORKFLOW}] Just looking!!!`);
    sleep(1);
}

export function usersBuyingProducts() {
    // Model your workflow for adding items to cart and checking out
    console.log(`[VU: ${exec.vu.idInInstance}, Iteration: ${exec.vu.iterationInInstance}, workflow: ${__ENV.WORKFLOW}] CHA-CHING!!!`);
    sleep(1);
}