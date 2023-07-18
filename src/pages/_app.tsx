import { AppProps } from 'next/app'
import '../styles/globals.css'
import '../styles/product.css'
import { Header } from './components/Header'

type MyAppProps = AppProps

export default function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <div className="pl-[18rem]">
      <Header />
      <Component {...pageProps} />
    </div>
  )
}
