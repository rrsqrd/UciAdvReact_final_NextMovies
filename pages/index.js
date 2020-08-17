
import Router from 'next/router'
import { useEffect } from "react";

function Index () {
  useEffect(() => {
    const {pathname} = Router

    // Redirecting index.js to Movies
    if(pathname == '/' ){
        Router.push('/Movies')
    }
  });   

  return null;
}

export default Index;
