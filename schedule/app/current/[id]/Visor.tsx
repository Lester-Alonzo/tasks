import {useDocContext} from '@/lib/context/DocContext'
import styles from './current.module.css'
export function Visor() {
    const {currentDoc} = useDocContext()
    return (
        <p className={styles[currentDoc.type]} style={{marginBottom:"1rem"}}>
            {currentDoc.content}
        </p>
    ); 
};
