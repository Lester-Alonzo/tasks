'use client'
import {Task} from '@/lib/types/global'
import {useState, useEffect, createContext, useContext} from 'react'

type BubbleContext = {
    counter: number,
    AddNewLocalTask: (newItem:Task) => void,
    AllLocalTask: Task[],
    CurrentParent: (parent:string) => void
}

const BubbleContext = createContext<BubbleContext>({
    counter: 0,
    AddNewLocalTask: (newItem: Task) => {},
    AllLocalTask:[],
    CurrentParent: (parent:string) => {}
})

export function BubbleProvider({children}:{children:React.ReactNode}) {
    const [counter, setCounter] = useState(0)
    const [AllLocalTask, setAllLocaTask] = useState<Task[]>([])
    const [utl,setUtl] = useState(0)
    const [parent,setParent] = useState('')

    const PlusCount = () => {
        setCounter(prev => prev + 1)
    }
    const AddNewLocalTask = (newItem:Task) => {
            console.log(newItem)
            setUtl(prev => prev + 1)
            newItem.parent = parent
            setAllLocaTask(prev => prev = [...prev, newItem])
            PlusCount()
    }
    const CurrentParent = (parent:string) => {
        setParent(prev => prev = parent)
    }
    useEffect(() => {
        let data = localStorage.getItem('asign')
        if(data) {
            const LocalDataCurrent = JSON.parse(data)
            setAllLocaTask(LocalDataCurrent)
            setCounter(LocalDataCurrent.length)
        }
    },[])
    useEffect(() => {
        console.log("yo no me tengo que ejecutar")
        let data = localStorage.getItem('asign')
        if(data && counter !== 0) {
            localStorage.setItem('asign', JSON.stringify(AllLocalTask))
        }else if(utl !== 0) localStorage.setItem('asign', JSON.stringify(AllLocalTask))
    },[utl])
    return (
        <BubbleContext.Provider value={{
            counter,
            AddNewLocalTask,
            AllLocalTask,
            CurrentParent
        }}
        >
            {children}
        </BubbleContext.Provider>
    )
}

export const useBubble = () => useContext(BubbleContext)