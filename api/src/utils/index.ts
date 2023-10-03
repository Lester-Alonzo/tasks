import {Todo} from './utiiltypes.d'
export function ParseDate():string {
   const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    return `${day}/${month + 1}/${year}` 
}

class TODAY {
    tareas:Todo[]
    listas:number[]
    constructor() {
        this.tareas = []
        this.listas = []
    }
    TodayTasks(tareas:Todo[]) {
        this.tareas = tareas
    }
    markTask(id:number) {
        if(this.tareas.find(t => t.id === id)) this.listas.push(id) 
    }
    obtaninTasks() {
        return this.tareas.map(t => {
            if(!this.listas.find(tl => tl === t.id)) return t
        }).filter(Boolean)
        
    }
}

export const tday = new TODAY()