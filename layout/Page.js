import Head from 'next/head'
import Title from './Title'

const Page = props => (
  <div>
    <Head>
      <Title title={props.title} />
    </Head>
    {props.children}
  </div>
)

export default Page
