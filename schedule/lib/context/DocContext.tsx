'use client'
import {createContext, useContext, useState, useEffect} from 'react'

type DocCTypes = {

}

const DocContext = createContext<DocCTypes>({})

export function DocProvider({children}:{children:React.ReactNode}) {
    return (
        <DocContext.Provider value={{}}>
            {children}
        </DocContext.Provider>
    )
}

export const useDocContext = () => useContext(DocContext)