import type { NextPage, GetStaticProps, GetServerSideProps } from 'next'
import Link from 'next/link';
import Layout from '../components/layout'
import requireAuthentication from '../components/hoc/requireAuthentication'

import { EditableTable } from '../components/tables';
import { Flex } from '@chakra-ui/react';

import dbConnect from '../lib/mongodb';
import swords from '../models/swords';

import {fixUnserialized} from '../tools/general';
import { useRouter } from 'next/router';
/*----------------------------------------------------------------*/
const About = ({props}: any) => {
  const headers = ['Name', 'Material', 'Type', 'Quality', '',''];
  const rows = props.map(e => { return { name: e.name, material: e.material, type: e.type, quality: e.quality, id: e._id}})
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  }

  const deleteRecord = async (id) => {
    // setLoading(true);
    // setLoginStatus(0);

    const response = await fetch('/api/swords', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
    })

    console.log(await response.json());
  }

  const createRecord = async () => {
    const response = await fetch('/api/swords', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Sworder',
        material: 'iron',
        type: 'longsword',
        quality : 'common'
      })
  })
  refreshData();
  console.log( await response.json());
  }


  const editRecord = async (id) => {
    // setLoading(true);
    // setLoginStatus(0);

    const response = await fetch('/api/swords', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
    })
    refreshData();

    console.log(await response.json());
    // const res = await authResponse.status;
    // if(res === 200){
    //     setLoginStatus(0);
    //     router.push('/')            
    //     setLoading(false);
    // } else {
    //     setLoginStatus(1);
    //     setLoading(false);
    //     setPassword('');
    // }
}



  return (
    <Layout>
      <Flex height='50vh'  justifyContent='center'>
        <Flex direction='column' alignItems="center" p={12} rounded={5}>
        <EditableTable 
          headers={headers} 
          rows={rows}
          editFunc={editRecord}
          deleteFunc={deleteRecord}
          createFunc={createRecord}
        />
          <Link href="/">
                <a>
                  <h2>Home &rarr;</h2>
                </a>     
          </Link>  
        </Flex>
      </Flex>
    </Layout>
  )  
}

export default About


export const getServerSideProps: GetServerSideProps = requireAuthentication (async (context) => {
  await dbConnect();
  const data = await swords.find();
  return {
    props: {props: fixUnserialized(data)},
  }
})