
import Link from "next/link";
import Layout from '../components/Layout';

// <span style={{ margin: '30px', width: '30px'}}>    </span>
const msgStyle = 
{  
  display: 'flex',
  justifyContent: 'center',
  alignItems:  'center',
  flexDirection: 'column'
};

const About = () => (
    <Layout  title="About">
        <div style={msgStyle}>
            <strong>Advanced React UCI Spring 2020 Final Project</strong>
        </div><br/>
        <div style={msgStyle}>
            Create a complex web application that incorporates the technologies listed below:
            <ul>
                <li>	React.JS </li>
                <li>	Redux</li>
                <li>	Next.JS (SSR-SSG)</li>
                <li>	Apollo or Axios</li>
                <li>	Hooks</li>
            </ul> 
            Movie data is sourced from:
            <a href="http://omdbapi.com/">
                    OMDb API
            </a><br/>
        </div>        
        <br/>
        <img src="miau.png" alt="hello pussy cat" height="100px"/>
        <br/>
        <Link href="/Movies">
            <a> Next Movie Search</a>
        </Link><br/>
        <Link href="/SSR_SSG">
            <a> SSR-SSG</a>
        </Link>
    </Layout>
);
export default About;