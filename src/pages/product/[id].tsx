import Stripe from 'stripe'
import Image from 'next/image'
import { stripe } from '@/lib/stripe'
import ButtonBuyProduct from '@/pages/components/ButtonBuyProduct'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function ProductDetails({ product }: ProductProps) {
  return (
    <>
      <Head>
        <title>{`${product.name} | Ignite Shop`}</title>
      </Head>

      <div className="grid grid-cols-2 gap-[7.2rem] mr-[18rem] content-center max-w-[1440px]">
        <div className="flex items-center justify-center bg-gradient-to-b from-[#1ea483] to-[#7456d4] rounded-lg max-w-[58rem] h-[66rem]">
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </div>

        <div className="h-[66rem] space-y-[6rem] py-10 relative">
          <h1 className="text-2xl font-bold pb-4">{product.name}</h1>
          <span className="text-green300 text-2xl font-normal">
            {product.price}
          </span>

          <p className="text-lg font-normal leading-relaxed text-gray700">
            {product.description}
          </p>

          <ButtonBuyProduct priceId={product.defaultPriceId} />
        </div>
      </div>
    </>
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
  const productId = params!.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })
  const price = product.default_price! as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
