'use client'
import {FcBiohazard} from 'react-icons/fc'
import { socket } from '@/lib/utils/socke'
import {EstaCoins} from '@/lib/utils/utils'
import {TASK_TYPE} from '@/lib/types/global'
import {useBubble} from '@/lib/context/Bubble'

export function RunRw ({type}:{type:TASK_TYPE}) {
    const {coins} = useBubble()
   const handleDblClick = () => {
         const coinst = EstaCoins(type)
         socket.emit('getcoins', {id:1, coins: coins + (coinst as number)} ) 
         alert("listo")
   } 
return (
    <button onDoubleClick={handleDblClick} style={{padding:".9rem", fontSize:"1.4rem", borderRadius:"12px", border:"none"}}> <FcBiohazard/> </button>
)
}