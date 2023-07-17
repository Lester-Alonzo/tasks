import {Docs} from '@/lib/types/global'
import {Controls} from './Contorls'
import {InputPro} from './Input'
import {useRef} from 'react'
export function MD({doc}:{doc:Docs[]}) {
    const ref = useRef<HTMLInputElement>(null)
     if (doc.length === 0) return (<>
        <Controls/>
        <InputPro ref={ref} onIput={() => console.log(ref.current?.value)}/>
     </>)
    return (
        <>
        <Controls/>
        {doc.map((d, i) => (
            <div key={i}>
                <h3>{d.content}</h3>
                <p>{d.id}</p>
            </div>
        ))}
        <InputPro ref={ref} onIput={() => console.log(ref.current?.value)}/>
        </>
    )
}