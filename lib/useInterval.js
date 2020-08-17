
import { useEffect, useRef } from 'react'

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/

//--------------------------
// The useRef Hook is a function that returns a mutable ref object 
// whose .current property is initialized with the passed argument (initialValue). 
// The returned object will persist for the full lifetime of the component.
//    const refContainer = useRef(initialValue);
// https://medium.com/trabe/react-useref-hook-b6c9d39e2022
//
// This code is using useRef to keep a mutable variable 
// in a ref for the Counter which is invoked the page.js.
//--------------------------
const useInterval = (callback, delay) => {
  
    const savedCallback = useRef()
    
    useEffect(() => {
      savedCallback.current = callback
    }, [callback])

    useEffect(() => {
      const handler = (...args) => savedCallback.current(...args)

      if (delay !== null) {
        const id = setInterval(handler, delay)
        return () => clearInterval(id)
      }
    }, [delay])
}

export default useInterval
