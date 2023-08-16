'use client'
import {useRef} from 'react'
import styles from './rw.module.css'
export function Rmodal ({close}:{close:()=>void}) {
    const modal = useRef<HTMLFormElement>(null)
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formdata = new FormData(modal.current as HTMLFormElement)
        const data = Object.fromEntries(formdata.entries())
        console.log(data)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}cnrw`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        const finla = await res.json()
        console.log(finla)
        if(res.status === 200) close()
    }
return (
    <section style={{position:"fixed", top:"0", height:"0", backgroundColor:"rgba(0,0,0,.5)", width:"100%", minHeight:"100vh", backdropFilter:"blur(8px)", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <form ref={modal} onSubmit={handleSubmit} className={styles.form}>
            <input type="text" name="title" placeholder="title" autoFocus/>
            <input type="number" name="price" placeholder="price" inputMode="numeric"/>
            <input type="text" name="content" placeholder="descrip"/>
            <select name="type" id="">
                <option value="">--------</option>
                <option value="NORMAL">normal</option>
                <option value="COUNTDOWN">Contador</option>
            </select>
            <input type="text" name="time" placeholder="0min" inputMode="numeric"/>
            <button type='submit'>Listo</button>
        </form>
    </section>
)
}