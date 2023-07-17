import styles from './current.module.css'
import {AiOutlineSave} from 'react-icons/ai'
import { FcLandscape,FcFolder } from 'react-icons/fc'
export function Controls() {
    return ( 
        <nav className={styles.nav_controls}>
            <button title='Title'>H1</button>
            <button title='Separador'>--</button>
            <button title='Add Images'><FcFolder/></button>
            <button title='Open Draw'>️<FcLandscape/></button>
            <button title='Guardar'><AiOutlineSave/> </button>
        </nav>
    )
}