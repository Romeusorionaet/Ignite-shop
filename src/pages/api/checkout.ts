import { stripe } from '@/lib/stripe'
import { NextApiRequest, NextApiResponse } from 'next'

interface ProductsProps {
  id: string
  name: string
  imageUrl: string
  price: string
  defaultPriceId: string
  quantity: number
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { cartItem } = request.body

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const transformItems = cartItem.map((item: ProductsProps) => ({
    price: item.defaultPriceId,
    quantity: item.quantity,
  }))

  const checkoutSession = await stripe.checkout.sessions.create({
    line_items: transformItems,
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
  })

  const successUrlWithSessionId = successUrl.replace(
    '{CHECKOUT_SESSION_ID}',
    checkoutSession.id,
  )

  return response.status(201).json({
    checkoutUrl: checkoutSession.url,
    successUrlWithSessionId,
  })
}
