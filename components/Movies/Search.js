import React, { useState } from "react";
import { Button, Label, FormGroup } from 'reactstrap'

const inputStyle = 
{
  width: '400px',
  height: '30px'
};

const submitStyle = 
{
  width: '100px',
  height: '35px'
};


//=====================================
// User input search
//=====================================
const Search = ({ searchFn, dispatch }) => {
  const [searchValue, setSearchValue]  = useState("");

  const [idmbChecked, setIdmbCheck]    = useState(false);
  const [searchQualifierParam, setSearchQualiferParam]    = useState('s');

  const [tvSeriesChecked, setTvSeriesCheck]    = useState(false);
  const [searchTypeParam, setSearchTypeParam]  = useState('movie');
   
  const handleSearchValueChange = e => {
    setSearchValue(e.target.value);
  };

  const handleQualifierParamChange = e => {    
    const value = e.target.checked ? 'i' : "s";
    setIdmbCheck(true);
    setSearchQualiferParam(value);
  }

  const handleTypeParamChange = e => {    
    const value = e.target.checked ? 'series' : "movie";
    setTvSeriesCheck(true);
    setSearchTypeParam(value);
  }
  
  const resetFormValues = () => {
    setSearchValue("");
    setSearchQualiferParam('s');
    setSearchTypeParam("movie");

    setIdmbCheck(false);
    setTvSeriesCheck(false);
  };

  const callSearchFunction = e => {
    e.preventDefault();

    // invoke search function passed in from parent 
    searchFn(searchValue, searchQualifierParam, searchTypeParam, dispatch);
    resetFormValues();
  };

  return (
    <>
    <form>          
        <input
          style={inputStyle}
          type="text"
          value={searchValue}
          onChange={handleSearchValueChange}
        />
        <input onClick={callSearchFunction} type="submit" value="SEARCH" style={submitStyle}
              disabled={searchValue=== ""}  />
        <br/><br/>

        <span>
          <input 
            name="tvSeries"
            type="checkbox"
            checked={tvSeriesChecked}
            onChange={handleTypeParamChange} />
          <label>
            TV series
          </label>
        </span>
        <span style={{paddingRight: '40px'}}>
        
        </span>
        
        <span>
          <input 
            name="idmbId"
            type="checkbox"
            checked={idmbChecked}
            onChange={handleQualifierParamChange} />
          <label>
            Search IMDb ID (ttNNNNN)
          </label>
        </span>        
        <br/>        
    </form>
    </>
  );
};

export default Search;
