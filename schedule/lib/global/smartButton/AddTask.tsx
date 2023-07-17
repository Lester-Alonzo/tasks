'use client'
import {MdOutlineLibraryAdd} from 'react-icons/md'
import {useState} from 'react'
import styles from './warp.module.css'
import {WrapButton} from './BtnModalWrap'
import {ModalAddTask} from './ModalAddTAsk'

export function AddTask({tid}:{tid:number}) {
    const [modal, setModal] = useState(false)
    const handleClick = () => {
        setModal(prev => !prev)
    }
    return (
        <>
        {modal && <WrapButton>
            <ModalAddTask id={tid} fnClose={handleClick}/>
            </WrapButton>}
        <button className={styles.float_btn} onClick={handleClick}>
            <MdOutlineLibraryAdd className={styles.float_btn_icon}/>
        </button>
        </>
    )
}