import Header from './header'
import Footer from './footer'
import { useColorMode, IconButton,} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { BiMoon, BiSun } from 'react-icons/bi';

export default function Layout ({children}) {  

  const [ colorMode, setColorMode ] = useState('');

  useEffect( () => {
    setColorMode(localStorage.getItem('chakra-ui-color-mode')as string) ;
  }, [])

  const { toggleColorMode } = useColorMode();

  const wrapperFunc = () => {
    toggleColorMode();
    changeIcon();
  }

  const changeIcon = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  }

  return (
    <>
      <Header/>      
      <div>
        <IconButton 
          m={4}
          aria-label="Toggle Color Mode"
          icon={colorMode === 'light' ? <BiMoon/> : <BiSun/>}  
          variant="outline"
          fontSize="22px"
          onClick={wrapperFunc}
        />  
      </div>
      <main className="">
        {children}
      </main>
      <Footer/>
    </>
  )
}