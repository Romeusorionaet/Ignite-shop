'use client'

import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRecoilState } from 'recoil'
import { ProductStateProps, cartState } from '@/hooks/cartState'
import { useContext } from 'react'
import { CartContext } from '@/contexts/CartProductContext'

interface ProductsProps {
  products: ProductStateProps[]
}

export function Product({ products }: ProductsProps) {
  const { AddProductInCart } = useContext(CartContext)
  // const [cartItem, setCartItem] = useRecoilState<ProductStateProps[]>(cartState)

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    },
  })

  function handleAddProductInCart(productId: string) {
    const productToAdd = products.find((product) => product.id === productId)
    AddProductInCart({ productId, productToAdd })
  }

  // function handleAddProductInCart(productId: string) {
  //   const existingProduct = cartItem.find((item) => item.id === productId)
  //   let updatedCartItem = []

  //   if (existingProduct) {
  //     updatedCartItem = cartItem.map((item) => {
  //       if (item.id === productId) {
  //         return { ...item, quantity: item.quantity + 1 }
  //       }
  //       return item
  //     })

  //     setCartItem(updatedCartItem)
  //   } else {
  //     const productToAdd = products.find((product) => product.id === productId)

  //     if (productToAdd) {
  //       updatedCartItem = [...cartItem, { ...productToAdd, quantity: 1 }]
  //       setCartItem(updatedCartItem)
  //     }
  //   }

  //   toast('added to cart')
  // }

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
              <strong className="text-xl text-green300">{product.price}</strong>
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
