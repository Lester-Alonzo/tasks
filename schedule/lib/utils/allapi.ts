import { ToDo } from "@/lib/types/global"
export const allTT = async (): Promise<any> => {
  const res = await fetch("http://localhost:3001/v1/")
  const data = (await res.json()) as ToDo[]
  let done: ToDo[] = []
  let doing: ToDo[] = []
  let todo: ToDo[] = []
  let stopped: ToDo[] = []
  data.forEach((element) => {
    if (element.stage.toUpperCase() === "DONE") done.push(element)
    if (element.stage.toUpperCase() === "DOING") doing.push(element)
    if (element.stage.toUpperCase() === "TODO") todo.push(element)
    if (element.stage.toUpperCase() === "STOPED") stopped.push(element)
  })
  return { done, doing, todo, stopped }
}
