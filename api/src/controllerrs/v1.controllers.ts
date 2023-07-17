import {prisma} from '../app'
import {Request, Response} from 'express'
import NodeCache from 'node-cache'

const cache = new NodeCache({stdTTL:100, checkperiod:120})

export async function AllData(req: Request, res: Response) {
    try {
        const result = await prisma.toDo.findMany({
            include:  {
                Tasks: true
            }
        })
        prisma.$disconnect()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({message: err})
    }
}
export async function TodoDataById(req: Request, res: Response) {
    try {
        const {id} = req.params
        const result = await prisma.tasks.findMany({
            where: {
                todoId: parseInt(id)
            },
            include: {
                Doc: true
            }
        })
        console.log(result)
        prisma.$disconnect()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export async function CreatNewToDo(req:Request, res:Response) {
    const {title, stage} = req.body
    console.log(title, stage)
    try {
        const Td = await prisma.toDo.create({
            data: {
                title: title,
                stage: stage
            }
        })
        prisma.$disconnect()
        res.status(200).json(Td)
    } catch (error) {
        res.status(500).json({message: error})
    }
}
export async function CreateNewTask(req:Request, res:Response) {
    const {tid} = req.params
    const {title, type, time} = req.body
    console.log(tid, title, type, time)
    try {
        const result = await prisma.tasks.create({
            data: {
                title: title,
                type: type,
                time: time,
                todoId: parseInt(tid)
            }
        })
        prisma.$disconnect()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message: error})
    }
}
export async function CreateNewDoc(req:Request, res:Response) {
    const {tdc} = req.params
    const {content} = req.body
    try {
        const result = await prisma.doc.create({
            data: {
                content: content,
                taskId: parseInt(tdc)
            }
        })
        prisma.$disconnect()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message: error})
    }
}
export async function DeleteToDo(req:Request, res:Response) {
    const {id} = req.params
    try {
        const result = await prisma.toDo.delete({
            where: {
                        id: parseInt(id)
            }
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message: error})
    }    
}
export async function DeleteTask(req:Request, res:Response) {
    const {id} = req.params
    try {
        const result = await prisma.tasks.delete({
            where: {
                        id: parseInt(id)
            }
        })
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message: error})
    }    
}
/**
 * 
 * @param req 
 * @param res 
 * @example 
 * {
 * "title": "New Title", //optional
 * "stage": "New Stage" //optional
 * }
 */
export async function UpdateTodo(req:Request, res:Response) {
    const {id} = req.params
    const update = req.body
    try {
        const result = await prisma.toDo.update({
            where: {
                id: parseInt(id)
            },
            data: update
        })
        res.status(200).json(result)        
    } catch (err) {
        res.status(500).json({message: err})
    }
}
export async function updateTask(req:Request, res:Response) {
    const {id} = req.params
    const update = req.body
    console.log("Esto se va a actualizar", update, id)
    try {
        const result = await prisma.tasks.update({
            where: {
                id: parseInt(id)
            },
            data: update
        })
        res.status(200).json(result)        
    } catch (error) {
        res.status(500).json({message: error})
    }
}
export async function updateDoc(req:Request, res:Response) {
    const {id} = req.params
    const {content} = req.body
    try {
        const result = await prisma.doc.update({
            where: {
                id: parseInt(id)
            },
            data: {
                content: content
            }
        })
        res.status(200).json(result)        
    } catch (error) {
        res.status(500).json({message: error})
    }
}