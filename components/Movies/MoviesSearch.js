
import React, { useReducer, useEffect, useSelector, useDispatch, shallowEqual } from "react";
import { connect } from 'react-redux';
import Movie   from "./Movie";
import Search  from "./Search";

import { movieReducer, initialMoviesState } from "../../redux/movieReducer";
import { fetchMovies, fetchMoviesLoading, fetchMoviesFailed} from '../../redux/movieActionCreators';


//----------------------------
// LOCAL CSS
//----------------------------  
const movieServiceCss ={
  textAlign: 'center',
  marginLeft: '25px'
};
 const spinnerCss = {
   height: '80px',
   margin: 'auto'
 };
const moviesCss = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row'
};
const errorMessageCss = 
{
  margin: 'auto',
  fontWeight: 'bold',
  color: 'rgb(161, 15, 15)'
};


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// State of Movies did not register in middleware logger or Redux dev tolls.
// Neither of these approaches worked...
// 1) use full blown/traditional Redux mapDispatchToProps/connect etc
// 2) use hooks useSelector and useDispatch
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


//==============================================
// 1) Traditional Redux
//=============================================

//-------------------------------------
// mapStateToProps?: (state, ownProps?) => Object
//   If a mapStateToProps function is specified, the new wrapper component will
//   subscribe to Redux store updates. This means that any time the store is updated, 
//   mapStateToProps will be called. 
//   The results of mapStateToProps must be a plain object, which will be merged 
//   into the wrapped component’s props
//-------------------------------------
const mapStateToProps = state => {
  return {
    movies: state.movies
  }
};

const mapDispatchToProps = dispatch => ({
  // not sure about passing dispatch arge, can't test without tie in to redux..
  fetchMovies: (searchValue, searchType) => dispatch(fetchMovies(searchValue, searchType, dispatch)),
  fetchMoviesLoading: () => dispatch(fetchMoviesLoading()),
  fetchMoviesFailed: () => dispatch(fetchMoviesFailed())
});

//=============================================
// 2) useSelector/useDispatch HOOKS
//    Got: 'Type error Object not  function on both useSelector and useDispath!!!
//=============================================

// const useMovie = () => {
//     const movieState  = useSelector((state) => state.movieReducer);
//     const dispatch    = useDispatch();
//
//     const fetchMovies= () => dispatch({type: ActionTypes.SEARCH_MOVIES_REQUEST});
//     const fetchMoviesLoading= () => dispatch({type: ActionTypes.SEARCH_MOVIES_LOADING});
//     const fetchMoviesFailed= () => dispatch({type: ActionTypes.SEARCH_MOVIES_FAILURE});
//
//     return { movieState, fetchMovies, fetchMoviesLoading, fetchMoviesFailed};
// }
  

//==============================
// 3)  Movie search useReducer provides dispatch...
//==============================
const MoviesSearch = () => {
  
  //--------------------
  // useReducer Hook:
  // Accepts a reducer function with the application initial state, 
  // Returns the current application state, then dispatches a function.
  //
  // When to use useReducer:
  // usually preferable to useState when you have:
  //  -complex state logic that involves multiple sub-values or 
  //  -when the next state depends on the previous one.
  //--------------------
  let [state, dispatch] = useReducer(movieReducer, initialMoviesState);
  
    //-------------------------
  // This run onthe initial request/page load
  //-------------------------
  useEffect(() => {
    console.info("MovieSearch: inside useEffect");

    // default search topic is money for movies
    fetchMovies("money", 's', "movie", dispatch);
  }, []);


  //-----------------------
  //  Render & Display the results from movie search
  //-----------------------
  //const { movies3, searchMoviesRequest, searchMoviesSuccess, searchMoviesFailure } = useMovie();

  const { movies, errorMessage, loading } = state;

  const prepareSearchResults = () => {
    if(loading && !errorMessage){
      return (<img style={spinnerCss} src="superCats.png" alt="Retrieving Movies......" />);
    } 
    else if(errorMessage) {
		  return (<div><br/><div style={{errorMessageCss}}><i>{errorMessage}</i></div></div>);
    }
    else {
      let result;
      if(movies != null){
        if(Array.isArray(movies)) {
          result = movies.map((movie, index) => 
           (<Movie key={`${index}-${movie.Title}`} movie={movie} /> ));
        }
        else {
          console.info("\nResult was object, not array");
          result = (<Movie key={`${movies.Title}`} movie={movies} />);
        }
      }
      else
        result = (<div><br/><div style={{errorMessageCss}}>{"No movies available for display"}</div></div>);
		  return result;
    }
  }

  //-----------------------
  // Render movies
  //-----------------------
  const displayMovieContent = prepareSearchResults();

  return (
    <div style={movieServiceCss}>
        <Search  searchFn={fetchMovies} dispatch={dispatch} />
        <div style={moviesCss}>{displayMovieContent}</div>
    </div>
  );
};

//export default MoviesSearch;
export default connect(mapStateToProps, mapDispatchToProps)(MoviesSearch);