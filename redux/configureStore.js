import { useMemo } from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { nextSSRReducer } from './nextSSRReducer';
import { movieReducer } from './movieReducer';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

const initialStoreState = {};
let store;


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// The baseline contents of this file originated from template example with Redux
// that I used to create this project
//    https://create-next-app.js.org/get-started-with-examples
//
// I kept the code and am show casing it on the SSR-SSG page...
//
// Of course, modifed to account for the addition of movies state but I
// may have missed something since I couldn't get Movie state to regiser with Redux
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%




//-------------------------
//  initStore creates the redux store with an initial state,
//  Combines reducers and applies middleware/enhancers:
//    createStore(reducers, preloaded state, enhancers)
//-------------------------
function initStore(preloadedState = initialStoreState) {    
    const store= createStore(      

      // state produced by combineReducers() namespaces the states
      // of each reducer under their keys as passed to combineReducers()      
      combineReducers({
        nextSSRReducer: nextSSRReducer,
        movieReducer: movieReducer}),
      preloadedState,

      // -Thunk lets you call action creators that 
      //  return a function instead of an action object.
      // -logger logs actions and state for debugging
      composeWithDevTools(applyMiddleware(thunk, logger))
    );
    
    return store;
  }
  
  //-------------------------
  //
  // The ?? operator is called the null-coalescing operator. 
  // It returns the left-hand operand if the operand is not null; 
  //  otherwise it returns the right hand operand.
  //
  // If we have a store we'll return it, otherwise we initialize the store
  //-------------------------

  // This is called from getServerSideProps
  export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState)
  
    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {

      console.info("initializeStore store.getState(): " + JSON.stringify(store.getState()));

      _store = initStore({...store.getState(), ...preloadedState,  });

      // Reset the current store
      store = undefined
    }
  
    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') 
      return _store

    // Create the store once in the client
    if (!store) 
      store = _store
  
    return _store
  }
  
  //============================
  // called from app.js to pass the redux store to the <Provder/>
  //============================
  export function useStore(initialState) {
    //--------------------------
    // ‘useMemo’ 
    //   takes a function(initializeStore) and an array of dependencies.
    //   returns a memoized value that is the result of the function.
    //-----------------------------
    console.info("configureStore: calling initializeStore via useMemo");

    const store = useMemo(() => initializeStore(initialState), [initialState])

    return store;
  }
  