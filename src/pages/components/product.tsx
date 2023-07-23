'use client'

import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { CartContext } from '@/contexts/CartProductContext'
import { Tote } from 'phosphor-react'
import { ProductProps } from '@/reducers/cartiItem/reducer'
import { useWidthScreen } from '@/hooks/useWidthScreen'

interface ProductsProps {
  products: ProductProps[]
}

export default function Product({ products }: ProductsProps) {
  const { addProductInCart } = useContext(CartContext)
  const widthScreen = useWidthScreen()

  const [sliderRefDesktop] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    },
  })

  const [sliderRefMobile] = useKeenSlider({
    slides: {
      perView: 1.5,
      spacing: 20,
    },
  })

  const sideRef =
    widthScreen && widthScreen <= 800 ? sliderRefMobile : sliderRefDesktop

  function handleAddProductInCart(productId: string) {
    const product = products.find((product) => product.id === productId)

    if (product) {
      addProductInCart({ productId, product })
      toast('added to cart')
    }
  }

  return (
    <div ref={sideRef} className="keen-slider flex">
      {products &&
        products.map((product) => {
          return (
            <div className="group keen-slider__slide" key={product.id}>
              <Link href={`/product/${product.id}`} prefetch={false}>
                <div className="flex h-[48rem] max-mobile:h-[38rem] justify-center bg-gradient-to-b from-[#1ea483] to-[#7456d4] rounded-lg cursor-pointer relative">
                  <Image
                    priority
                    className="object-contain"
                    width={325}
                    height={300}
                    src={product.imageUrl}
                    alt=""
                  />
                </div>
              </Link>
              <div className="text-lg font-bold absolute bottom-[0.25rem] left-[0.25rem] right-[0.40rem] p-[3.2rem] max-mobile:p-[1rem] rounded-md bg-black/60 h-[6rem] animation-hover-hidden group-hover:animation-hover-show ">
                <div className="flex flex-col gap-2">
                  <span>{product.name}</span>{' '}
                  <strong className="text-xl text-green300">
                    {product.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </strong>
                </div>

                <button
                  onClick={() => handleAddProductInCart(product.id)}
                  className="bg-green500 p-2 rounded-xl"
                >
                  <Tote size={28} color="#fcfefb" weight="light" />
                </button>
              </div>
            </div>
          )
        })}
    </div>
  )
}
