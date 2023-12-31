import {Docs} from '@/lib/types/global'
import {Controls} from './Contorls'
import {InputPro} from './Input'
import {Visor} from './Visor'
import {Items} from './Items'
import {useDocContext} from '@/lib/context/DocContext'
import {useRef, FormEvent, KeyboardEvent} from 'react'

export function MD({docfrom}:{docfrom:Docs[]}) {

    const ref = useRef<HTMLInputElement>(null)

    const {currentdocedit, currentDoc, hanldeAddDoc} = useDocContext()

    const handler = (e:FormEvent<HTMLInputElement>) => {
        const iput = ref?.current as HTMLInputElement
        currentdocedit((iput.value as string), '')
        console.log(currentDoc)
    }

    const handlerKD = (e:KeyboardEvent<HTMLInputElement>) => {
        const imm = ref?.current as HTMLInputElement
        if (e.key === 'Enter') {
            imm.value = ''
            hanldeAddDoc()
        }
    }

     if (docfrom.length === 0) return (<>
        <Controls/>
        <Visor/>
        <InputPro ref={ref} onIput={handler} onKeyDown={handlerKD}/>
     </>)
    return (
        <>
        <Controls/>
        <div style={{display:"flex", flexDirection:"column", borderRadius:"11px", justifyContent:"center", alignItems:"center", backgroundColor:"#e3e3e3", color:"black", padding:"1rem", overflow:"hidden"}}>
        {docfrom.map((d, i) => (
            <Items key={i} doc={d}/>
        ))}
        </div>
        <Visor/>
        <InputPro ref={ref} onIput={handler} onKeyDown={handlerKD}/>
        </>
    )
}