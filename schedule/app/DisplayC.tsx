'use client'
import {useBubble} from '@/lib/context/Bubble'
export  function DisplayC ({}) {
    const {coins} = useBubble()
return (
    <p>{coins}</p>
)
}