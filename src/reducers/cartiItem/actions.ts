import { AddProductInCartProps } from '@/contexts/CartProductContext'

export enum ActionTypes {
  ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT',
  DECREASE_QUANTITY_PRODUCT = 'DECREASE_QUANTITY_PRODUCT',
  INCREASE_QUANTITY_PRODUCT = 'INCREASE_QUANTITY_PRODUCT',
  REMOVE_PRODUCT = 'REMOVE_PRODUCT',
}

export function addNewProductAction({
  productId,
  product,
}: AddProductInCartProps) {
  return {
    type: ActionTypes.ADD_NEW_PRODUCT,
    payload: {
      productId,
      product,
    },
  }
}

export function decreaseQuantityOfProductAction(productId: string) {
  return {
    type: ActionTypes.DECREASE_QUANTITY_PRODUCT,
    payload: {
      productId,
    },
  }
}

export function increaseQuantityOfProductAction(productId: string) {
  return {
    type: ActionTypes.INCREASE_QUANTITY_PRODUCT,
    payload: {
      productId,
    },
  }
}

export function removeProductAction(productId: string) {
  return {
    type: ActionTypes.REMOVE_PRODUCT,
    payload: {
      productId,
    },
  }
}
