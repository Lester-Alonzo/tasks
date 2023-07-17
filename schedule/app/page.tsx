"use client"
import { Stages } from "@/lib/global"
import { useGeneralContext } from "@/lib/context/genralContext"
import styles from './page.module.css'
import {socket} from '@/lib/utils/socke'
import { useEffect } from "react"
import {AddTodo} from '@/lib/global'

export default function Home() {
  const { doing, done, stoped, todo } = useGeneralContext()

  const handlejClic = () => {
    socket.emit('message', 'hello')
  }
  useEffect(() => {
    socket.on('message', (data) => {
      console.log(data)
    })
  socket.on('connect', () => {
    console.log('connected')
  })


    return () => {
      socket.off('message')
    }
  },[])
  useEffect(()  =>{

    ( async () => {
  const res = await fetch('http://localhost:3001/v1')
  const data = await res.json()
  console.log(data)
  })()
  },[])
  return (
    <main
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
      }}
    >
      <div className={`${styles.grid} ${styles.container}`}>
        <Stages title="ToDo" color="--color-1" elements={todo} />
        <Stages title="Doing" color="--color-2" elements={doing} />
        <Stages title="Stoped" color="--color-3" elements={stoped} />
        <Stages title="Done" color="--color-4" elements={done} />
      </div>
      {/* <button onClick={handlejClic}>click</button> */}
      <AddTodo/>
    </main>
  )
}
