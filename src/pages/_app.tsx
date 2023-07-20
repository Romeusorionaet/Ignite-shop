import { AppProps } from 'next/app'
import '../styles/globals.css'
import '../styles/product.css'
import '../styles/scrollbar.css'
import { Toaster } from 'react-hot-toast'
import { Header } from './components/Header'
import { CartContextProvider } from '@/contexts/CartProductContext'
import Cart from './components/Cart'
import { ButtonCartSideProvider } from '@/contexts/ButtonCartSideContext'

type MyAppProps = AppProps

export default function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <CartContextProvider>
      <ButtonCartSideProvider>
        <div className="pl-[18rem]">
          <Toaster position="bottom-center" />
          <Header />
          <Cart />
          <Component {...pageProps} />
        </div>
      </ButtonCartSideProvider>
    </CartContextProvider>
  )
}
