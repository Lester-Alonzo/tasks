import styles from './card.module.css'
import {PassDays} from '@/lib/utils/utils'
import {Task} from '@/lib/types/global'
import {CD, Reward, RunRw} from '@/lib/global'

export default async function Page() {

        const url = process.env.NEXT_PUBLIC_BASE_URL as string
        const res = await fetch(`${url}alldy`, {next: {revalidate:0}})
        const AllLocalTask:Task[] = await res.json()

    if(AllLocalTask.length == 0) return<>
        <h1>No hay datos</h1>
        <Reward />
    </> 
    return (
        <main className={styles.main}>
            <section>
            {AllLocalTask.map( (task) => (
                <div style={{backgroundColor:`${task.type == 'NUI' ? '#42ff94' : task.type == 'NUNI'? '#4294ff' : task.type == 'UI' ? '#ff4242' :  '#ffc342'}`}} className={`${styles.card} ${task.run === 'uni' ? styles.uni : ''}`} key={task.id}>
                    <h1 style={{backgroundColor:"rgba(0,0,0,.3)", padding:".5rem", borderRadius:"11px"}}>{task.title}   {task.pin}</h1>
                    <CD />
                    <p style={{border:"1px solid white", padding:".4rem", textAlign:"center", borderRadius:"11px"}}><strong>Dias pasados:</strong> {PassDays(task.time)} </p>
                    <RunRw type={task.type} idt={task.id}/>
                </div>
            ))}
            </section>
            <Reward />
        </main>
    )
}