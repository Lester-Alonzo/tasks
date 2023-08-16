'use client'
import styles from './page.module.css'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {DisplayC} from './DisplayC'

export function Bubble() {
    const [dayornight, setDayornight] = useState('day')

    const router = useRouter()
    const handleSee = () => {
        router.push('/running')
    }
    useEffect(() => {
        const hour = new Date().getHours()
        if(hour >= 19 || hour <= 6) setDayornight('night')
    }, [])
    return <button onClick={handleSee} className={styles.bubble} style={{backgroundColor:`${dayornight === 'day' ? '#dcd984' :  '#202840' }`}}> {dayornight === 'day' ? '🌞️' : '🌚'} <DisplayC/> </button>
}