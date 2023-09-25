'use client'
import styles from './current.module.css'
import {AiOutlineSave} from 'react-icons/ai'
import { FcLandscape,FcFolder } from 'react-icons/fc'
import {Tldraw} from '@tldraw/tldraw'
import  '@tldraw/tldraw/tldraw.css'
import {useState, useRef} from 'react'

export function Controls() {
    const [mostrar, setMostrar] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)
    const handleChange = async () => {
        setLoading(true)
        const formData = new FormData(formRef.current as HTMLFormElement)
        const entri = Object.fromEntries(formData)
        console.log(entri)
        const rs = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}upload`, {
            method:"POST",
            body: formData
        })
        const name = await rs.json()
        console.log()

        await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_SOCKET_URL}public/${name.name[0].filename}`)
        setLoading(false)
    }
    return ( 
        <>
        <nav className={styles.nav_controls}>
            <form action="" encType='multipart/form-data' ref={formRef} style={{opacity:`${loading? '.3':'1'}`}}>
                <label htmlFor="file"> <FcFolder/> <input type="file" name="file" id="file" disabled={loading? true : false} hidden onInput={handleChange}/></label>
            </form>
            <button title='Open Draw' onClick={() => setMostrar(prev => !prev)}>️<FcLandscape/></button>
            {/* <button title='Guardar'><AiOutlineSave/> </button> */}
        </nav>
               {mostrar && <div style={{position:"fixed", inset:"0", zIndex:"88"}}>
                <Tldraw/>
                </div>} 
        </>
    )
}