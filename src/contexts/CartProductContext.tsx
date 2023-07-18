import { ProductStateProps, cartState } from '@/hooks/cartState'
import { ReactNode, createContext } from 'react'
import toast from 'react-hot-toast'
import { useRecoilState } from 'recoil'

interface AddProductInCartProps {
  productId: string
  productToAdd?: ProductStateProps
}

interface CartContextType {
  AddProductInCart: ({ productId, productToAdd }: AddProductInCartProps) => void
}

export const CartContext = createContext({} as CartContextType)

interface CartContextProviderProps {
  children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItem, setCartItem] = useRecoilState<ProductStateProps[]>(cartState)

  function AddProductInCart({
    productId,
    productToAdd,
  }: AddProductInCartProps) {
    const existingProduct = cartItem.find((item) => item.id === productId)
    let updatedCartItem = []

    if (existingProduct) {
      updatedCartItem = cartItem.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      })

      return setCartItem(updatedCartItem)
    } else {
      // const productToAdd = products.find((product) => product.id === productId)

      if (productToAdd) {
        updatedCartItem = [...cartItem, { ...productToAdd, quantity: 1 }]

        return setCartItem(updatedCartItem)
      }
    }

    toast('added to cart')
  }

  return (
    <CartContext.Provider value={{ AddProductInCart }}>
      {children}
    </CartContext.Provider>
  )
}
