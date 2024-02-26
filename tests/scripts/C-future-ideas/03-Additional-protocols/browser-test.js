import { browser } from 'k6/experimental/browser';

/*
- draai het volgende script: K6_BROWSER_HEADLESS=false k6 run tests/scripts/C-future-ideas/02-Additional-protocols/browser-test.js
 */


export const options = {
    scenarios: {
        browser: {
            executor: 'shared-iterations',
            options: {
                browser: {
                    type: 'chromium',
                },
            },
        },
    },
}

export default async function () {
    const page = browser.newPage();

    try {
        await page.goto('https://test.k6.io/');
    } finally {
        page.close();
    }
}
