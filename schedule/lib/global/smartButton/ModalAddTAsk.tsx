'use client'
import {TASK_TYPE, RUN} from '@/lib/types/global'
import {FormEvent, useRef} from 'react'
import {useTableContext} from '@/lib/context/tableContext'
export function ModalAddTask({id, fnClose}:{id:number, fnClose:()=>void}) {
    const selctRef = useRef<HTMLSelectElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const pinRef = useRef<HTMLSelectElement>(null)

    const {updateDataTask} = useTableContext()

    const options:{type:TASK_TYPE, label:string}[] = [ 
        {type:"NUI", label:"No urgente | importante"},
        {type:"NUNI", label:"No urgente | no importante"},
        {type:"UI", label:"Urgente | importante"},
        {type:"UNI", label:"Urgente | no importante"}
    ]
    const runopt:{type:RUN, label:string}[] = [
        {type:"rep", label:"Todos los dias"},
        {type:"uni", label:"Dia en especifico"}
    ]
    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        const title = inputRef?.current?.value
        const type = selctRef?.current?.value
        const runs = pinRef?.current?.value
        const url = process.env.NEXT_PUBLIC_BASE_URL as string
        const res = await fetch(`${url}cntk/${id}`, {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title, 
                type,
                time: '',
                run: runs,
                pin: ""
            })
        })
        if(res.ok) {
            const data = await res.json()
            updateDataTask(data)
            fnClose()
        } 
    }
   return <form onSubmit={handleSubmit} style={{width:"calc(100% - 15%)", height:"calc(100vh - 56vh)", display:"flex", justifyContent:"center", alignItems:"center", gap:"1rem", backgroundColor:"rgba(0,0,0)",borderRadius:"23px", flexDirection:"column"}}>
        <input type="text" placeholder='Ingresa el titulo de la tarea' ref={inputRef} style={{padding:'1rem', border:"none", borderRadius:"11px", backgroundColor:"white", color:"black"}} autoFocus/>
        <select ref={pinRef} style={{padding:'1rem', border:"none", borderRadius:"11px", backgroundColor:"white", color:"black"}}>
        {runopt.map((option) => <option key={option.type} value={option.type}>{option.label}</option>)}
        </select>
        <select ref={selctRef} style={{padding:'1rem', border:"none", borderRadius:"11px", backgroundColor:"white", color:"black"}}>
            <option value="">--------</option>
            {options.map((option) => <option key={option.type} value={option.type}>{option.label}</option>)}
        </select>
        <button type='submit' style={{padding:'1rem', border:"none", borderRadius:"11px"}}>Listo</button>
    </form>
}