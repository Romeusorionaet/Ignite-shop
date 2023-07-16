import { Product } from "./components/product";
import { stripe } from "./lib/stripe";
import Stripe from "stripe";

export interface ProductsProps {
  id: string
  name: string
  imageUrl: string
  price: string | null
}

export default async function Home() {
  const data = await getData()
  const products: ProductsProps[] = data.props.products

  return (
    <main>
      <Product products={products} />
    </main>
  )
}

// Indicated to use GetServerStaticProps 

const getData = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    const unitAmount = price?.unit_amount ?? 0

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(unitAmount / 100)
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}