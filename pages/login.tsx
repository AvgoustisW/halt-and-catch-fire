import type { NextPage, GetStaticProps, GetServerSideProps} from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
/*----------------------------------------------------------------*/
import Layout from '../components/layout'
import { useRouter } from 'next/router'

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
    const router = useRouter();

    const handleUsername = setValue => e => setValue(e.target.value)
    const handlePassword = setValue => e => setValue(e.target.value)

    return (
        <Layout>
        <div className={styles.container}>
            <h1 className={styles.title}>
                Login Page
            </h1>
            <form onSubmit={login}>
                <input
                    type='text'
                    name='username'
                    value={username}
                    onChange={handleUsername(setUsername)}
                    placeholder='username'
                    aria-label='username'
                    required
                />
                <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={handlePassword(setPassword)}
                    placeholder='password'
                    aria-label='password'
                    required
                />
                
            <button type="submit" >
                Login
            </button>
            </form>

            <p>{loginStatus}</p>  
        </div>
        </Layout>
    )
}

export default Login


export const getServerSideProps: GetServerSideProps = async (context) => {
  
  return {
    props: {}, //https://github.com/vercel/next.js/issues/11993 
  }
}


