
import Link from "next/link";
import Head from "next/head";
                
const Layout = ({children, title}) => {
    return(
    <div className="root">
        <Head> 
            <title>Next Movies</title>
        </Head>
        <header>
            <Link href="/">
                <a>Movie Search</a>
            </Link>
            <Link href="/About">
                <a>About</a>
            </Link>
            <Link href="/SSR_SSG">
                <a>SSR-SSG</a>
            </Link>            
        </header>

        <h1>{title}</h1>
        {children}
        
        <footer>&copy; {new Date().getFullYear()}</footer>

        <style jsx>{`
            .root{
                display: flex;
                justify-content center;
                align-items center;
                flex-direction: column;
            }
            header {
                width: 100%;
                display: flex;
                justify-content space-around;
                padding: 1em;
                font-size: 1.2rem;
                background: #6b00b3;
            }
            header a {
                color: #e0b3ff;
                text-decoration: none;   
                display:block;                
            }
            header a:hover {
                font-weight: bold;
                color: lightgrey;
            }
            footer {
                padding 1em;                
            }
        `}
        </style>
        <style jsx global>{`
            body {
                margin: 10;                
                font-size: 110%;
                background: #f0f0f0;
            }
        `}</style>
    </div>
    );
}
export default Layout;