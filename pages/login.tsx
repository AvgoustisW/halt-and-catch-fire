import type { GetServerSideProps } from 'next'
import { useState } from 'react';
import { Flex, FormControl, Heading, Input, Button, useColorModeValue , InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
/*----------------------------------------------------------------*/
import Layout from '../components/layout'
import { useRouter } from 'next/router'
import { BiHide, BiShow } from "react-icons/bi";

const Login = (props: any) => {
    
    const login = async (e) => {
        setLoginStatus('');
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
            setLoginStatus('');
            router.push('/')
        } else {
            setLoginStatus('Unauthorized');
            setPassword('');
        }
    }

    const [loginStatus, setLoginStatus ] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const handleUsername = setValue => e => setValue(e.target.value)
    const handlePassword = setValue => e => setValue(e.target.value)
    const handleShowPassword= () => setShowPassword(!showPassword)

    const formBackground = useColorModeValue("gray.100", "gray.700");
    return (
        <Layout>
            <Flex height='100vh' alignItems='center' justifyContent='center'>
                <Flex direction='column' background={formBackground} p={12} rounded={5}>
            
                    <Heading mb={6}>Sign in</Heading>
                    <form onSubmit={login}>
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
                                placeholder="*****" 
                                variant="flushed" 
                                mb={6} 
                                type={showPassword ? "text" : "password"} 
                                value={password}
                                onChange={handleUsername(setPassword)}
                                isRequired={true}
                            />
                            <InputRightElement width="4.5rem" onClick={handleShowPassword} style={{cursor: 'pointer'}}>
                                <IconButton 
                                    aria-label={showPassword ? 'Show Password' : 'Hide Password'}
                                    icon={showPassword ? <BiShow/> : <BiHide/>}  
                                    variant="ghost"
                                    fontSize="22px"
                                />
                            </InputRightElement>
                        </InputGroup>
                        <Button type="submit" mb={6} colorScheme="red" onClick={login}>Log In</Button>
                    </form>
                </Flex>
            </Flex>
        </Layout>

        // <Layout>
        // <div className="">
        //     <h1 className="">
        //         Login Page
        //     </h1>
        //     <form onSubmit={login}>
        //         <input
        //             type='text'
        //             name='username'
        //             value={username}
        //             onChange={handleUsername(setUsername)}
        //             placeholder='username'
        //             aria-label='username'
        //             required
        //         />
        //         <input
        //             type='password'
        //             name='password'
        //             value={password}
        //             onChange={handlePassword(setPassword)}
        //             placeholder='password'
        //             aria-label='password'
        //             required
        //         />
                
        //     <button type="submit" >
        //         Login
        //     </button>
        //     </form>

        //     <p>{loginStatus}</p>  
        // </div>
        // </Layout>
    )
}

export default Login


export const getServerSideProps: GetServerSideProps = async (context) => {
  
  return {
    props: {}, //https://github.com/vercel/next.js/issues/11993 
  }
}


