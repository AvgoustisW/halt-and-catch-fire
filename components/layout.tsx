import Header from './header'
import Footer from './footer'
import { useColorMode, IconButton} from '@chakra-ui/react';

import { BiMoon, BiSun } from 'react-icons/bi';

export default function Layout ({children}) {  
  
  const { toggleColorMode } = useColorMode();
  console.log(localStorage.getItem('chakra-ui-color-mode'));
  return (
    <>
      <Header/>
      
      <div>
        <IconButton 
          m={4}
          aria-label="Toggle Color Mode"
          icon={localStorage.getItem('chakra-ui-color-mode') === 'light' ? <BiMoon/> : <BiSun/>}  
          variant="outline"
          fontSize="22px"
          onClick={toggleColorMode}
        />  

        </div>
      <main className="">
        {children}
      </main>
      <Footer/>
    </>
  )
}