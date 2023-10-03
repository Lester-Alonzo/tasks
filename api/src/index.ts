import {app, server, io, prisma} from './app'
import {Request, Response} from 'express'
import {Socket} from 'socket.io'
import { tday } from './utils/index'

app.get('/api', async (req:Request, res:Response) => {
    res.send('Hello World')
})

const handleInit = async (socket:Socket) => {
    const result = await prisma.coins.findFirst()
    console.log(result)
    socket.timeout(2000).emit('updatedcoins', result)
}
io.on('connection', (socket) => {
    console.log('a user connected')
    handleInit(socket)

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })


    socket.on('message', (msg) => {
        console.log(msg)
        socket.emit('message', 'remix')
    })
    socket.on('update', async (msg) => {
        console.log(msg)
        const resul = await prisma.toDo.update({
            where: {
                id: msg.id
            },
            data: {
                stage: msg.stage.toUpperCase()
            }
        })
        socket.emit('update', resul)
        console.log(resul)
    })
    socket.on('asign' , async (payload) => {
        const {tid, time} = payload
    try {
        const result = await prisma.tasks.update({
            where: {
                id: parseInt(tid)
            },
            data: {
                time: time
            }
        })
        socket.emit('asign', result)
    } catch (error) {
    }
    })
    socket.on('getcoins', async (payload) => {
        const {id, coins, tid} = payload
        try {
            const result = await prisma.coins.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    coin: coins
                }
            })
            tday.markTask(tid)
            socket.emit('updatedcoins', result)
        } catch (error) {
            socket.emit('error' , 'error')
        }
    })
})

server.listen(3001, () =>  console.log("http://localhost:3001"))