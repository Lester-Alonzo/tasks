import {io} from 'socket.io-client'
const url = process.env.SOCKET_URL || "http://localhost:3001"

export const socket = io(url,  {
    transports: ['websocket'],
    reconnectionDelayMax: 10000,
})