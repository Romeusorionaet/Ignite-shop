import {
  addNewProductAction,
  decreaseQuantityOfProductAction,
  increaseQuantityOfProductAction,
  removeProductAction,
} from '@/reducers/cartiItem/actions'
import { ProductProps, cartItemReducer } from '@/reducers/cartiItem/reducer'
import { ReactNode, createContext, useReducer } from 'react'

export interface AddProductInCartProps {
  productId: string
  product: ProductProps
}

interface CartContextType {
  addProductInCart: ({ productId, product }: AddProductInCartProps) => void
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
  const [cartItemState, dispatch] = useReducer(cartItemReducer, {
    cartItem: [],
  })

  const { cartItem } = cartItemState

  function addProductInCart({ productId, product }: AddProductInCartProps) {
    return dispatch(addNewProductAction({ product, productId }))
  }

  function handleDecreaseQuantityOfProduct(productId: string) {
    return dispatch(decreaseQuantityOfProductAction(productId))
  }

  function handleIncreaseQuantityOfProduct(productId: string) {
    return dispatch(increaseQuantityOfProductAction(productId))
  }

  function handleRemoveProductInCart(productId: string) {
    return dispatch(removeProductAction(productId))
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
