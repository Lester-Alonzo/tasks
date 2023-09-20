'use client'
import {createContext, useContext, useState, useEffect} from 'react'
import {CurrentDoc} from '@/lib/types/global'
import {parseDoc} from '@/lib/utils/utils'

type DocCTypes = {
 tskId:number,
 currentDoc: CurrentDoc,
 setCurentID: (id:number) => void,
 currentdocedit: (doc:string, url:string) => void,
 hanldeAddDoc:  () => void
}

const DocContext = createContext<DocCTypes>({
    tskId: 0,
    currentDoc:{
        content: '',
        type: 'text',
    },
    setCurentID: (id:number) => {},
    currentdocedit: (doc:string, url:string='') => {},
    hanldeAddDoc:  () => {}
})

export function DocProvider({children}:{children:React.ReactNode}) {
    const [tskId, setTskId] = useState<number>(0)
    const [currentDoc, setCurrentDoc] = useState<CurrentDoc>({
        content: '',
        type: 'text',
    })
    const setCurentID = (id:number) => {
        setTskId(prev => id)
    }
    const currentdocedit = (doc:string, url:string='') => {
        const cdoc = parseDoc(doc)
        setCurrentDoc(prev => cdoc)
    }
    const hanldeAddDoc = async () => {
        const rs = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}cndc/${tskId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentDoc)
        })
    }
    useEffect(() => {
        console.log("task id", tskId)
    },[tskId])
    return (
        <DocContext.Provider value={{tskId, setCurentID, currentDoc, currentdocedit, hanldeAddDoc}}>
            {children}
        </DocContext.Provider>
    )
}

export const useDocContext = () => useContext(DocContext)