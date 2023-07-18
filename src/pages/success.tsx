import Link from 'next/link'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import Head from 'next/head'

interface SuccessProps {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="flex flex-col items-center justify-center my-8 max-h-[65.6]">
        <h1 className="text-2xl text-gray600">Compra Efetuada!</h1>

        <div className="w-full max-w-[13rem] h-[14.5rem] bg-gradient-to-b from-[#1ea483] to-[#7456d4] rounded-lg p[0.25rem] mt-[6rem] mb-[4rem] flex item-center justify-center">
          <Image
            width={120}
            height={110}
            className="object-cover"
            src={product.imageUrl}
            alt=""
          />
        </div>

        <p className="text-xl text-gray700 max-w-[56rem] align-center">
          Uhuul <strong>{customerName}</strong>, sua
          <strong>{product.name}</strong>
          já está a caminho da sua casa.
        </p>

        <Link className="block mt-[8rem] text-lg text-green500" href="/">
          Voltar ao catálogo
        </Link>
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

  const customerName = session.customer_details!.name
  const product = session.line_items!.data[0].price!.product as Stripe.Product

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  }
}
