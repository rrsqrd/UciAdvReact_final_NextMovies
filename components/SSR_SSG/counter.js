import { useSelector, useDispatch } from 'react-redux'
import * as ActionTypes from '../../redux/ActionTypes';

/*-----------------------------
 // Alternative to connect() higher order component. 
 // useSelector and useDispatch Hooks allow connecting to 
 // the Redux store and dispatch actions without having to 
 // wrap our components in connect() HOC.
 //-----------------------------*/
const useCounter = () => {
  const count    = useSelector((state) => state.nextSSRReducer.count)
  
  const dispatch = useDispatch();
  
  const increment = () =>
    dispatch({type: ActionTypes.SSR_SSG_INCREMENT, })

  const decrement = () =>
    dispatch({ type: ActionTypes.SSR_SSG_DECREMENT, })

  const reset = () =>
    dispatch({ type: ActionTypes.SSR_SSG_RESET, })

  return { count, increment, decrement, reset }
}

//-------------------
//
//-------------------
const Counter = () => {
  const { count, increment, decrement, reset } = useCounter()
  return (
    <div>
      <h1>
        Count: <span>{count}</span>
      </h1>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default Counter
