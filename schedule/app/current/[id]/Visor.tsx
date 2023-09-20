import {useDocContext} from '@/lib/context/DocContext'
import styles from './current.module.css'
import Image from 'next/image'
export function Visor() {
    const {currentDoc} = useDocContext()
    if(currentDoc.type === 'link') {
        return (
        <a className={styles[currentDoc.type]} style={{marginBottom:"1rem", color:"white",textDecoration:"underline wavy red"}} href={currentDoc.url}>
            {currentDoc.content}
        </a>
        )
    }else if(currentDoc.type === 'image') {
        <Image src={currentDoc.url as string} alt='' width={100} height={100}/>
    }
    return (
        <p className={styles[currentDoc.type]} style={{marginBottom:"1rem"}}>
            {currentDoc.content}
        </p>
    ); 
};
