'use client'
import {BiCurrentLocation} from 'react-icons/bi'
import { FcClock} from 'react-icons/fc'
import {useState} from 'react'
import {Semana} from '@/lib/global'

type Props = {
    time: string,
    handleSetTime: (id:number) => void
    id:number
}

export function Asign({time, handleSetTime, id }:Props) {
    const [AsigDone, setAsigDone] = useState(false)
    const [todd, setTodd ] = useState(false)

    const handleClick = async (entrys:number[]) => {
        if(entrys.length === 0) return

        setAsigDone(true)
        handleSetTime(id)
        const url = process.env.NEXT_PUBLIC_BASE_URL as string
        const res = await fetch(`${url}cndy/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({dates:entrys})
        })
        if(res.ok) setTodd(false)
    }
    if(time === '' && !AsigDone) return <>
        {todd && <Semana id={id} fn={handleClick} />}
        <button title='asignar' onClick={() => setTodd(true)}> <FcClock style={{color:"black"}}/> </button>
    </> 
    else return <BiCurrentLocation style={{fontSize:"1.3rem", color:"black"}}/>
}