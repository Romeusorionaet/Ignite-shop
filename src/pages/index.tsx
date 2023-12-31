import Head from 'next/head'
import { stripe } from '../lib/stripe'
import Stripe from 'stripe'
import Product from './components/product'
import { GetStaticProps } from 'next'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
    defaultPriceId: string
    quantity: number
  }[]
}

export default function Home({ products }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
        <meta
          name="description"
          content="This is a class project made by the technology company RocketSeat"
        />
      </Head>

      <div>
        <main>
          <Product products={products} />
        </main>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    const unitAmount = price.unit_amount !== null ? price.unit_amount / 100 : 0

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      quantity: 1,
      price: unitAmount,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
