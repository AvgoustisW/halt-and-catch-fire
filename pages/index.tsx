import type { NextPage, GetStaticProps, GetServerSideProps} from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
/*----------------------------------------------------------------*/
import { useRouter } from 'next/router';
import { logout } from '../services/authorization';
import {fixUnserialized} from '../tools/general';
import dbConnect from '../lib/mongodb';
import swords from '../models/swords';

import Layout from '../components/layout'
import { apiResolver } from 'next/dist/server/api-utils'

import requireAuthentication from '../components/hoc/requireAuthentication';


const Home = (props: any) => {

  const router =  useRouter();
  return (
    <Layout>
       <button type="button" onClick={e => logout(e, router)}>
                Logout
            </button>   
      <div >
        <h1 >
        Home Page
        </h1>
       
        {props.status ? (
          <h2>You are connected to MongoDB</h2>
        ) : (
          <h2>
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )}

        <div >
          <Link href="/about">
            <a>
              <h2>About &rarr;</h2>
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

  return {
    props: {status: 't', data: fixUnserialized(data)}, //https://github.com/vercel/next.js/issues/11993 
  }
});
