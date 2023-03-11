import Footer from '@/components/Footer'
import Navbar from '@/components/navbar'
import '@/styles/globals.css'
import '@/styles/style.css'
import { ethers } from "ethers";


export default function App({ Component, pageProps }) {

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
