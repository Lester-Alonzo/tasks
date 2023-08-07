'use client'
import { FormEvent, forwardRef, KeyboardEvent} from 'react'
import styles from './current.module.css'
type InputProps = {
    onIput?: (e:FormEvent<HTMLInputElement>) => void
    onKeyDown?: (e:KeyboardEvent<HTMLInputElement>) => void
}
export const InputPro = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return <input type="text" className={styles.inpuc} ref={ref} onInput={props.onIput} autoCorrect='true' autoFocus onKeyDown={props.onKeyDown}/>
})

InputPro.displayName = 'InputPro'
