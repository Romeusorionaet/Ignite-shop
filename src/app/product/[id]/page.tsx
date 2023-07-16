import { stripe } from "@/app/lib/stripe"
import Stripe from "stripe"
import Image from 'next/image'

interface ParamsProps {
    params: {
        id: string
    }
}

export default async function ProductDetails({ params }: ParamsProps) {
    const productId = params.id

    const productValue = await stripe.products.retrieve(productId, {
        expand: ['default_price'],
    })

    const price = productValue.default_price as Stripe.Price
    const unitAmount = price?.unit_amount ?? 0
    const priceFormated = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(unitAmount / 100)

    const [image] = productValue.images

    return(
        <div className="grid grid-cols-2 gap-[7.2rem] mr-[18rem] content-center max-w-[1440px]">
            <div className="bg-gradient-to-b from-[#1ea483] to-[#7456d4] rounded-lg max-w-[58rem] h-[66rem]">
                <Image 
                src={image} 
                width={520} height={480}
                alt='' 
                />
            </div>

            <div className="h-[66rem] space-y-[4rem] py-10 relative">
                <h1 className="text-2xl font-bold">{productValue.name}</h1>
                <span className="text-green300 text-2xl font-normal">{priceFormated}</span>

                <p className="text-lg font-normal leading-relaxed text-gray700">
                    {productValue.description}
                </p>

                <button className="bg-green500 text-xl font-bold w-full p-[2rem] rounded-lg absolute bottom-0 hover:bg-green300 duration-500">
                    Comprar agora
                </button>
                
            </div>
            
        </div>
    )
}