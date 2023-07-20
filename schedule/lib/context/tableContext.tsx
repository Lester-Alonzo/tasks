'use client'
import {createContext, useContext, useState, useEffect} from 'react'
import {Task} from '@/lib/types/global'

type TableContextType = {
    Taskdata:Task[],
    setDataTask: (data:Task[]) => void,
    updateDataTask: (nitem:Task) => void
}

const TableContext = createContext<TableContextType>({
    Taskdata: [],
    setDataTask: (data:Task[]) => {},
    updateDataTask: (nitem:Task) => {}
})

export const TableContextProvider = ({children}:{children:React.ReactNode}) => {
    const [Taskdata, setTaskdata] = useState<Task[]>([])
    const setDataTask = (data:Task[]) => {
        setTaskdata(data)
    }
    const updateDataTask =  (nitem:Task) => {
        setTaskdata(prev => prev = [...prev, nitem])
    }
    return (
        <TableContext.Provider value={{Taskdata, setDataTask, updateDataTask}}>
            {children}
        </TableContext.Provider>
    )
}

export const useTableContext = () => useContext(TableContext)