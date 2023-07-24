'use client'
import {Task, TASK_TYPE} from '@/lib/types/global'
import {WrapButton} from './BtnModalWrap'
import {useState, useRef} from 'react'
import {BiEdit} from 'react-icons/bi'
import {MdDoneOutline} from 'react-icons/md'


    const options:{type:TASK_TYPE, label:string}[] = [ 
        {type:"UI", label:"Urgente | importante"},
        {type:"UNI", label:"Urgente | no importante"},
        {type:"NUI", label:"No urgente | importante"},
        {type:"NUNI", label:"No urgente | no importante"},
    ]

export function EditTask({Citem, styles}:{Citem:Task, styles?:Object}) {
    const [modal, setModal] = useState(false)
    const handleClick = () => setModal(prev => !prev)
    const inpuRef = useRef<HTMLInputElement>(null)
    const selecRef = useRef<HTMLSelectElement>(null)

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const url = process.env.NEXT_PUBLIC_BASE_URL as string
        const res = await fetch(`${url}uptk/${Citem.id}`, {
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title: inpuRef.current?.value,
                type: selecRef.current?.value
            })
        })
        if(res.ok) {
            location.reload()
        }
    }
    return <>
    {modal && <WrapButton Zindex={4}>
        <button onClick={handleClick} style={{position:"absolute", left:"4rem", top:"4rem"}}>❌</button>
            <form onSubmit={handleSubmit} style={{backgroundColor:"black", width:"calc(100% - 45%)", height:"calc(100vh - 43vh)", borderRadius:"41px", display:"flex", justifyContent:"center", alignItems:"center", gap:"1rem"}}>
                <input type="text" defaultValue={Citem.title} ref={inpuRef} style={{padding:"1rem", border:"none", borderRadius:"12px"}}/>
                <select defaultValue={Citem.type} ref={selecRef} style={{padding:"1rem", border:"none", borderRadius:"12px"}}>
                    <option value="">--------</option>
                    {options.map(op => (
                        <option value={op.type} key={op.type}>{op.label}</option>
                    ))}
                </select>
                <button type='submit'> <MdDoneOutline/> </button>
            </form>
        </WrapButton>}
        <button style={styles || {}} onClick={handleClick}> <BiEdit/> </button>
    </>
}