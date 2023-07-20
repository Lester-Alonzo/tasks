import {Task} from '@/lib/types/global'
import {Table} from './Table'
import {AddTask} from '@/lib/global'
export default async function Page({params}:{params:{id:string}}) {
    const url = 'http://10.0.1.200:3001/v1/'
    const data = await fetch(`${url}tdtk/${params.id}`, {next: {revalidate:0}})
    const res:Task[] = await data.json()
    return (
        <div style={{padding:"1rem"}}>
            <h3 style={{fontSize:"3rem", textAlign:"center", margin:"2rem 0"}}>Sub Tareas:</h3>
            <Table data={res}/>
            <AddTask tid={Number(params.id)}/>
        </div>
    )
}  