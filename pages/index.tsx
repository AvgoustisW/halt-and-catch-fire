import type { NextPage, GetStaticProps, GetServerSideProps} from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
/*----------------------------------------------------------------*/
import connectDB from '../middleware/mongodb';

import Layout from '../components/layout'

import { getAllSampleData } from './api/sample_data'

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


export const getServerSideProps: GetServerSideProps = async (context) => {

  const data = await getAllSampleData();
 
  return {
    props: {status: 't', data},
  }
}
