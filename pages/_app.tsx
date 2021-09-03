import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from 'next/router';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());



const global = {
  styles: {
    global: {
      "html, body": {
        padding: 0,
        margin: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      },
      "#nprogress .spinner-icon": {        
          borderTopColor: 'black',
          borderLeftColor: 'black'
      },
      a: {
        color: "teal.500",
        textDecoration: 'none',
      },
    },
  },
}

const theme = extendTheme(global);

function MyApp({ Component, pageProps }: AppProps) {
  return <ChakraProvider theme={theme} >
            <Component {...pageProps}  />
         </ChakraProvider>
}
export default MyApp


