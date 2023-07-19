import igniteLogo from '../../assets/igniteLogo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { CartContext } from '@/contexts/CartProductContext'

export function Header() {
  const { cartItem } = useContext(CartContext)

  return (
    <header className="h-[12.4rem] flex mt-40">
      <Link href="/">
        <Image className="my-auto" src={igniteLogo} alt="" />
      </Link>
      <Link href="/cart">
        <span className="text-2xl bg-red-900">{cartItem.length}</span>
      </Link>
    </header>
  )
}
