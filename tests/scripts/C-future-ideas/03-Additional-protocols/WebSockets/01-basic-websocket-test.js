import ws from 'k6/ws';
import { check } from 'k6';

/*
- Update het websocket adres
- voeg een functie toe op close zodat de verbinding ook weer wordt afgesloten, zie socket.on('open') als voorbeeld

https://piehost.com/blog/echo-websocket-org-alternative => ws://echo.websocket.org results in 301 = permanently moved
alternatives are:
wss://socketsbay.com/wss/v2/1/demo/ or
wss://echo.websocket.in/
*/

export default function () {
    const url = 'ws://echo.websocket.org';
    const params = { tags: { my_tag: 'hello' } };

    const res = ws.connect(url, params, function (socket) {

        // socket.on('open', function open() {
        //     socket.send('test message')
        // });

        socket.on('open', () => console.log('connected'));
        socket.on('message', (data) => console.log('Message received: ', data));
        socket.on('close', () => console.log('disconnected'));
    });

    check(res, { 'status is 101': (r) => r && r.status === 101 });
}
