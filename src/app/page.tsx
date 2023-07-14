import { Product } from "./components/product";
import { stripe } from "./lib/stripe";
import Stripe from "stripe";

export interface ProductsProps {
  id: string
  name: string
  imageUrl: string
  price: number | null
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

const getData = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount && price.unit_amount / 100
    }
  })

  return {
    props: {
      products
    }
  }
}