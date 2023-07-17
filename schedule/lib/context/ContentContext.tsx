'use client'
import {createContext, useContext, useState, useEffect} from 'react'

type ContextProps = {
    currentTaskid:number,
    setIdTaskc: (id:number) => void
}

const Contextcontext = createContext<ContextProps>({
    currentTaskid: 0,
    setIdTaskc: (id:number) => {}
})

export function ContentCprovider({children}:{children:React.ReactNode}) {
    const [currentTaskid, setCurrenTaskId] = useState(0)

    const setIdTaskc = (id:number) => {
        setCurrenTaskId(prev =>  prev = id)
    }
    return (
        <Contextcontext.Provider value={{
            currentTaskid,
            setIdTaskc
        }}>
            {children}
        </Contextcontext.Provider>
    )
}

export const useContentC = () => useContext(Contextcontext)