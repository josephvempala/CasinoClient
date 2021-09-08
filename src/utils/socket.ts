import { io } from "socket.io-client";

export let socket = io('localhost:3000', {
    path: '/socket',
    transports : ['websocket']
});

export const setSocketAuthToken = (token : string) => {
    socket?.disconnect();
    socket = io('localhost:3000', {
        path: '/socket',
        auth: {
            token
        }
    });
}
