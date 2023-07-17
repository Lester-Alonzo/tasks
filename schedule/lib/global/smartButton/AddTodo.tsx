'use client'
import styles from './warp.module.css'
import {BiMessageSquareAdd} from 'react-icons/bi'
import {useState} from 'react'
import {WrapButton} from './BtnModalWrap'
import {ModalAddTodo} from './ModalAddTodo'

export function AddTodo() {
    const [modal, setModal] = useState(false)
    const handleClick = () => {
        setModal(prev => !prev)
    }
    return (
        <>
            {modal && <WrapButton>
                <ModalAddTodo fnClose={handleClick}/>
            </WrapButton> }

            <button className={styles.float_btn} onClick={handleClick}>
                <BiMessageSquareAdd className={styles.float_btn_icon}/>
            </button>

        </>
    )
}