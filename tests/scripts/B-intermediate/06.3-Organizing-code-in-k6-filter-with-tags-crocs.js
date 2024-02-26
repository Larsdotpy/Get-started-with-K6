import http from 'k6/http';

/*
    k6 run 06.3-Organizing-code-in-k6-filter-with-tags-crocs.js --out json=06.3-tagged_crocs.json

    https://jqlang.github.io/jq/download/
    jq 'select(.data.tags.my_tag=="even")' < 06.3-tagged_crocs.json
    jq 'select(.data.tags.sex=="M")' < 06.3-tagged_crocs.json
    jq 'select(.data.tags.name=="All crocs")' < 06.3-tagged_crocs.json
 */

export default function () {
    const response = http.get('https://test-api.k6.io/public/crocodiles/', {
        tags: { name: 'All crocs' },
    });
    const crocs = JSON.parse(response.body);
    console.log(`crocs: ${JSON.stringify(crocs)}`)

    // Use tags to filter the crocs
    crocs.forEach((croc) => {
        console.log(`croc: ${JSON.stringify(croc)}`)
        if(croc.id % 2 === 0){
            http.get(`https://test-api.k6.io/public/crocodiles/${croc['id']}/`, {
                tags: { my_tag: 'even', sex: `${croc['sex']}` },
            });
        } else {
            http.get(`https://test-api.k6.io/public/crocodiles/${croc['id']}/`, {
                tags: { my_tag: 'odd', sex: `${croc['sex']}`},
            });
        }
    });
}
