'use client'

import '../../styles/product.css'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Link from 'next/link'

interface ProductsProps {
    products: {
        id: string
        name: string;
        imageUrl: string;
        price: string | null
    }[]
}

export function Product({products}: ProductsProps) {
    const [sliderRef] = useKeenSlider({
        slides: {
        perView: 2.5,
        spacing: 48,
        }
    })

    return(
        <div ref={sliderRef} className='keen-slider flex'>
                {
                    products.map((product) => {
                        return(
                            <Link 
                            key={product.id}
                            href={`/product/${product.id}`} 
                            className='group keen-slider__slide'
                            >
                                <div 
                                className='flex justify-center bg-gradient-to-b from-[#1ea483] to-[#7456d4] rounded-lg p[0.25rem] cursor-pointer relative'>
                                    <Image 
                                    className='object-cover' 
                                    width={520} height={480} 
                                    src={product.imageUrl} 
                                    alt='' 
                                    />

                                    <div 
                                    className='text-lg font-bold absolute bottom-[0.25rem] left-[0.25rem] right-[0.40rem] p-[3.2rem] rounded-md bg-black/60 h-[6rem] animation-hover-hidden group-hover:animation-hover-show '>
                                    <span>{product.name}</span> <strong className='text-xl text-green300'>{product.price}</strong>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
        </div>
    )
}