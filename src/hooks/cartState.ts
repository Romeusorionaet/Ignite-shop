import { atom } from 'recoil'

export interface ProductStateProps {
  id: string
  name: string
  imageUrl: string
  price: string | null
  quantity: number
}

export const cartState = atom<ProductStateProps[]>({
  key: 'cartState',
  default: [],
})
