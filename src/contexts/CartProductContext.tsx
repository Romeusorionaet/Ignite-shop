import { ReactNode, createContext, useEffect, useState } from 'react'

export interface ProductProps {
  id: string
  name: string
  imageUrl: string
  price: number
  quantity: number
}

interface AddProductInCartProps {
  productId: string
  productToAdd: ProductProps
}

interface CartContextType {
  addProductInCart: ({ productId, productToAdd }: AddProductInCartProps) => void
  cartItem: ProductProps[]
  handleDecreaseQuantityOfProduct: (productId: string) => void
  handleIncreaseQuantityOfProduct: (productId: string) => void
  handleRemoveProductInCart: (productId: string) => void
}

export const CartContext = createContext({} as CartContextType)

interface CartContextProviderProps {
  children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItem, setCartItem] = useState<ProductProps[]>([])

  function addProductInCart({
    productId,
    productToAdd,
  }: AddProductInCartProps) {
    console.log('oi')

    const existingProduct = cartItem.find((item) => item.id === productId)

    if (!existingProduct) {
      return setCartItem((state) => [...state, productToAdd])
    }
  }

  function handleDecreaseQuantityOfProduct(productId: string) {
    const updatedCartItem = cartItem.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 }
      }
      return item
    })

    return setCartItem(updatedCartItem)
  }

  function handleIncreaseQuantityOfProduct(productId: string) {
    const updatedCartItem = cartItem.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 }
      }
      return item
    })

    return setCartItem(updatedCartItem)
  }

  function handleRemoveProductInCart(productId: string) {
    const updatedCartItem = cartItem.filter((item) => item.id !== productId)

    return setCartItem(updatedCartItem)
  }

  return (
    <CartContext.Provider
      value={{
        addProductInCart,
        cartItem,
        handleRemoveProductInCart,
        handleIncreaseQuantityOfProduct,
        handleDecreaseQuantityOfProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
