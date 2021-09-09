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
const Crud = ({props}: any) => {
  const headers = ['Name', 'Material', 'Type', 'Quality', '',''];
  const rows = props.map(e => { return { name: e.name, material: e.material, type: e.type, quality: e.quality, id: e._id}})
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath, undefined, {scroll: false});
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
    refreshData();
    console.log(await response.json());
  }

  const createRecord = async (name, material, type, quality) => {
    const response = await fetch('/api/swords', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        material,
        type,
        quality
      })
  })
  refreshData();
  console.log( await response.json());
  }


  const editRecord = async (id, name, material, type, quality) => {
    const response = await fetch('/api/swords', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          name,
          material,
          type,
          quality
        })
    })
    refreshData();
    console.log(await response.json());
}



  return (
    <Layout>
     
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
      
    </Layout>
  )  
}

export default Crud


export const getServerSideProps: GetServerSideProps = requireAuthentication (async (context) => {
  await dbConnect();
  const data = await swords.find();
  return {
    props: {props: fixUnserialized(data)},
  }
})