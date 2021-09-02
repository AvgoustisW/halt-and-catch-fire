import type { NextPage, GetStaticProps, GetServerSideProps} from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
/*----------------------------------------------------------------*/

import {fixUnserialized} from '../tools/general';
import dbConnect from '../lib/mongodb';
import swords from '../models/swords';

import Layout from '../components/layout'
import { apiResolver } from 'next/dist/server/api-utils'

import requireAuthentication from '../components/hoc/requireAuthentication';

const Home = (props: any) => {


  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>
        Home Page
        </h1>
       
        {console.log(props)}
        {props.status ? (
          <h2>You are connected to MongoDB</h2>
        ) : (
          <h2>
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )}

        <div className={styles.grid}>
          <Link href="/about">
            <a className={styles.card}>
              <h2>About &rarr;</h2>
              <p>Aye Aye </p>
            </a>     
          </Link>
          <Link href="/about">
            <a className={styles.card}>
              <h2>About &rarr;</h2>
              <p>Aye Aye </p>
            </a>     
          </Link>
          <Link href="/about">
            <a className={styles.card}>
              <h2>About &rarr;</h2>
              <p>Aye Aye</p>
            </a>     
          </Link>
          <Link href="/about">
            <a className={styles.card}>
              <h2>About &rarr;</h2>
              <p>Aye Aye </p>
            </a>     
          </Link>
        </div>
          
      </div>
    </Layout>
  )
}

export default Home


export const getServerSideProps: GetServerSideProps = requireAuthentication ( async (context) => {
  //const data = await getAllMovieSampleData(); 
  await dbConnect();
  const data = await swords.findOne();

  const authResponse = await fetch('http://localhost:3000/api/auth/login', {
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

  const auth = await authResponse.json();

  return {
    props: {status: 't', data: fixUnserialized(data)}, //https://github.com/vercel/next.js/issues/11993 
  }
});
