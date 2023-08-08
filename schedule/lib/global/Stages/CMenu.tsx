'use client'
import styles from './stage.module.css'
import { useGeneralContext } from '@/lib/context/genralContext'
export function CMenuItem ({}) {
    const {setterAim, currentCMenu, setterCmenu} = useGeneralContext()
    const handleClick = (state:string) => {
        setterAim(state)
    }
if(!currentCMenu.show) return null
return (
    <nav className={styles.menu} style={{position:"fixed", top:currentCMenu.y, left:currentCMenu.x}}>
        <button onClick={() => handleClick('TODO')}>ToDo</button>
        <button onClick={() => handleClick('DOING')}>Doing</button>
        <button  onClick={() => handleClick('STOPED')}>Stoped</button>
        <button onClick={() => handleClick('DONE')}>Done</button>
    </nav>
)
}