import { useDispatch } from 'react-redux'
import useInterval from '../../lib/useInterval'
import Clock from   '../SSR_SSG/clock'
import Counter from '../SSR_SSG/counter'
import Nav from     '../SSR_SSG/nav'
import * as ActionTypes from '../../redux/ActionTypes';

//-----------------
//Serves as SSR_SSG ActionCreator
//-----------------
export default function Page() {
  const dispatch = useDispatch()

  // Tick the time every second
  useInterval(() => {
    dispatch({
      type: ActionTypes.SSR_SSG_TICK,
      light: true,
      lastUpdate: Date.now(),
    })
  }, 1000)

  return (
    <>
      <Nav />
      <Clock />
      <Counter />
    </>
  )
}