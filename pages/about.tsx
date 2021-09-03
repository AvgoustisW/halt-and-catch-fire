import type { NextPage, GetStaticProps, GetServerSideProps } from 'next'
import Layout from '../components/layout'
import requireAuthentication from '../components/hoc/requireAuthentication'
/*----------------------------------------------------------------*/
const About = ({props}: any) => {
  return (
    <Layout>
      <div className="">
        <h1 className="">
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