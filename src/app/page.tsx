'use client'

import { Product } from "./components/product";
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    }
  })

  return (
    <main
    ref={sliderRef}
    className='keen-slider flex'>
      <Product shirt={image} />

    </main>
  )
}