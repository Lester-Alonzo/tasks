'use client'
import styles from './pickerg.module.css'
import {useRef} from 'react'
export function Datess ({id, fn}:{id:number, fn:(date:string) => void}) {
    const iref = useRef<HTMLInputElement>(null)
    function DateParse(date:string) {
        const d = new Date(date)
        const day = d.getDate()
        const month = d.getMonth()
        const year = d.getFullYear()
        return `${day + 1}/${month}/${year}`
    }
    const handleClck = () => {
        if(iref.current === null) return
        const pDate = DateParse(iref.current.value)
        fn(pDate)
    }
return (
    <div className={styles.gnmain}>
        <input type="date" ref={iref} style={{borderRadius:"11px", padding:"1rem", border:"none"}}/>
        <button onClick={handleClck}>Listo</button>
    </div>
)
}