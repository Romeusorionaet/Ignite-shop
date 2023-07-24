'use client'

import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useContext, useState } from 'react'
import { CartContext } from '@/contexts/CartProductContext'
import { CaretLeft, CaretRight, Tote } from 'phosphor-react'
import { ProductProps } from '@/reducers/cartiItem/reducer'
import { useWidthScreen } from '@/hooks/useWidthScreen'

interface ProductsProps {
  products: ProductProps[]
}

export default function Product({ products }: ProductsProps) {
  const { addProductInCart } = useContext(CartContext)
  const widthScreen = useWidthScreen()

  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRefMobile] = useKeenSlider<HTMLDivElement>({
    mode: 'snap',
    slides: {
      perView: 1.5,
      spacing: 20,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  const [sliderRefDesktop, instanceRef] = useKeenSlider<HTMLDivElement>({
    mode: 'free-snap',
    slides: {
      perView: 2.5,
      spacing: 48,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  const sliderRef =
    widthScreen && widthScreen <= 800 ? sliderRefMobile : sliderRefDesktop

  function handleAddProductInCart(productId: string) {
    const product = products.find((product) => product.id === productId)

    if (product) {
      addProductInCart({ productId, product })
      toast('added to cart')
    }
  }

  const handleSliderNext = () => {
    if (instanceRef.current) {
      instanceRef.current.next()
      const isLastSlide =
        currentSlide === instanceRef.current.track.details.slides.length - 2
      setLoaded(!isLastSlide)
    }
  }

  const handleSliderPrev = () => {
    if (instanceRef.current) {
      instanceRef.current.prev()
      setLoaded(currentSlide !== 0)
    }
  }

  return (
    <div className="relative">
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider flex z-10">
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
                  <div className="text-lg font-bold absolute bottom-[0.25rem] left-[0.25rem] right-[0.40rem] p-[3.2rem] max-mobile:p-[1rem] rounded-md bg-black/60 h-[6rem] animation-hover-hidden group-hover:animation-hover-show">
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

        {loaded && instanceRef.current && (
          <div className="flex justify-between absolute top-0 w-full h-full">
            <div
              className={`bg-gradient-to-r from-slate-900 w-[13.6rem] z-10 flex justify-end items-center ${
                currentSlide === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-100 pointer-events-auto'
              }`}
            >
              <Arrow
                left
                onClick={(e: any) => e.stopPropagation() || handleSliderPrev()}
                disabled={currentSlide === 0}
              />
            </div>

            <div
              className={`bg-gradient-to-l from-slate-900 w-[20rem] z-10 flex items-center pl-[6rem] ${
                currentSlide ===
                instanceRef.current.track.details.slides.length - 2
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-100 pointer-events-auto'
              }`}
            >
              <Arrow
                onClick={(e: any) => e.stopPropagation() || handleSliderNext()}
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 2
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Arrow(props: {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
}) {
  const disabled = props.disabled ? ' arrow--disabled' : ''
  const arrowDirection = props.left ? 'arrow--left' : 'arrow--right'

  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${arrowDirection} ${disabled}`}
      viewBox="0 0 24 24"
    >
      {props.left && <CaretLeft size={12} color="#c4c4cc" weight="light" />}
      {!props.left && <CaretRight size={12} color="#c4c4cc" weight="light" />}
    </svg>
  )
}
