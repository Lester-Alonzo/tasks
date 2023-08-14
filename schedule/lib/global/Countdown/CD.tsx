'use client'
import {useState, useEffect} from 'react'
import styles from './CD.module.css'

let interval: ReturnType<typeof setInterval>

export function CD ({}) {
    const [second, setSecond] = useState(0)
    const [minute, setMinute] = useState(0)
    const handleTimer = () => {
        interval = setInterval(() => {
            setSecond(second => second + 1)
        }, 1000)
        return () => clearInterval(interval)
    }

    useEffect(() => {
            if(minute === 25) {
                alert('Se acabó el tiempo')
                clearInterval(interval)
                setMinute(0)
                setSecond(0)
            }
            if(second === 60) {
                setSecond(0)
                setMinute(minute => minute + 1)
            }
    }, [second])

return (
    <div className={styles.main__counter}>
            <p className={styles.text}> <span>M</span>{minute} | <span>S</span>{second}</p>
        <button onClick={handleTimer} className={styles.btn}>Iniciar</button>
    </div>
)
}