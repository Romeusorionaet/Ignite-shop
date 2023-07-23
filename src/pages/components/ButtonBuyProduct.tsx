'use client'

import axios from 'axios'
import { useState } from 'react'

interface CartItemsProps {
  cartItem: {
    id: string
    name: string
    imageUrl: string
    price: number
    quantity: number
  }[]
}

export default function ButtonBuyProduct({ cartItem }: CartItemsProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  async function handleBuyProduct() {
    setIsCreatingCheckoutSession(true)
    try {
      const response = await axios.post('/api/checkout', {
        cartItem,
      })
      const { checkoutUrl } = response.data
      window.location.href = checkoutUrl
    } catch (err) {
      // conectar com uma ferramenta de observabilidade (Dtadog / Sentry)
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <button
      disabled={isCreatingCheckoutSession}
      onClick={handleBuyProduct}
      className="bg-green500 text-xl font-bold w-[38.4rem] max-mobile:w-[28rem] p-[2rem] rounded-lg hover:bg-green300 duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isCreatingCheckoutSession ? 'Loading...' : 'Finalizar compra'}
    </button>
  )
}
