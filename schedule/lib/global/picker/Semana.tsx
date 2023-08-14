'use client'
import {useEffect, useState} from 'react'
import styles from './pickerg.module.css'
export function Semana ({id, fn}:{id:number, fn:(entrys:number[]) => void}) {
    const [days, setDays] = useState<Array<number>>([])
    const mapdays = [
        {
            day: 'Do',
            date: 0
        },
        {
            day: 'Lu',
            date: 1
        },
        {
            day: 'Ma',
            date: 2
        },
        {
            day: 'Mi',
            date: 3
        },
        {
            day: 'Ju',
            date: 4
        },
        {
            day: 'Vi',
            date: 5
        },
        {
            day: 'Sa',
            date: 6
        }

    ]
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target
        const index = days.indexOf(Number(value))
        if (index === -1) {
            setDays([...days, Number(value)])
        } else {
            setDays(days.filter((day) => day !== Number(value)))
        }
    }
    const handleclick = () => {
        console.log(days)
        fn(days)
    }
    useEffect(() => {
        console.log(days)
    },[days])
return (
    <div className={styles.gnmain}>
            <form className={styles.grids}>
        {mapdays.map((day, index) => (
            <label htmlFor={day.day} key={index}>
                {day.day}
                <input type="checkbox" name="" id={day.day} value={day.date} onChange={handleInput}/>
            </label>
        ))}
        <button onClick={handleclick} type='button'>listo</button>
            </form>
    </div>
)
}