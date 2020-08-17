import Link from "next/link";
import Page from '../components/SSR_SSG/page'
import Layout from '../components/Layout';

const msgStyle = 
{  
  display: 'flex',
  justifyContent: 'center',
  alignItems:  'center',
  flexDirection: 'column'
};

export default function SSG() {
  return (
    <>
      <Layout title="SSG">
        <Page />
        <p style={msgStyle}>
          <div>
            <ul>          
              <li>The server rendered clock will have a BLACK background color.</li>
              <li>The client/browser rendered clock will have a GREY background color.</li>
            </ul>
          </div>
        </p>
        <Link href="/Movies">
          <a style={msgStyle}> Next Movie Search</a>
        </Link><br/>   
        <Link href="/About">
          <a style={msgStyle}>About </a>
        </Link>   
      </Layout>   
    </>
  )
}

//*------------------------------------
// getStaticProps only runs at build time, no redux store...
//------------------------------------*/
export function getStaticProps() {  
  // Note that in this case we're returning the state directly, 
  // without creating the redux store first (as was done in /pages/ssr.js).
  return {
    props: {
      initialReduxState: {
        lastUpdate: Date.now(),
        light: false,
      },
    },
  }
}
