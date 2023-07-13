import logoIgnite from '../assets/logoIgnite.svg'
import Image from 'next/image'

export function Header() {
    return(
        <header className='h-[12.4rem] flex mt-40'>
            <Image className='my-auto' src={logoIgnite} alt='' />
        </header>
    )
}