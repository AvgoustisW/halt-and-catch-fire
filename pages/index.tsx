import type {GetServerSideProps} from 'next'
/*----------------------------------------------------------------*/
import { useRouter } from 'next/router';
import dbConnect from '../lib/mongodb';

import Layout from '../components/layout'
import requireAuthentication from '../components/hoc/requireAuthentication';

import { Text, Heading, Container, Link, Flex } from '@chakra-ui/react';

const Home = (props: any) => {

  const router =  useRouter();
  return (
    <Layout>
      <Container> 
        <Flex alignItems="center" justifyContent="center">  
          <Flex direction="column">
            <Heading mt={20} mb={10}> Welcome </Heading>
            <Text fontSize="3xl">You are currently residing in the Home page. To play around please visit the <a style={{cursor: 'pointer'}} onClick={() => router.push('/operations')}>operations</a> page</Text>
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
