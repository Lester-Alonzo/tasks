"use client"
import {
  useState,
  createContext,
  useContext,
  useEffect,
} from "react"
import {allTT} from '@/lib/utils/allapi'
import { Task, ToDo } from '@/lib/types/global';
import {socket} from '@/lib/utils/socke'

type CMenu = {
  current:string,
  id:number,
  x:number,
  y:number,
  show:boolean
}

interface ContextProps {
  todo: ToDo[]
  doing: ToDo[]
  stoped: ToDo[]
  done: ToDo[]
  running: Task[]
  currentCMenu: CMenu
  handleDragstart: (id:number, data:ToDo) => void
  handleDragEnter: (enterparent:string) => void
  handleDragEnd: (lastparent:string) => void
  addNewTodo: (data:ToDo) => void
  setterCmenu: (data:CMenu) => void
  setterAim: (aims:string) => void
  movileENd: () => void,
  setteronlymo: (data:ToDo) => void
}

const GeneralContext = createContext<ContextProps>({
  todo: [],
  doing: [],
  stoped: [],
  done: [],
  running: [],
  currentCMenu: {
    current:"",
    id:0,
    x:0,
    y:0,
    show:false
  },
  handleDragstart: (id:number, data:ToDo) => {},
  handleDragEnter: (enterprent:string) => {},
  handleDragEnd: ( lastparent:string) => {},
  addNewTodo: (data:ToDo) => {},
  setterCmenu: (data:CMenu) => {},
  setterAim: (aims:string) => {},
  movileENd: () => {},
  setteronlymo: (data:ToDo) => {}
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
  const [running, setRunning] = useState<Array<Task>>([])
  const [currenDrag, setCurrenDrag] = useState(0)
  const [currentStage, setCurrentStage] = useState<ToDo>()
  const [newIndex, setNewIndex] = useState('')
  const [currentCMenu, setCurrentCMenu] = useState<CMenu>({
    current:"",
    id:0,
    x:0,
    y:0,
    show:false
  })
  const [aim, setIam] = useState<string>('') 

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
    fn("salida", currenDrag )

    mapItems[newIndex.toLowerCase()]( "entrada",currenDrag)
    socket.emit('update', {id: currenDrag, stage: newIndex})
  }

  const setterCmenu = (data:CMenu) => {
    setCurrentCMenu(prev => prev = {...data})
  }
  const setteronlymo = (data:ToDo) => {
    setCurrentStage(data)
  }
  const setterAim = (aims:string) => {
    setIam(prev => aims)
  }
  const addNewTodo = (data:ToDo) => {
    setTodo(prev => [...prev, data])
  }
  const movileENd = () => {
    console.log("soy el aim", aim, currentCMenu)
    const fn = mapItems[currentCMenu.current.toLowerCase()]
    fn("salida", currentCMenu.id )

    mapItems[aim.toLowerCase()]( "entrada",currentCMenu.id)
    socket.emit('update', {id: currentCMenu.id, stage: aim})
  }

  useEffect(() =>{
    setTodo(todo)
    setDoing(doing)
    setStoped(stoped)
    setDone(done)
  }, [currentStage])
  useEffect(() => {
    const getall = async () => {
      const { done, doing, todo, stopped, runnig} = await allTT()
      setTodo(todo)
      setDoing(doing)
      setStoped(stopped)
      setDone(done)
      setRunning(runnig)
    }
    getall()
  },[])
useEffect(() => {
  if(aim === '') return
  movileENd()
  setterCmenu({
            current:"",
            id:0,
            x:0,
            y:0,
            show:false
        })
},[aim])
  return (
    <GeneralContext.Provider
      value={{
        todo,
        doing,
        stoped,
        done,
        running,
        handleDragEnd,
        handleDragEnter,
        handleDragstart,
        addNewTodo,
        setterCmenu,
        setterAim,
        movileENd,
        currentCMenu,
        setteronlymo
      }}
    >
      {children}
    </GeneralContext.Provider>
  )
}

export const useGeneralContext = () => useContext(GeneralContext)
