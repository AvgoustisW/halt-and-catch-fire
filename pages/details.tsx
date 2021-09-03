import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
/*----------------------------------------------------------------*/
const Details = ({isConnected}: any) => {
  return (
    <Layout>
      <div className="">
      
        <Head>
          <title>HCF</title>
          <meta name="description" content="HCF" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

      
        <h1 className="">
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
  return {
    props: { isConnected: 't'},
  }
}