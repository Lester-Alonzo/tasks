'use client'
import styles from './stage.module.css'
import {Items} from './Items'
import { useGeneralContext} from '@/lib/context/genralContext';
import {ToDo} from '@/lib/types/global'
type Props = {
    title:string,
    color:string,
    elements: any[]
}
export function Stages({color, title,elements = []}:Props) {
    const {handleDragEnter, handleDragEnd} = useGeneralContext()
    return (
        <div style={{backgroundColor:`var(${color})`}} className={styles.card} onDragEnter={() => handleDragEnter(title)} onDragEnd={() => handleDragEnd(title)} onTouchMove={() => console.log(title)} onTouchEnd={() => console.log(title)}>
            <h3 className={styles.title}>{title}</h3>
            {
                elements.map((element:ToDo, index:number) => (
                    <Items key={index} element={element} index={index} parent={title}/>
                ))
            }
        </div>
    )
}