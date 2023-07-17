'use client'
import styles from './page.module.css'
import {useEffect, useState} from 'react'
import {FcClock} from 'react-icons/fc'
import {useRouter} from 'next/navigation'
import {useBubble} from '@/lib/context/Bubble'
export function Bubble() {
    const router = useRouter()
    const {counter} = useBubble()
    const handleSee = () => {
        router.push('/running')
    }
    return <button onClick={handleSee} className={styles.bubble} style={{backgroundColor:`${counter === 0 ? '#b3ff9e' : counter >= 6 ? '#ffb19e' : counter > 10 ? '#fe7171' : '#8bc2fe'}`}}> <FcClock style={{color:"black"}}/> {counter}</button>
}