import { AppProps } from 'next/app'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { GlobalStyles } from 'twin.macro'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <div>
      <GlobalStyles />
      <Head>
        <title>Crossfit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </div>
}

export default MyApp
