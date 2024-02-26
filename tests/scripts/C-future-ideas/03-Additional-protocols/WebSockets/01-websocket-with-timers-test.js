import ws from 'k6/ws';
import { check } from 'k6';

export default function () {
    /*

    https://piehost.com/blog/echo-websocket-org-alternative => ws://echo.websocket.org results in 301 = permanently moved
    alternatives are:
    wss://socketsbay.com/wss/v2/1/demo/ or
    wss://echo.websocket.in/

    Zie https://k6.io/docs/using-k6/protocols/websockets/ voor meer voorbeelden
    */

    const url = 'wss://echo.websocket.in/';
    const params = { tags: { my_tag: 'hello' } };

    const res = ws.connect(url, params, function (socket) {
        socket.on('open', function open() {
            console.log('connected');
            let data = 'Test message send to WebSocket'
            socket.send(data);
            socket.setInterval(function timeout() {
                socket.ping();
                console.log('Pinging every 1sec (setInterval test)');
            }, 1000);
        });

        socket.on('ping', () => console.log('PING!'));
        socket.on('message', (data) => console.log('Message received: ', data));
        socket.on('close', () => console.log('disconnected'));

        socket.setTimeout(function () {
            console.log('4 seconds passed, closing the socket');
            socket.close();
        }, 4000);
    });

    console.log(`Socket status: ${res.status}`);

    check(res, { 'status is 101': (r) => r && r.status === 101 });
}
