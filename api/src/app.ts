import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import {PrismaClient} from '@prisma/client'
import v1 from './routes/v1'
import {Server} from 'socket.io'
import http from 'http'
const rateLimit = require('express-rate-limit')


const app = express()
const prisma = new PrismaClient()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})
const limit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(morgan('dev'))
app.use('/api/v1', v1)
app.use(limit)

export {app, prisma, io, server}