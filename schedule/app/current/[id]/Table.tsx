'use client'
import {Task, Docs, TASK_TYPE} from '@/lib/types/global'
import styles from './current.module.css'
import {FcDeleteRow, FcDocument, FcClock} from 'react-icons/fc'
import {MD} from './MD'
import {useState, useEffect} from 'react'
import {socket} from '@/lib/utils/socke'

import {useTableContext} from '@/lib/context/tableContext'
import {EditTask} from '@/lib/global'
import {Asign} from './Asign'
import {useDocContext} from '@/lib/context/DocContext'
import {useBubble} from '@/lib/context/Bubble'
import {Asignado} from './Asignado'

export function Table({data}:{data:Task[]}) {
    const [docdat, setDocdata] = useState<Docs[]>([])
    const [cId, setcId] = useState<number>(0)
    const {Taskdata, setDataTask} = useTableContext()
    const {setCurentID} = useDocContext()
    const {coins} = useBubble()
    console.log("data", data)

    const handleClic = (doc:Docs[]) => {
        if(doc.length === 0) setDocdata([])
        setDocdata(prev => [...doc])
    }

    const handleSetTime = (id:number) => {
        if(cId == id) return
        setcId(id)
        socket.emit('asign', {tid: id, time: new Date()})
    }

    const seeDoc = (dosc:Docs[],pid:number) => {
        setCurentID(pid)
        handleClic(dosc)
    }

    const handleDelete = async (id:number, type:TASK_TYPE) => {
        const url = process.env.NEXT_PUBLIC_BASE_URL as string
        const res = await fetch(`${url}dtk/${id}`, 
        {
            method:"Delete"
        }
        )
        if(res.ok)  alert("listo")
    }

    useEffect(() => {
        socket.on('asign', (result) => {
        })
        setDataTask(data)
    },[])

    return (
        <>
        
        <section className={styles.table_contaier}>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Asignado</th>
                    <th>Tipo</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {Taskdata.map((task, i) => (
                    <tr key={i}>
                        <td className={styles.title_task}>{task.title}</td>
                        <Asignado dys={task.Days} sa={task.time} type={task.run} pin={task.pin}/>
                        <td>{task.type}</td>
                        <td className={styles.actions}>
                            {/* {task.time === '' && !AsignarDone? <button title='asignar' onClick={() => handleSetTime(task.id)}> <FcClock style={{color:"black"}}/> </button> : <BiCurrentLocation style={{fontSize:"1.3rem", color:"black"}}/>} */}
                            <Asign handleSetTime={handleSetTime} id={task.id} time={task.time} runt={task.run} pin={task.pin}/>
                            <EditTask Citem={task} styles={{backgroundColor:"#d1ea76", color:"black"}}/>
                            <button title='eliminar' onClick={() => handleDelete(task.id, task.type)}><FcDeleteRow/></button>
                            <button title='Ver content' onClick={() => seeDoc(task.Doc,task.id)}> <FcDocument/> </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </section>
        <MD docfrom={docdat}/>
        </>
    )
}