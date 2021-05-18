import '@/utils/wdyr'
import { CookiesProvider } from "react-cookie"
import { GlobalProvider } from "@/utils/Context"
import GlobalStyles from "@/styles/GlobalStyles"
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
// import 'react-perfect-scrollbar/dist/css/styles.css'
import RootScreen from '@/components/RootScreen'
// if (typeof global.navigator === 'undefined') global.navigator = {}

const MyApp = ({ Component, pageProps }) => {
  Router.events.on('routeChangeStart', () => NProgress.start())
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())

  return (
    <CookiesProvider>
      <GlobalProvider>
        <GlobalStyles />
        <RootScreen>
          <Component {...pageProps} />
        </RootScreen>
      </GlobalProvider>
    </CookiesProvider>

  )
}

export default MyApp
