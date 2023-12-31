'use client'
import {FormEvent, useRef} from 'react'
import { useGeneralContext } from '@/lib/context/genralContext'
export function ModalAddTodo({fnClose}:{fnClose:()=>void}) {
    const {addNewTodo} = useGeneralContext()

    const ref = useRef<HTMLInputElement>(null)

    const Create = async (e:FormEvent) => {
        e.preventDefault()
        if(ref?.current?.value !== '') {
            const url = process.env.NEXT_PUBLIC_BASE_URL as string
            const res = await fetch(`${url}cntd`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: ref?.current?.value,
                    stage: 'todo'
                })
            })
            if(res.ok) {
                const data = await res.json()
                data.Tasks = []
                addNewTodo(data)
                fnClose()
            }
        }
        }
    return (
        <form onSubmit={Create} style={{width:"calc(100% - 30%)", height:"calc(100vh - 56vh)", display:"flex", justifyContent:"center", alignItems:"center", gap:"1rem", backgroundColor:"rgba(0,0,0)",borderRadius:"23px"}}>
            <input type="text" placeholder="Titulo del Stage" ref={ref} style={{padding:'1rem', border:"none", borderRadius:"11px", backgroundColor:"white", color:"black"}} autoFocus/>
            <button type='submit' style={{padding:'1rem', border:"none", borderRadius:"11px"}}>Listo</button>
        </form>
    )
}