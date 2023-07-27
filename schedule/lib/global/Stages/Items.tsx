'use client'
import styles from './stage.module.css'
import { useGeneralContext} from '@/lib/context/genralContext';
import {useRouter}from 'next/navigation'
import {ToDo} from '@/lib/types/global'
import {EditTodo} from '../smartButton/EditTodo'
import {useBubble} from '@/lib/context/Bubble'

type Props = {
    element:ToDo,
    index:number,
    parent: string
}
export function Items({element, index, parent}:Props) {
    const router = useRouter()
    const {CurrentParent} = useBubble()
    const handleMessage = (message:string) => console.log(message)
    const handleDelete = async (id:number) => {
        const url = process.env.NEXT_PUBLIC_BASE_URL as string
        const res = await fetch(`${url}dtd/${id}`, 
        {
            method:"Delete"
        }
        )
        if(res.ok) alert("listo")
    }
    const {handleDragstart} = useGeneralContext()
    const hanldeRedirect = (id:number, parent:string) => {
        CurrentParent(parent)
        router.push(`/current/${id}`)
    }
    return (
        <div draggable className={styles.card_item} onDragStart={() =>  handleDragstart(element.id,element)} onTouchStart={() => console.log(element.id,element)}>
            <h5 className={styles.ttt}>{element.title}</h5>
            <span>{element.stage}</span>
            <span>{element.Tasks.length}</span>
            <nav className={styles.btns}>
                <button onClick={() => hanldeRedirect(element.id, element.title)}>➡️</button>
                <EditTodo Citem={element}/>
                <button onClick={() => handleDelete(element.id)}>❌</button>
            </nav>
        </div>
    )
}