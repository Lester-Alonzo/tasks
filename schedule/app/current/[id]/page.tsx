import {Task} from '@/lib/types/global'
import {Table} from './Table'
import {AddTask} from '@/lib/global'
export default async function Page({params}:{params:{id:string}}) {
    const url = process.env.NEXT_PUBLIC_BASE_URL as string
    const data = await fetch(`${url}tdtk/${params.id}`, {next: {revalidate:0}})
    const res:Task[] = await data.json()
    return (
        <main style={{padding:"1rem", width:"100%", minHeight:"100vh", maxHeight:"100%"}}>
            <h3 style={{fontSize:"3rem", textAlign:"center", margin:"2rem 0"}}>Sub Tareas:</h3>
            <Table data={res}/>
            <AddTask tid={Number(params.id)}/>
        </main>
    )
}  