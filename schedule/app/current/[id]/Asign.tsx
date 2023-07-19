'use client'
import {BiCurrentLocation} from 'react-icons/bi'
import { FcClock} from 'react-icons/fc'
import {useState} from 'react'

type Props = {
    time: string,
    handleSetTime: (id:number) => void
    id:number
}

export function Asign({time, handleSetTime, id }:Props) {
    const [AsigDone, setAsigDone] = useState(false)
    const handleClick = () => {
        console.log("click")
        setAsigDone(true)
        handleSetTime(id)
    }
    if(time === '' && !AsigDone) return <button title='asignar' onClick={handleClick}> <FcClock style={{color:"black"}}/> </button>
    else return <BiCurrentLocation style={{fontSize:"1.3rem", color:"black"}}/>
}