'use client'
import { FormEvent, forwardRef } from 'react'
type InputProps = {
    onIput?: (e:FormEvent<HTMLInputElement>) => void
}
export const InputPro = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return <input type="text" ref={ref} onInput={props.onIput}/>
})

InputPro.displayName = 'InputPro'
