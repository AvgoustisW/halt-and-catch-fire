import type { NextPage, GetStaticProps, GetServerSideProps} from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
/*----------------------------------------------------------------*/
import Layout from '../components/layout'


const login = async () => {
    const authResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": "Leonard",
            "email": "leo.kawhi@gmail.com",
            "password": "123"
        })
        })
    const res = await authResponse.json();
    console.log(res);

}

const logout = async () => {
    const authResponse = await fetch('/api/auth/logout', {
        method: 'POST',
    })
    const res = await authResponse.json();
    console.log(res);
}


const Login = (props: any) => {
    const [status, setStatus ] = useState(0);

    return (
        <Layout>
        <div className={styles.container}>
            <h1 className={styles.title}>
                Login Page
            </h1>
            <button type="button" onClick={login}>
                Login
            </button>
            <button type="button" onClick={logout}>
                Logout
            </button>        
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


