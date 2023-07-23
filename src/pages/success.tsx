import Link from 'next/link'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import Head from 'next/head'

interface SuccessProps {
  customerName: string
  products: {
    id: string
    name: string
    imageUrl: string
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {
  const possessivePronouns = products.length > 1 ? `${'seus '}` : `${'sua '}`
  const product =
    products.length > 1 ? `${'produtos '}` : products.map((item) => item.name)

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="pb-[2rem] flex flex-col items-center justify-center mt-[4rem] pr-[10rem] max-mobile:pr-0 max-h-[65.6] overflow-hidden">
        <div className="flex justify-center flex-wrap items-center h-[20rem] overflow-auto scrollbar">
          {products.map((item, index) => {
            return (
              <div
                key={item.id}
                className={`min-w-[12rem] ${
                  index === 0 ? '' : ''
                } shadow-lg shadow-black p-6 max-w-[13rem] h-[14.5rem] bg-gradient-to-b from-[#1ea483] to-[#7456d4] rounded-full p[0.25rem] flex item-center justify-center`}
              >
                <Image
                  width={120}
                  height={110}
                  className="object-cover"
                  src={item.imageUrl}
                  alt={item.name}
                />
              </div>
            )
          })}
        </div>

        <div className="max-mobile:flex flex-col items-center">
          <h1 className="text-2xl text-gray600 my-[6rem]">Compra Efetuada!</h1>

          <p className="text-xl text-gray700 max-w-[56rem] align-center">
            Uhuul <strong>{customerName}</strong> {possessivePronouns}
            <strong>{product}</strong> já está a caminho da sua casa.
          </p>

          <Link className="block mt-[8rem] text-lg text-green500" href="/">
            Voltar ao catálogo
          </Link>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details
    ? session.customer_details.name
    : null

  const products =
    session.line_items && session.line_items.data
      ? session.line_items.data.map((item: Stripe.LineItem) => {
          const product = item.price && (item.price.product as Stripe.Product)
          return {
            id: product ? product.id : null,
            name: product ? product.name : null,
            imageUrl: product && product.images ? product.images[0] : null,
          }
        })
      : []

  return {
    props: {
      customerName,
      products,
    },
  }
}
