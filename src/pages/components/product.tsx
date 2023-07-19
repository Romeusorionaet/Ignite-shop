'use client'

import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { CartContext, ProductProps } from '@/contexts/CartProductContext'

interface ProductsProps {
  products: ProductProps[]
}

export function Product({ products }: ProductsProps) {
  const { addProductInCart } = useContext(CartContext)

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    },
  })

  function handleAddProductInCart(productId: string) {
    const productToAdd = products.find((product) => product.id === productId)

    if (productToAdd) {
      addProductInCart({ productId, productToAdd })
      toast('added to cart')
    }
  }

  return (
    <div ref={sliderRef} className="keen-slider flex">
      {products.map((product) => {
        return (
          <div className="group keen-slider__slide" key={product.id}>
            <Link href={`/product/${product.id}`}>
              <div className="flex h-[48rem] justify-center  bg-gradient-to-b from-[#1ea483] to-[#7456d4] rounded-lg cursor-pointer relative">
                <Image
                  className="object-contain"
                  width={325}
                  height={300}
                  src={product.imageUrl}
                  alt=""
                />
              </div>
            </Link>
            <div className="text-lg font-bold absolute bottom-[0.25rem] left-[0.25rem] right-[0.40rem] p-[3.2rem] rounded-md bg-black/60 h-[6rem] animation-hover-hidden group-hover:animation-hover-show ">
              <span>{product.name}</span>{' '}
              <strong className="text-xl text-green300">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </strong>
              <button
                onClick={() => handleAddProductInCart(product.id)}
                className="bg-red-800"
              >
                CART
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
