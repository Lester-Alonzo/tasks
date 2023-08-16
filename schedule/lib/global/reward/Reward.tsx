import {Radd} from './Radd'
import {RwItem} from './RwItem'
import styles from './rw.module.css'
import {Rewards} from '@/lib/types/global'
export async function Reward ({}) {
    const rs = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}allrw`)
    const data:Rewards[] = await rs.json()
return (
    <div className={styles.rew_main}>
        <Radd/>
        <section className={styles.rewards}>
        {data.map((item, index) => (
            <RwItem key={index} reward={item}/>
        ))}
        </section>
    </div>
)
}