
import Page from '../components/SSR_SSG/page'
import Link from "next/link";
import Layout from '../components/Layout';

//----------------------- 
//-----------------------
function SSR_SSG() {

  const msgStyle = 
  {  
    display: 'flex',
    justifyContent: 'center',
    alignItems:  'center',
    flexDirection: 'column'
  };

  return (
      <>
        <Layout title="SSR-SSG">
          <br/>
          <Page />

          <br/><br/>
          <div style={msgStyle}>
            <span>
              By default, Next.js pre-renders every page. 
            </span>          
            <span>
              It generates HTML for each page in advance, instead of having it all done by client-side JavaScript.
            </span>
            <span>
              Next.js has two forms of pre-rendering: <strong>SSG: Static Generation and SSR: 
              Server-side Rendering. </strong>
            </span>
            <span>
              The difference is in when the HTML for a page is generated.
            </span>
            <ul>                
                <li>Server-side Rendering generates the HTML on each request.</li>
                <li>The server rendered clock will have a BLACK background color.</li>
                <li>Static Generation generates the HTML at build time and is reused on each request.</li>
                <li>The client/browser rendered clock will have a GREY background color.</li>
                <li>The counter HTML is rendered on the server, incrment/decrement is client only.</li>
            </ul>
          </div>
          <br/>
          <Link href="/Movies">
            <a> Next Movie Search</a>
          </Link><br/>
          <Link href="/About">
              <a> About</a>
          </Link><br/>        
        </Layout>
      </>
  );
}

export default SSR_SSG;
