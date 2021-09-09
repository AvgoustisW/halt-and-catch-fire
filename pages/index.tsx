import type {GetServerSideProps} from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
/*----------------------------------------------------------------*/
import { useRouter } from 'next/router';
import { logout } from '../services/authorization';
import dbConnect from '../lib/mongodb';

import Layout from '../components/layout'
import requireAuthentication from '../components/hoc/requireAuthentication';

import { Box, Heading, Container, Button, Flex } from '@chakra-ui/react';

const Home = (props: any) => {

  const router =  useRouter();
  return (
    <Layout>
      <Container> 
        <Flex alignItems="center" justifyContent="center">  
          <Flex direction="column">
            <Heading my={20}> Welcome </Heading>
            <Link href="/crud">Crud Operations &rarr;</Link>
            <Button onClick={e => logout(e, router)}>
              Logout
            </Button>   
          </Flex>
        </Flex>
      </Container>
    </Layout>
  )
}

export default Home


export const getServerSideProps: GetServerSideProps = requireAuthentication ( async (context) => {
 
  await dbConnect();
  return {
    props: {}, //https://github.com/vercel/next.js/issues/11993 
  }
});
