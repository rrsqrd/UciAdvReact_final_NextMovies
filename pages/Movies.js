
import Link from "next/link";
import Layout from '../components/Layout';
import MoviesSearch from '../components/Movies/MoviesSearch';


const Movies = () => (
    <Layout title="Next Movies">
        <strong><p>Find your NEXT movie here!</p></strong>
        <MoviesSearch></MoviesSearch>
        <br/>
        <Link href="/About">            
            <a>About</a>
        </Link><br/>
        <Link href="/SSR_SSG">
            <a>SSR-SSG</a>
        </Link>           
    </Layout>
);
export default Movies;