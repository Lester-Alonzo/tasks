import { ToDo, Task } from "@/lib/types/global"

export const allTT = async (): Promise<any> => {
  console.log("env passed", process.env.NEXT_PUBLIC_API_URL as string)
  const url = process.env.NEXT_PUBLIC_BASE_URL as string
  const res = await fetch(url)
  const data = (await res.json()) as ToDo[]
  console.log(data)
  let done: ToDo[] = []
  let doing: ToDo[] = []
  let todo: ToDo[] = []
  let stopped: ToDo[] = []
  let runnig: Task[] = []

  data.forEach((element) => {
    if (element.stage.toUpperCase() === "DONE") {
      console.log("done")
      let fdn = localScan(element.Tasks, element.title)
      runnig.push(...fdn)
      console.log(runnig)
      done.push(element)
    }
    if (element.stage.toUpperCase() === "DOING") {
      console.log("doing")
      let fdn = localScan(element.Tasks, element.title)
      runnig.push(...fdn)
      console.log(runnig)
      doing.push(element)
    }
    if (element.stage.toUpperCase() === "TODO") {
      console.log("todo")
      let fdn = localScan(element.Tasks, element.title)
      runnig.push(...fdn)
      console.log(runnig)
      todo.push(element)
    }
    if (element.stage.toUpperCase() === "STOPED") {
      console.log("stopped")
      let fdn = localScan(element.Tasks, element.title)
      runnig.push(...fdn)
      console.log(runnig)
      stopped.push(element)
    }
  })
  return { done, doing, todo, stopped, runnig }
}

const localScan = (task: Task[], parent:string): Task[] => {
  let final:Task[] = []
  task.forEach((element) => {
    if(element.time != "") {
      element.parent = parent
      final.push(element)
    } 
  })
  return final
}