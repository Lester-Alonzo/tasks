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
export type RUN = 'rep' | 'uni' 
interface Task {
    id : number;
    title : string;
    type:  TASK_TYPE
    run: RUN
    pin: string
    time: string
    Doc: Docs[] 
    Days: Days[]
    parent?: string
}
interface Docs {
    id : number;
    content: string;
    type: DOC_TYPE,
}
interface Days {
    id: number
    date: number
}

type DOC_TYPE = 'title' | 'separetor' | 'text' | 'image' | 'link' | 'yt' 
export interface CurrentDoc {
    type: DOC_TYPE,
    content: string
    url?: string
}
type REWARD_TYPE = 'NORMAL' | 'COUNTDOWN'
export interface Rewards {
    id : number;
    price: number;
    title: string;
    content: string;
    type: REWARD_TYPE
    time?: string
}