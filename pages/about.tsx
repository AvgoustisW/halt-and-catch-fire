import type { NextPage, GetStaticProps, GetServerSideProps } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import requireAuthentication from '../components/hoc/requireAuthentication'
/*----------------------------------------------------------------*/
const About = ({props}: any) => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>
          About Page
      </h1>
    </div>
    </Layout>
  )
}

export default About


export const getServerSideProps: GetServerSideProps = requireAuthentication (async (context) => {
  return {
    props: {},
  }
})