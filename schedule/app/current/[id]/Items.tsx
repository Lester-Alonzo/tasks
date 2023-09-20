import {Docs} from '@/lib/types/global'
import styles from './current.module.css'
import Image from 'next/image'
export function Items({doc}:{doc:Docs}) {
    console.log(doc)
    if(doc.type === 'link') {
        return (
        <a className={styles[doc.type]} href={doc.content} target='_blank' style={{color:"black",textDecoration:"underline wavy red"}}>
            {doc.content}
        </a>
        )
    }else if(doc.type === 'image') {
        return (
            <>
            <a href={doc.content} target='_blank'>
                <Image src={doc.content} alt='' width={160} height={160} style={{borderRadius:"11px"}}/>
            </a>
            </>
        )
    }
    return (
        <p className={styles[doc.type]}>
            {doc.content}
        </p>
    );
};
