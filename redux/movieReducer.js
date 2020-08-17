
import * as ActionTypes from './ActionTypes';

export const initialMoviesState = {
  loading: false, // was true when submitted
  movies: [],
  errorMessage: null
};

//--------------------------
// Reducer: a function specifies how the app state changes in response to 
//  actions sent to the store. i.e (previousSate, action) => newState
//  A reducer is a function which takes two arguments 
//      current 'state'
//      and an 'action' 
//  and returns new state based on both arguments
//
// The ...state spread operator creates a NEW object respresenting 
// state, we never mutate incoming state!
//--------------------------
export const movieReducer = (state =  {loading: false,  movies: [], errorMessage: null}, action) => {
  
  console.info("movieReducer: action " + JSON.stringify(action));
  console.info("movieReducer: state: " + JSON.stringify(state));


  switch (action.type) {
    case ActionTypes.SEARCH_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case ActionTypes.SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case ActionTypes.SEARCH_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      console.info("movieReducer: default unknown action.type:" + action.type);
      return state;
  }
};

export default movieReducer;