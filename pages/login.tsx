import type { GetServerSideProps } from 'next'
import { useState } from 'react';
import { Box, Spinner, Flex, Heading, Input, Button, useColorModeValue , InputGroup, InputRightElement, Icon, FormControl, FormLabel, FormHelperText } from '@chakra-ui/react';
/*----------------------------------------------------------------*/
import Layout from '../components/layout'
import { useRouter } from 'next/router'
import { BiHide, BiShow } from "react-icons/bi";

const Login = (props: any) => {
    
    const login = async (e) => {
        setLoading(true);
        setLoginStatus(0);
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
        const res = await authResponse.status;
        if(res === 200){
            setLoginStatus(0);
            router.push('/')            
            setLoading(false);
        } else {
            setLoginStatus(1);
            setLoading(false);
            setPassword('');
        }
    }

    const [loginStatus, setLoginStatus ] = useState(0);
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const handleUsername = setValue => e => setValue(e.target.value)
    const handlePassword = setValue => e => setValue(e.target.value)
    const handleShowPassword= () => setShowPassword(!showPassword)

    const formBackground = useColorModeValue("yellow.100", "gray.700");
    return (
        <Layout>
            <Flex height='100vh'  justifyContent='center'>
                <Flex direction='column' alignItems="center" p={12} rounded={5}>
                    <Heading mb={6}>Sign in</Heading>
                    <form onSubmit={login} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
                        <Button type="submit" variant="outline" mb={6} onClick={login}>Log In</Button>
                        {loading && <Spinner/>}
                        <Box h={8}>{loginStatus ? 'Unauthorized': ''}</Box>
                    </form>
                </Flex>
            </Flex>
        </Layout>
    )
}

export default Login


export const getServerSideProps: GetServerSideProps = async (context) => {
  
  return {
    props: {}, //https://github.com/vercel/next.js/issues/11993 
  }
}


