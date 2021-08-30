import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
/*----------------------------------------------------------------*/
import { connectToSampleDatabase } from '../lib/mongodb'
const Details = ({isConnected}: any) => {
  return (
    <Layout>
      <div className={styles.container}>
      
        <Head>
          <title>HCF</title>
          <meta name="description" content="HCF" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

      
        <h1 className={styles.title}>
          Details Page
        </h1>


        {isConnected ? (
          <h2>You are connected to MongoDB</h2>
        ) : (
          <h2>
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )}
          
        
      
      </div>
    </Layout>
  )
}

export default Details


export const getStaticProps: GetStaticProps = async (context) => {
  const { client } = await connectToSampleDatabase()
  const isConnected = client.topology.s.state;
  return {
    props: { isConnected },
  }
}