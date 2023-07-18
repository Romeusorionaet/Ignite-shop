import { ProductStateProps, cartState } from '@/hooks/cartState'
import { useRecoilState } from 'recoil'
import Image from 'next/image'

export default function Cart() {
  const [cartItem, setCartItem] = useRecoilState<ProductStateProps[]>(cartState)
  console.log(cartItem)
  return (
    <div className="h-full absolute z-10 top-0 right-0 px-[4.8rem] w-[48rem] bg-gray800">
      <h1 className="mt-[7.2rem] mb-[4rem] text-gra600 text-2xl font-bold">
        Sacola de compras
      </h1>

      <div className="h-[50rem] flex flex-col gap-6 overflow-y-auto scrollbar">
        {cartItem &&
          cartItem.map((item) => {
            return (
              <div className="flex gap-4 items-center" key={item.id}>
                <div className="flex justify-center p-2 bg-gradient-to-b from-[#1ea483] to-[#7456d4] rounded-lg p[0.25rem] h-[10rem]">
                  <Image width={100} height={100} src={item.imageUrl} alt="" />
                </div>

                <div className="flex flex-col justify-between h-[10rem]">
                  <h3 className="text-xl font-normal text-gray700">
                    {item.name}
                  </h3>
                  <strong className="text-gray600 text-xl font-bold">
                    {item.price}
                  </strong>
                  <span className="text-gray500 font-bold text-lg">
                    remover
                  </span>
                </div>
              </div>
            )
          })}
      </div>

      <div>
        <div>
          <div>
            <p>quantidade</p>
            <span>8 itens</span>
          </div>
          <div>
            <p>Valor total</p>
            <span>R$ 666</span>
          </div>
        </div>

        <button>Finalizar compra</button>
      </div>
    </div>
  )
}
