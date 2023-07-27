'use client'
import {createContext, useContext, useState, useEffect} from 'react'

type DocCTypes = {
 tskId:number,
 setCurentID: (id:number) => void
}

const DocContext = createContext<DocCTypes>({
    tskId: 0,
    setCurentID: (id:number) => {}
})

export function DocProvider({children}:{children:React.ReactNode}) {
    const [tskId, setTskId] = useState<number>(0)
    const setCurentID = (id:number) => {
        setTskId(prev => id)
    }
    useEffect(() => {
        console.log("task id", tskId)
    },[tskId])
    return (
        <DocContext.Provider value={{tskId, setCurentID}}>
            {children}
        </DocContext.Provider>
    )
}

export const useDocContext = () => useContext(DocContext)