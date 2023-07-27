'use client'
import {WrapButton} from './BtnModalWrap'
import {useState, useRef} from 'react'
import {ToDo} from '@/lib/types/global'
import {MdDoneOutline} from 'react-icons/md'
import styless from './warp.module.css'

export function EditTodo({Citem, styles}:{Citem:ToDo, styles?:Object}) {
    const [modal, setModal] = useState(false)
    const InpuRef = useRef<HTMLInputElement>(null)

    const handleClick = () => setModal(prev => !prev)

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const url = process.env.NEXT_PUBLIC_BASE_URL as string
        const res = await fetch(`${url}uptd/${Citem.id}`, {
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title:InpuRef.current?.value
            })
        })
        if(res.ok) {
            location.reload()
        }
    }
    return <>
    {modal && <WrapButton Zindex={4}>
        <button onClick={handleClick} style={{position:"absolute", left:"4rem", top:"4rem"}}>❌</button>
        <form onSubmit={handleSubmit} className={styless.edittodo}>
            <input type="text" defaultValue={Citem.title} ref={InpuRef}/>
            <button> <MdDoneOutline/> </button>
        </form>
    </WrapButton>}
    <button style={styles || {}} onClick={handleClick}>📝</button>
    </>
}