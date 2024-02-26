import { sleep } from 'k6'

export const options = {
    duration: '1m',
}

export function setup() {
    return { v: 1 };
}

export default function (data) {

    // console.log("An iteration was executed");
    console.log(JSON.stringify(data));
    sleep(1);
}

export function teardown(data) {
    if (data.v != 1) {
        throw new Error('incorrect data: ' + JSON.stringify(data));
    }
}