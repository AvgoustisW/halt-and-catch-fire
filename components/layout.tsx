import Header from './header'
import Footer from './footer'
import { useColorMode, IconButton, Icon,Flex, Spacer, Box, Divider, Tooltip, HStack} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { BiMoon, BiSun, BiLogOut} from 'react-icons/bi';
import { GoMarkGithub } from "react-icons/go";
import { logout } from '../services/authorization';
import { useRouter } from 'next/router';

export default function Layout ({children}) {  

  const router = useRouter();
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
      <Flex p={2} justifyContent="center">
        <HStack spacing="16px">
          <Tooltip  bg="teal.500" label="Color" fontSize="md">
            <IconButton 
                aria-label="Toggle Color Mode"
                icon={colorMode === 'light' ? <BiMoon/> : <BiSun/>}  
                variant="outline"
                fontSize="22px"
                onClick={wrapperFunc}
            />  
          </Tooltip>
          <Tooltip bg="teal.500" label="Github" fontSize="md">
            <IconButton 
              aria-label="Github"
              icon={<GoMarkGithub/>}  
              variant="outline"
              fontSize="22px"
              onClick={() => window.open('https://github.com/AvgoustisW/halt-and-catch-fire', '_blank')}
            />  
          </Tooltip>
          <Tooltip bg="teal.500" label="Logout" fontSize="md">
            <IconButton 
              aria-label="Logout"
              icon={<BiLogOut/>}  
              variant="outline"
              fontSize="22px"
              onClick={e => logout(e, router)}
            />  
          </Tooltip>
        </HStack>
      </Flex>
      <Divider/>
      <main className="">
        {children}
      </main>
      <Footer/>
    </>
  )
}