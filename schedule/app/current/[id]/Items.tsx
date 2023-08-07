import {CurrentDoc} from '@/lib/types/global'
import styles from './current.module.css'
export function Items({doc}:{doc:CurrentDoc}) {
    return (
        <p className={styles[doc.type]}>
            {doc.content}
        </p>
    );
};
