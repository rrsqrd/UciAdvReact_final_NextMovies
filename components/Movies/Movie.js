import React from "react";
import {Label, Col, Row, Form} from "reactstrap";


const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";


const movieStyle1 = 
{
  padding: '5px 25px 10px 25px',
  maxWidth: '25%'
};
const movieStyle2 = 
{
  padding: '25px 25px 10px 80px',
  maxWidth: '100%'
};

const Movie = ({ movie }) => {
    const posterImg = movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

    if( !movie.hasOwnProperty("Actors")  &&  !movie.hasOwnProperty("Plot"))
    {
      return (
        <div style={movieStyle1}>
            <Form model="aForm">
              <Row className="form-group">
                <h3>{movie.Title}</h3>
              </Row>
              <Row className="form-group">
                  <img
                    width="230"
                    alt={`The movie titled: ${movie.Title}`}
                    src={posterImg}
                    height="360"
                  />          
              </Row>        
              <Row className="form-group">

              </Row>
              <Row className="form-group">
                  <Col md={2}>
                      <strong><Label htmlFor="title">{'(' + movie.Year + ')' }</Label></strong>
                  </Col>
                  <Col md={2}>
                      <strong><Label htmlFor="imdbID">{"IMDbId " + movie.imdbID}</Label></strong>
                  </Col>                    
              </Row>
            </Form>
        </div>
      ); 
    }
    else {
      return (
        <div style={movieStyle2}>
          <Form model="aForm">
            <Row className="form-group">
              <h3>{movie.Title}</h3>
            </Row>
            <Row className="form-group">
                <img
                  width="200"
                  alt={`The movie titled: ${movie.Title}`}
                  src={posterImg}
                  height="300"
                />          
            </Row>        
            <Row className="form-group">

            </Row>
            <Row className="form-group">
                <Col md={2}>
                    <strong><Label htmlFor="title">{'(' + movie.Year + ')' }</Label></strong>
                </Col>
                <Col md={2}>
                    <strong><Label htmlFor="imdbID">{"IMDbId " + movie.imdbID}</Label></strong>
                </Col>
                <Col md={2}>
                    <strong><Label htmlFor="rated">{"Rated " + movie.Rated}</Label></strong>
                </Col>
                <Col md={2}>
                    <strong><Label htmlFor="released">{"Released " + movie.Released}</Label></strong>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <strong><Label htmlFor="Runtime">{"Runtime " + movie.Runtime}</Label></strong>
                </Col>
                <Col md={2}>
                    <strong><Label htmlFor="Genre">{"Genre " + movie.Genre}</Label></strong>
                </Col>
                <Col md={2}>
                    <strong><Label htmlFor="Language">{"Language " + movie.Language}</Label></strong>
                </Col>
                <Col md={2}>
                    <strong><Label htmlFor="Awards">{"Awards " + movie.Awards}</Label></strong>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <strong><Label htmlFor="Actors">{"Actors " + movie.Actors}</Label></strong>
                </Col>      
            </Row>
            <Row>
                <Col md={4}>
                    <strong><Label htmlFor="Plot">{"Plot " + movie.Plot}</Label></strong>
                </Col>      
            </Row>
        </Form>
      </div>
      )
    }
}

export default Movie;
