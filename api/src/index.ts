import {app, server, io, prisma} from './app'
import {Request, Response} from 'express'

app.get('/', async (req:Request, res:Response) => {
    res.send('Hello World')
})
io.on('connection', (socket) => {
    console.log('a user connected')

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

})

server.listen(3001, () =>  console.log("http://localhost:3001"))