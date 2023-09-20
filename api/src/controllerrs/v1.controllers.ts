import {prisma} from '../app'
import {Request, Response} from 'express'
import NodeCache from 'node-cache'
import {ParseDate} from '../utils'

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
                Doc: true,
                Days: true
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
    const {title, type, time, run, pin} = req.body
    console.log(tid, title, type, time)
    try {
        const result = await prisma.tasks.create({
            data: {
                title: title,
                type: type,
                time: time,
                run: run,
                pin: pin,
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
    const {content, type} = req.body
    try {
        const result = await prisma.doc.create({
            data: {
                content: content,
                type: type,
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
export async function CreateDates(req:Request, res:Response) {
    const {dates} = req.body
    const {id} = req.params
    try {
        for await (const date of dates) {
            const result = await prisma.days.create({
                data: {
                    date: date,
                    taskID: parseInt(id)
                }
            })
        }
        cache.del('dates')
        res.status(200).json({message: "Dates created"})
    } catch (err) {
        res.status(500).json({message: err})  
    }
}
export async function CreatePin(req:Request, res:Response) {
    const {pin} = req.body
    const {id} = req.params
    console.log(pin, id)
    try {
        const pon = await prisma.tasks.update({
            where: {
                id: parseInt(id)
            },
            data: {
                pin: pin
            }
        })
        res.json(pon)
    } catch (err) {
        res.status(500).json({message: err})
    }
}
export async function AllDatesPerTasks(req:Request, res:Response) {
    //hacer una llamada a la base de datos con prisma, quiero que me devuelva todas las tareas, que contengan la fecha de hoy, teniendo en cuenta que se utiliza new Date().getDay() lo que devuelve un entero del 0 al 6, siendo 0 el domingo y 6 el sabado
    try {
        const today = new Date().getDay()
        const pDate = ParseDate()
        const result = await prisma.tasks.findMany({
            where: {
                OR: [
                    {Days: {some: {date: today}}},
                    {pin: pDate}
                ]
            }
        })
        if(cache.get('dates')) res.status(200).json(cache.get('dates'))
        else {
            cache.set('dates', result)
            res.status(200).json(result)
        }
    } catch (err) {
        res.status(500).json({message: err})  
    }
}

export async function InitCoins(req:Request, res:Response) {
    try {
        const result = await prisma.coins.create({
            data: {
                coin: 0
            }
        })
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({message: err})
    }
}
export async function GetAllCoins(req:Request, res:Response) {
    try {
        const result = await prisma.coins.findFirst()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({message: err})
    }
}

export async function UpdateCoins(req:Request, res:Response) {
    const {coins} = req.body
    try {
        const result = await prisma.coins.update({
            where: {
                id: 1
            },
            data: {
                coin: coins
            }
        })
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({message: err})
    }
}

export async function CreateReward(req:Request, res:Response) {
    const {price, title, content, type, time} = req.body
    console.log(typeof price, typeof title, content, type, time)
    try {
        const result = await prisma.rewards.create({
            data: {
                price: Number(price),
                title: title,
                content: content,
                type: type,
                time: time
            }
        })
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({message: err})
    }
}
export async function GetAllRewards(req:Request, res:Response) {
    try {
        const result = await prisma.rewards.findMany()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({message: err})
    }
}
export async function DeleteReward(req:Request, res:Response) {
    const {id} = req.params
    try {
        const result = await prisma.rewards.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({message: err})
    }
}
export async function UpdateReward(req:Request, res:Response) {
    const {id} = req.params
    const {price, title, content, type, time} = req.body
    try {
        const result = await prisma.rewards.update({
            where: {
                id: parseInt(id)
            },
            data: {
                price: price,
                title: title,
                content: content,
                type: type,
                time: time
            }
        })
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({message: err})
    }
}
export async function UploadFile(req:Request, res:Response) {
    console.log("all data to upload",req.file, req.body)
    res.json({message: 'File uploaded'})
}