"use client"
import {
  useState,
  createContext,
  useContext,
  useEffect,
} from "react"
import {allTT} from '@/lib/utils/allapi'
import { ToDo } from '@/lib/types/global';
import {socket} from '@/lib/utils/socke'

interface ContextProps {
  todo: ToDo[]
  doing: ToDo[]
  stoped: ToDo[]
  done: ToDo[]
  handleDragstart: (id:number, data:ToDo) => void
  handleDragEnter: (enterparent:string) => void
  handleDragEnd: (lastparent:string) => void
}

const GeneralContext = createContext<ContextProps>({
  todo: [],
  doing: [],
  stoped: [],
  done: [],
  handleDragstart: (id:number, data:ToDo) => {},
  handleDragEnter: (enterprent:string) => {},
  handleDragEnd: ( lastparent:string) => {},
})

export const GeneralProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [todo, setTodo] = useState<Array<ToDo>>([])
  const [doing, setDoing] = useState<Array<ToDo>>([])
  const [stoped, setStoped] = useState<Array<ToDo>>([])
  const [done, setDone] = useState<Array<ToDo>>([])
  const [currenDrag, setCurrenDrag] = useState(0)
  const [currentStage, setCurrentStage] = useState<ToDo>()
  const [newIndex, setNewIndex] = useState('')

  const mapItems: {
    [key: string]: ( type: 'salida' | 'entrada',id:number) => void
  } = {
    todo: ( type:"salida" | "entrada", id:number) => {
        if(type === "salida") {
            const  m = todo.filter((item) => item.id !== id)
            setTodo(prev => m)
        } else if(type === "entrada") {
            const nllist = [...todo]
            setTodo(prev => [...prev, currentStage as ToDo])
        }
    },
    doing: ( type:"salida" | "entrada",id:number) => {
        if(type === "salida") {
            const nllist = [...doing]
            const  m = nllist.filter((item) => item.id !== id)
            setDoing(prev => m)
        } else if(type === "entrada") {
            const nllist = [...doing]
            console.info(currentStage)
            setDoing(prev  => [...prev, currentStage as ToDo])
        }
    },
    stoped: (type:"salida" | "entrada", id:number) => {
        if(type === "salida") {
            const nllist = [...stoped]
            const  m = nllist.filter((item) => item.id !== id)
            setStoped(prev => m)
        } else if(type === "entrada") {
            const nllist = [...stoped]
            console.info(currentStage)
            setStoped(prev => [...prev, currentStage as ToDo])
        }
    },
    done: (type:"salida" | "entrada",id:number) => {
        if(type === "salida") {
            const nllist = [...done]
            const  m = nllist.filter((item) => item.id !== id)
            setDone(prev => m)
        }else if(type === "entrada") {
            const nllist = [...done]
            console.info(currentStage)
            setDone(prev =>  [...prev, currentStage  as ToDo])
        }
    } 
  }

  const handleDragstart = ( id: number, data:ToDo) => {
    setCurrenDrag(id)
    setCurrentStage(data)
  }
  const handleDragEnter = ( enterparent:string) => {
    setNewIndex(enterparent)
  }
  const handleDragEnd = (lastparent:string) => {
    const fn = mapItems[lastparent.toLowerCase()]
    fn("salida",currenDrag )

    mapItems[newIndex.toLowerCase()]( "entrada",currenDrag)
    socket.emit('update', {id: currenDrag, stage: newIndex})
  }

  useEffect(() =>{
    setTodo(todo)
    setDoing(doing)
    setStoped(stoped)
    setDone(done)
  }, [currentStage])
  useEffect(() => {
    const getall = async () => {
      const { done, doing, todo, stopped } = await allTT()
      setTodo(todo)
      setDoing(doing)
      setStoped(stopped)
      setDone(done)
    }
    getall()
  },[])

  return (
    <GeneralContext.Provider
      value={{
        todo,
        doing,
        stoped,
        done,
        handleDragEnd,
        handleDragEnter,
        handleDragstart
      }}
    >
      {children}
    </GeneralContext.Provider>
  )
}

export const useGeneralContext = () => useContext(GeneralContext)
