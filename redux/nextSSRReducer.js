
import * as ActionTypes from '../redux/ActionTypes';

export const initialNextSSRState = {
  lastUpdate: 0,
  light: false,
  count: 0,
}


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

export const nextSSRReducer = (state = initialNextSSRState, action) => {

  console.info("nextSSRReducer: action " + JSON.stringify(action));
  console.info("nextSSRReducer: state: " + JSON.stringify(state));

  switch (action.type) {
    case ActionTypes.SSR_SSG_TICK:
      return {
        ...state,
        lastUpdate: action.lastUpdate,
        light: !!action.light,
      }
    case ActionTypes.SSR_SSG_INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      }
    case ActionTypes.SSR_SSG_DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      }
    case ActionTypes.SSR_SSG_RESET:
      return {
        ...state,
        count: initialNextSSRState.count,
      }
    default:
      console.info("nextSSRReducer: default unknown action.type:" + action.type);
      return state
  }
}

