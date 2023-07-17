export interface ToDo {
    id : number;
    title : string;
    stage: 'TODO' | 'DOING' | 'STOPED' | 'DONE'
    Tasks: Task[];
}
/*
UI = Urgente Importante 
UNI = Urgente No Importante
NUI = No Urgente Importante
NUNI = No Urgente No Importante
*/
export type TASK_TYPE = 'UI' | 'UNI' | 'NUI' | 'NUNI'
interface Task {
    id : number;
    title : string;
    type:  TASK_TYPE
    time: string
    Doc: Docs[] 
    parent?: string
}
interface Docs {
    id : number;
    content: string;
}