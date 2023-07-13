import Image from 'next/image'

interface shirtProps {
    shirt: string
}

export function Product({shirt}: shirtProps) {
    return(
        <a href='#' className='group'>
            <div 
            className='flex justify-center bg-gradient-to-b from-[#1ea483] to-[#7456d4] rounded-lg p[0.25rem] cursor-pointer relative'>
                <Image 
                className='object-cover' 
                width={520} height={480} 
                src={shirt} 
                alt='' 
                />

                <div 
                className='text-lg font-bold absolute bottom-[0.25rem] left-[0.25rem] right-[0.40rem] p-[3.2rem] rounded-md bg-black/60 h-[6rem] animation-hover-hidden group-hover:animation-hover-show '>
                <span>Camiseta Beyond the Limits</span> <strong className='text-xl text-green300'>R$ 79,90</strong>
                </div>
            </div>
        </a>
    )
}