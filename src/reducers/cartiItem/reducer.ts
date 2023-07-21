import { ActionTypes } from './actions'
import { produce } from 'immer'

export interface ProductProps {
  id: string
  name: string
  imageUrl: string
  price: number
  quantity: number
}

interface CartItemStateProps {
  cartItem: ProductProps[]
}

export function cartItemReducer(state: CartItemStateProps, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_PRODUCT:
      return produce(state, (draftState) => {
        const existingProduct = draftState.cartItem.find(
          (item) => item.id === action.payload.productId,
        )
        if (!existingProduct) {
          draftState.cartItem.push(action.payload.product)
        }
      })

    case ActionTypes.DECREASE_QUANTITY_PRODUCT:
      return produce(state, (draftState) => {
        const existingProduct = draftState.cartItem.find(
          (item) => item.id === action.payload.productId,
        )
        if (existingProduct && existingProduct.quantity > 1) {
          existingProduct.quantity -= 1
        }
      })

    case ActionTypes.INCREASE_QUANTITY_PRODUCT:
      return produce(state, (draftState) => {
        const existingProduct = draftState.cartItem.find(
          (item) => item.id === action.payload.productId,
        )
        if (existingProduct) {
          existingProduct.quantity += 1
        }
      })

    case ActionTypes.REMOVE_PRODUCT:
      return produce(state, (draftState) => {
        draftState.cartItem = draftState.cartItem.filter(
          (item) => item.id !== action.payload.productId,
        )
      })

    default:
      return state
  }
}
