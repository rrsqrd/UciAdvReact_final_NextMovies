import Link from "next/link";
import Page from '../components/SSR_SSG/page'
import { initializeStore } from '../redux/configureStore'
import * as ActionTypes from '../redux/ActionTypes';
import Layout from '../components/Layout';

const msgStyle = 
{  
  display: 'flex',
  justifyContent: 'center',
  alignItems:  'center',
  flexDirection: 'column'
};

export default function SSR() {
  return (
      <>
      <Layout title="SSR">
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


//------------------------------------//
// Use getServerSideProps only if you need to pre-render a
// page whose data must be fetched at request time.
// It only runs on server-side and never runs on the browser....so you'll never see console output...
//------------------------------------//
export async function getServerSideProps() {  

  const reduxStore = initializeStore()
  const { dispatch } = reduxStore;

  dispatch({
    type: ActionTypes.SSR_SSG_TICK,
    light: false,
    lastUpdate: Date.now(),
  })

  return { props: { initialReduxState: reduxStore.getState() } }
}
