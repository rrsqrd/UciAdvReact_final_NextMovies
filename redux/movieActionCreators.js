
import axios from "axios";
import * as ActionTypes from './ActionTypes';

//--------------------------------------
// API:
// Valid IMDb ID:   i=tt3896198 <== need to know valid ID 
// Movie Title:     tt3896198
// http://www.omdbapi.com/?i=tt3896198&plot=full
//
// //await axios(`https://www.omdbapi.com/?s=${searchingFor}&apikey=4a3b711b`)
//---------------------------------------

export const API_KEY = "&apikey=3d38c238"
export const DEFAULT_SEARCH_VALUE="mystery";
export const BASE_OMDB_SEARCH_API_URL = "https://www.omdbapi.com/";

//FIRST QUERY PARAM
export const QUALIFIER_PARAM_S_SEARCH     = "?s=";
export const QUALIFIER_PARAM_I_IMDB_ID    = "?i=";
let searchQualifierParam = QUALIFIER_PARAM_S_SEARCH;

export const TYPE_PARAM        = "&type=";
export const TYPE_PARAM_SERIES = "series";
export const TYPE_PARAM_MOVIE  = "movie";
let searchTypeParam = "movie"


//-------------------------
//  
//-------------------------
export const fetchMovies = (searchValue, searchQualifier, searchType, dispatch) => {
   
    console.log("movieActionCreator: fetchMovies: searchValue= " + 
         searchValue + ", searchQualifier=" + searchQualifier);  

    console.info("movieActionCreator:  fetchMovies: dispatching ActionType SEARCH_MOVIES_REQUEST");
    dispatch({ type: ActionTypes.SEARCH_MOVIES_REQUEST });

    if(searchQualifier ==='i')
        searchQualifierParam = QUALIFIER_PARAM_I_IMDB_ID;

    if(searchType === TYPE_PARAM_SERIES)
        searchTypeParam = TYPE_PARAM_SERIES;
    
    const URL = BASE_OMDB_SEARCH_API_URL+ searchQualifierParam + searchValue + TYPE_PARAM + searchTypeParam  + API_KEY;

    _fetchMovies(URL, dispatch);

    // reset defaults
    searchQualifierParam = QUALIFIER_PARAM_S_SEARCH;
    searchTypeParam = TYPE_PARAM_MOVIE;
}


//----------------------------
// Send the actual request and handle the response
//----------------------------
const _fetchMovies =  async (URL, dispatch) => {
    await axios(URL)
        .then(jsonResponse => {
            // reset defaults
            // searchQualifierParam = QUALIFIER_PARAM_S_SEARCH;
            // searchTypeParam = TYPE_PARAM_MOVIE;

            if (jsonResponse.data.Response === "True") {
                if(jsonResponse.data.hasOwnProperty("Search")) {
                    console.info("_fetchMovies: dispatching ActionType SEARCH_MOVIES_SUCCESS");
                    dispatch({
                        type: ActionTypes.SEARCH_MOVIES_SUCCESS,
                        payload: jsonResponse.data.Search
                    });
                }
                else if(jsonResponse.data.hasOwnProperty("Title") && 
                        jsonResponse.data.hasOwnProperty("Year"))  {
                    console.info("_fetchMovies: dispatching ActionType SEARCH_MOVIES_SUCCESS");
                    dispatch({
                        type: ActionTypes.SEARCH_MOVIES_SUCCESS,
                        payload: jsonResponse.data
                    });
                }
                else {
                    dispatch({
                        type: ActionTypes.SEARCH_MOVIES_FAILURE,
                        error: jsonResponse.data.Error
                    });
                }
            } 
            else 
            {
                console.info("_fetchMovies: SEARCH_MOVIES_FAILURE: " + jsonResponse.data.Error);

                if(jsonResponse.data.Error === "Too many results.")
                {
                    console.info("_fetchMovies: dispatching ActionType SEARCH_MOVIES_FAILURE");
                    dispatch({
                        type: ActionTypes.SEARCH_MOVIES_FAILURE,
                        error: "Too many results, please narrow your search criteria."
                    });
                }
                else if(jsonResponse.data.Error === "Series not found!"){
                    console.info("_fetchMovies: dispatching ActionType SEARCH_MOVIES_FAILURE");
                    dispatch({
                        type: ActionTypes.SEARCH_MOVIES_FAILURE,
                        error: "No results for TV series search."
                    });
                }
                else {
                    console.info("_fetchMovies: dispatching ActionType SEARCH_MOVIES_FAILURE");
                    dispatch({
                        type: ActionTypes.SEARCH_MOVIES_FAILURE,
                        error: jsonResponse.data.Error
                    });
                }
            }
        }
    );
};

// I added these but they are not called...
export const fetchMoviesLoading = () => {
    console.info("movieActionCreator:: fetchMoviesLoading: processing ActionType SEARCH_MOVIES_LOADING");
    ({
        type: ActionTypes.SEARCH_MOVIES_LOADING
    });
}

export const fetchMoviesFailed  = (errorMessage) => {
    console.info("movieActionCreator:: fetchMoviesFailed: processing ActionType SEARCH_MOVIES_FAILURE");
    ({
        type: ActionTypes.SEARCH_MOVIES_FAILURE,
        error: errorMessage
    });
}
