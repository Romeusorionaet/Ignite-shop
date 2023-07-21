import igniteLogo from '../../assets/igniteLogo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { CartContext } from '@/contexts/CartProductContext'
import { ShoppingBagOpen } from 'phosphor-react'
import { ButtonCartSideContext } from '@/contexts/ButtonCartSideContext'

export default function Header() {
  const { cartItem } = useContext(CartContext)
  const { buttonValueCartSide, getButtonValue } = useContext(
    ButtonCartSideContext,
  )

  function handleButtonValueCartSide() {
    if (cartItem.length < 1) {
      return alert('Nada na sacola!')
    } else {
      if (buttonValueCartSide === false) {
        getButtonValue(true)
      } else {
        getButtonValue(false)
      }
    }
  }

  return (
    <header className="h-[12.4rem] flex mt-40 justify-between items-center">
      <Link href="/">
        <Image className="my-auto" src={igniteLogo} alt="" />
      </Link>
      <button
        onClick={handleButtonValueCartSide}
        className="border-none bg-none mr-[36rem]"
      >
        <div className="relative bg-gray-700 p-4 rounded-lg">
          <ShoppingBagOpen size={32} color="#fcfefb" weight="light" />
          <div className="text-3xl h-12 w-12 flex items-center justify-center absolute bg-green500 p-2 rounded-full -top-8 -right-4">
            <span>{cartItem.length}</span>
          </div>
        </div>
      </button>
    </header>
  )
}
