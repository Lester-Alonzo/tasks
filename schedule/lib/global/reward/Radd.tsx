'use client'
import {Rmodal} from './Rmodal'
import {useState} from 'react'
export function Radd ({}) {
const [modal, setModal] = useState(false)
const hanldeClick = () => {
    setModal(prev => !prev )
}
return (
<>
<button onClick={hanldeClick} style={{border:"none", padding:"1rem", borderRadius:"11px"}}>Nueva</button>
{modal && <Rmodal close={hanldeClick}/>}
</>
)
}