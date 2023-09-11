'use client'
import {BiCurrentLocation} from 'react-icons/bi'
import { FcClock} from 'react-icons/fc'
import {useState} from 'react'
import {Semana, Datess} from '@/lib/global'
import {RUN} from '@/lib/types/global'

type Props = {
    time: string,
    handleSetTime: (id:number) => void
    id:number,
    runt:RUN,
    pin:string
}

export function Asign({time, handleSetTime, id, runt, pin}:Props) {
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
    const hanldeUni = async (date:string) => {
        if(date === '') return

        setAsigDone(true)
        handleSetTime(id)
        const url = process.env.NEXT_PUBLIC_BASE_URL as string
        const res = await fetch(`${url}uppin/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({pin:date})
        })
        if(res.ok) setTodd(false)
    }
    if(time === '' && !AsigDone && runt === 'rep') return <>
        {todd && <Semana id={id} fn={handleClick} />}
        <button title='asignar' onClick={() => setTodd(true)}> <FcClock style={{color:"black"}}/> </button>
    </> 
    else if(pin === '' && !AsigDone && runt === 'uni') return <>
        {todd && <Datess id={id} fn={hanldeUni}/>}
        <button title='asignar' onClick={() => setTodd(true)}> <FcClock style={{color:"black"}}/> </button>
    </>
    else return <BiCurrentLocation style={{fontSize:"1.3rem", color:"black"}}/>
}