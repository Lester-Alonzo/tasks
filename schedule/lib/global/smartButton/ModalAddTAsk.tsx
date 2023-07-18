'use client'
import {TASK_TYPE} from '@/lib/types/global'
import {FormEvent, useRef} from 'react'
export function ModalAddTask({id, fnClose}:{id:number, fnClose:()=>void}) {
    const selctRef = useRef<HTMLSelectElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const options:{type:TASK_TYPE, label:string}[] = [ 
        {type:"NUI", label:"No urgente | importante"},
        {type:"NUNI", label:"No urgente | no importante"},
        {type:"UI", label:"Urgente | importante"},
        {type:"UNI", label:"Urgente | no importante"}
    ]
    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        const title = inputRef?.current?.value
        const type = selctRef?.current?.value
        const url = process.env.BASE_URL || 'http://10.0.1.200:3001/v1/'
        const res = await fetch(`${url}cntk/${id}`, {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title, 
                type,
                time: ''
            })
        })
        if(res.ok) fnClose()
    }
   return <form onSubmit={handleSubmit} style={{width:"calc(100% - 30%)", height:"calc(100vh - 56vh)", display:"flex", justifyContent:"center", alignItems:"center", gap:"1rem", backgroundColor:"rgba(0,0,0)",borderRadius:"23px"}}>
        <input type="text" placeholder='Ingresa el titulo de la tarea' ref={inputRef} style={{padding:'1rem', border:"none", borderRadius:"11px", backgroundColor:"white", color:"black"}}/>
        <select ref={selctRef} style={{padding:'1rem', border:"none", borderRadius:"11px", backgroundColor:"white", color:"black"}}>
            <option value="">--------</option>
            {options.map((option) => <option key={option.type} value={option.type}>{option.label}</option>)}
        </select>
        <button type='submit' style={{padding:'1rem', border:"none", borderRadius:"11px"}}>Listo</button>
    </form>
}