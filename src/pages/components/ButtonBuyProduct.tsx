'use client'

import axios from 'axios'
import { useState } from 'react'

interface ButtonBuyProductProps {
  priceId: string
}

export default function ButtonBuyProduct({ priceId }: ButtonBuyProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  async function handleBuyProduct() {
    setIsCreatingCheckoutSession(true)

    try {
      const response = await axios.post('/api/checkout', {
        priceId,
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
      className="bg-green500 text-xl font-bold w-full p-[2rem] rounded-lg absolute bottom-0 hover:bg-green300 duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isCreatingCheckoutSession ? 'Loading...' : 'Comprar agora'}
    </button>
  )
}
