'use client'
import {useBubble} from '@/lib/context/Bubble'
import styles from './card.module.css'
import {PassDays} from '@/lib/utils/utils'
import {useState, useEffect} from 'react'
export default function Running() {
    const {AllLocalTask} = useBubble()

    if(AllLocalTask.length == 0) return <h1>No hay datos</h1>
    else return (
        <main className={styles.main}>
            <section>
            {AllLocalTask.map(task => (
                <div style={{backgroundColor:`${task.type == 'NUI' ? '#42ff94' : task.type == 'NUNI'? '#4294ff' : task.type == 'UI' ? '#ff4242' :  '#ffc342'}`}} className={styles.card} key={new Date(task.time).getTime()}>
                    <h1>{task.title}</h1>
                    <p><strong>Dias pasados:</strong> {PassDays(task.time)} </p>
                    <p><strong>Parent:</strong> {task.parent}</p>
                </div>
            ))}
            </section>
        </main>
    )
}