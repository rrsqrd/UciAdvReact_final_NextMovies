
import { Provider } from 'react-redux';
import { useStore } from '../redux/configureStore';

export default function App({ Component, pageProps }) {
  
  // This initializes the store, see configureStore.js 
  const store = useStore(pageProps.initialReduxState)    
  
   console.info("\n_app.js: store.getState: " + JSON.stringify(store.getState()));  
  
   return (    
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
  
    //return <Component {...pageProps} />  
}
