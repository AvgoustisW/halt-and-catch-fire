import type { GetServerSideProps } from 'next'
import { useState } from 'react';
import { Box, Tabs, Tab, TabList, TabPanels, TabPanel, Spinner, Flex, Heading, Input, Button, useColorModeValue , InputGroup, InputRightElement, Icon, FormControl, FormLabel, FormHelperText } from '@chakra-ui/react';
/*----------------------------------------------------------------*/

import { useRouter } from 'next/router'
import { BiHide, BiShow } from "react-icons/bi";
import { useToast } from "@chakra-ui/react"
import { toastError, toastSuccess } from '../tools/toasts';
import Header from '../components/header';

const Login = (props: any) => {
    const toast = useToast();

    const login = async (e) => {
        setLoading(true);
        e.preventDefault();

        const authResponse = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": username,   
                "password": password
            })
        })
        const res = await authResponse;
        console.log('---', await res.json());
        if(res.status === 200){
            router.push('/')            
            setLoading(false);
        } else {
            toast({...toastError, title: "Unauthorized", description: "Please enter correct credentials"})  
            //setLoginStatus(1);
            setLoading(false);
            setPassword('');
        }
    }

    const signupPleo = async (e) => {
        setLoading(true);
       // setLoginStatus(0);
       e.preventDefault();

       const authResponse = await fetch('/api/auth/signup-pleo', {
           method: 'POST',
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               "name": username,   
               "password": password,
               "favorites" : localStorage.getItem('favorites')
           })
       })
       

       const res = await authResponse;
       if(res.status === 200){
           toast({...toastSuccess, title: "Pleo User created", description: "You can now sign in with your credentials"});
           resetFields();
           setLoading(false);
       } else {
           let description = '';
           if(res.status === 409) description = 'User already exists'
           else description = 'Our service is currently not working';
           toast({...toastError, title:'Error', description})
           setLoading(false);
           // setPassword('');
       }
   }

    const signup = async (e) => {
         setLoading(true);
        // setLoginStatus(0);
        e.preventDefault();

        const authResponse = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": username,   
                "password": password
            })
        })
        

        const res = await authResponse;
        if(res.status === 200){
            toast({...toastSuccess, title: "User created", description: "You can now sign in with your credentials"});
            resetFields();
            setLoading(false);
        } else {
            let description = '';
            if(res.status === 409) description = 'User already exists'
            else description = 'Our service is currently not working';
            toast({...toastError, title:'Error', description})
            setLoading(false);
            // setPassword('');
        }
    }
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const handleUsername = setValue => e => setValue(e.target.value)
    const handlePassword = setValue => e => setValue(e.target.value)
    const handleShowPassword= () => setShowPassword(!showPassword)
    const resetFields = () => {
        setUsername('');
        setPassword('');
    }

    const credentials = (funcToRun, displayText) => {
        return (
            <form onSubmit={funcToRun} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Input 
                    placeholder="username" 
                    variant="flushed" 
                    mb={3} 
                    type="text" 
                    value={username}
                    onChange={handlePassword(setUsername)}
                    isRequired={true}
                />
                <InputGroup>
                    <Input 
                        placeholder="password" 
                        variant="flushed" 
                        mb={6} 
                        type={showPassword ? "text" : "password"} 
                        value={password}
                        onChange={handleUsername(setPassword)}
                        isRequired={true}
                    />
                    <InputRightElement width="1rem" onClick={handleShowPassword} style={{cursor: 'pointer'}}>
                        <Icon as={showPassword ? BiShow : BiHide} w={5} h={5}/>
                    </InputRightElement>
                </InputGroup>
                <Button type="submit" variant="outline" mb={6} onClick={funcToRun}>{displayText}</Button>
                {loading && <Spinner/>}
            </form>
        )
    }

    
    return (
        <>
        <Header/>
        <Box>
            <Flex height='100vh'  justifyContent='center'>
                <Flex direction='column' alignItems="center" p={12} rounded={5} >

                <Tabs mt={100} size="lg" variant="line" align="center" isFitted defaultIndex={1}>
                <TabList>
                    <Tab onClick={resetFields}>Sign Up</Tab>
                    <Tab onClick={resetFields}>Sign In</Tab>
                    <Tab onClick={resetFields}>Pleo</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {credentials(signup, 'Register')}
                    </TabPanel>                    
                    <TabPanel>
                        {credentials(login, 'Log in')}
                    </TabPanel>
                    <TabPanel>
                        {credentials(signupPleo, 'Pleo Create')}
                    </TabPanel>
                </TabPanels>
                </Tabs>

                    
                </Flex>
            </Flex>
        </Box>
        </>
    )
}

export default Login


export const getServerSideProps: GetServerSideProps = async (context) => {
  
  return {
    props: {}, //https://github.com/vercel/next.js/issues/11993 
  }
}


