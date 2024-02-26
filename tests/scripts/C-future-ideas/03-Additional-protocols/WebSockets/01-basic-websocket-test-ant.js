import ws from 'k6/ws';
import { check } from 'k6';

/*
https://piehost.com/blog/echo-websocket-org-alternative => ws://echo.websocket.org results in 301 = permanently moved
alternatives are:
wss://socketsbay.com/wss/v2/1/demo/ or
wss://echo.websocket.in/
*/

export default function () {
    const url = 'wss://echo.websocket.in/';
    const params = { tags: { my_tag: 'hello' } };
    const res = ws.connect(url, params, function (socket) {

        socket.on('open', function open() {
            socket.send('test message')
        });

        // listing on events to come
        socket.on('open', () => console.log('connected'));

        socket.on('message',
            function close(data){
                console.log('Message received: ', data);
                socket.close();
            })
        socket.on('close', () => console.log('disconnected'));
    });

    console.log(`Socket status: ${res.status}`);

    check(res, { 'status is 101': (r) => r && r.status === 101 });
}
