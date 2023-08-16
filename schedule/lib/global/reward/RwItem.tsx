'use client'
import {Rewards} from '@/lib/types/global'
import {useBubble} from '@/lib/context/Bubble'
import styles from './rw.module.css'
export function RwItem ({reward}: {reward: Rewards}) {
    const {coins, handleBuy} = useBubble()
    const handleClick = () => {
        handleBuy(reward.price)
        alert(`compraste ${reward.title}`)
    }
return (
    <div className={styles.item}>
        <h4>{reward.title}</h4>
        <p className={styles.price}>$.{reward.price}</p>
        <p className={styles.desp}>{reward.content}</p>
        {coins >= reward.price ? <button onClick={handleClick}>Comprar</button> : <p className={styles.message}>necesitas mas dinero</p>}
    </div>
)
}