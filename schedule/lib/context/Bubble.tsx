'use client'
import {Task} from '@/lib/types/global'
import {socket} from '@/lib/utils/socke'

import {useState, useEffect, createContext, useContext} from 'react'

type BubbleContext = {
     handleBuy: (price:number) => void
    coins: number
}

const BubbleContext = createContext<BubbleContext>({
    handleBuy: (price:number) => {},
    coins: 0
})

export function BubbleProvider({children}:{children:React.ReactNode}) {
    const [coins, setCoins] = useState<number>(0)
    const hanldleInit = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}allcoin`)
        const data = await res.json()
        console.log(data)
        setCoins(data.coin)
    }
    const handleBuy = (price:number) => {
        socket.emit('getcoins', {id:1, coins: coins - price} )
    }
    useEffect(() => {
    console.log('hola')
    hanldleInit()
    socket.on('updatedcoins', (data) => {
        console.warn('hola', data)
        setCoins(data.coin)
    })
    },[])
    return (
        <BubbleContext.Provider value={{coins, handleBuy}}
        >
            {children}
        </BubbleContext.Provider>
    )
}

export const useBubble = () => useContext(BubbleContext)