import Stripe from 'stripe'
import Image from 'next/image'
import { stripe } from '@/lib/stripe'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { CartContext } from '@/contexts/CartProductContext'
import { useRouter } from 'next/router'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    description: string
    quantity: number
    defaultPriceId: string
  }
}

export default function ProductDetails({ product }: ProductProps) {
  const { addProductInCart } = useContext(CartContext)
  const { isFallback } = useRouter()

  function handleAddProductInCart(productId: string) {
    addProductInCart({ productId, product })
    toast('added to cart')
  }

  if (isFallback) {
    return (
      <div className="w-full flex items-center justify-center">
        <h1 className="text-2xl">...Loading</h1>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-[7.2rem] mr-[18rem] content-center max-w-[1440px]">
      {product && (
        <>
          <Head>
            <title>{`${product.name} | Ignite Shop`}</title>
          </Head>

          <div className="flex items-center justify-center bg-gradient-to-b from-[#1ea483] to-[#7456d4] rounded-lg max-w-[58rem] h-[66rem]">
            <Image src={product.imageUrl} width={520} height={480} alt="" />
          </div>

          <div className="h-[66rem] py-10 flex justify-between flex-col relative">
            <div className="space-y-[6rem] w-[40rem]">
              <h1 className="text-2xl font-bold pb-4">{product.name}</h1>
              <span className="text-green300 text-2xl font-normal">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>

              <p className="text-lg font-normal leading-relaxed text-gray700">
                {product.description}
              </p>
            </div>

            <button
              onClick={() => handleAddProductInCart(product.id)}
              className="bg-green500 text-xl font-bold w-[38.4rem] p-[2rem] rounded-lg hover:bg-green300 duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Colocar na sacola
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_OG0VyBWXR6d3G3' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id ? params.id : ''

  if (!productId) {
    return {
      notFound: true,
    }
  }

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  const unitAmount = price.unit_amount !== null ? price.unit_amount / 100 : 0

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: unitAmount,
        quantity: 1,
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
