import { useRecoilState } from 'recoil'
import igniteLogo from '../../assets/igniteLogo.svg'
import Image from 'next/image'
import { cartState } from '@/hooks/cartState'
import Link from 'next/link'

export function Header() {
  const [cartItem] = useRecoilState(cartState)

  return (
    <header className="h-[12.4rem] flex mt-40">
      <Image className="my-auto" src={igniteLogo} alt="" />
      <Link href="/cart">
        <span className="text-2xl bg-red-900">{cartItem.length}</span>
      </Link>
    </header>
  )
}
