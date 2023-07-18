import {io} from 'socket.io-client'
const url = process.env.SOCKET_URL || "http://10.0.1.200:3001"

export const socket = io(url,  {
    transports: ['websocket'],
    reconnectionDelayMax: 10000,
})