import Image from 'next/image'
import ButtonBuyProduct from './ButtonBuyProduct'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '@/contexts/CartProductContext'
import { ButtonCartSideContext } from '@/contexts/ButtonCartSideContext'
import { Minus, Plus, X } from 'phosphor-react'

export default function Cart() {
  const {
    cartItem,
    handleDecreaseQuantityOfProduct,
    handleIncreaseQuantityOfProduct,
    handleRemoveProductInCart,
  } = useContext(CartContext)
  const [totalValue, setTotalValue] = useState<number>(0)
  const { buttonValueCartSide, getButtonValue } = useContext(
    ButtonCartSideContext,
  )

  useEffect(() => {
    function calculateTotalValue() {
      let total = 0

      cartItem.forEach((item) => {
        const itemTotal = item.price * item.quantity
        total += itemTotal
      })

      setTotalValue(total)
    }
    calculateTotalValue()
  }, [cartItem])

  function handleButtonValueCartSide() {
    if (buttonValueCartSide === false) {
      getButtonValue(true)
    } else {
      getButtonValue(false)
    }
  }

  return (
    <div
      className={`${
        buttonValueCartSide === false
          ? 'hidden'
          : 'h-screen max-mobile:w-screen absolute z-10 top-0 right-0 px-[4.8rem] max-mobile:px-[2rem] max-w-[48rem] bg-gray800 border-b-2 border-b-green-500 max-mobile:flex flex-col items-center'
      }`}
    >
      <button
        onClick={handleButtonValueCartSide}
        className="absolute top-8 right-16"
      >
        <X size={32} color="#fcfefb" weight="light" />
      </button>
      <h1 className="mt-[7.2rem] mb-[4rem] text-gra600 text-2xl font-bold">
        Sacola de compras
      </h1>

      <div className="h-[50rem] flex flex-col gap-6 overflow-x-auto scrollbar max-mobile:items-center">
        {cartItem &&
          cartItem.map((item) => {
            return (
              <div
                className="flex gap-4 items-center w-[32.5rem]"
                key={item.id}
              >
                <div className="relative flex justify-center p-2 bg-gradient-to-b from-[#1ea483] to-[#7456d4] rounded-lg p[0.25rem] h-[10rem]">
                  <Image width={100} height={100} src={item.imageUrl} alt="" />
                  <span className="absolute right-2 top-2 text-lg">
                    {item.quantity}X
                  </span>
                </div>

                <div className="flex flex-col justify-between h-[10rem]">
                  <h3 className="text-xl font-normal text-gray700">
                    {item.name}
                  </h3>
                  <strong className="text-gray600 text-xl font-bold">
                    {(item.quantity * item.price).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </strong>

                  <div className="flex gap-6 justify-between w-[16rem]">
                    <button
                      onClick={() => handleRemoveProductInCart(item.id)}
                      className="text-gray500 font-bold text-lg text-green300"
                    >
                      remover
                    </button>

                    <div className="flex gap-6">
                      <button
                        onClick={() => handleIncreaseQuantityOfProduct(item.id)}
                      >
                        <Plus size={28} color="#fcfefb" weight="light" />
                      </button>
                      <button
                        onClick={() => handleDecreaseQuantityOfProduct(item.id)}
                      >
                        <Minus size={28} color="#fcfefb" weight="light" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
      </div>

      <div className="h-[20rem] max-mobile:max-w-[30rem] flex-col">
        <div className=" flex flex-col gap-7 ">
          <div className="flex justify-between">
            <p className="text-gray600 text-xl">quantidade</p>
            <span className="text-gray700 text-xl">
              {cartItem.length} itens
            </span>
          </div>

          <div className="flex justify-between">
            <p className="text-gray700 text-2xl font-bold">Valor total</p>
            <span className="text-gray600 text-3xl font-bold">
              R${' '}
              {totalValue.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
        </div>

        <div className="mt-[8rem] max-mobile:mt-[2rem]">
          <ButtonBuyProduct cartItem={cartItem} />
        </div>
      </div>
    </div>
  )
}
