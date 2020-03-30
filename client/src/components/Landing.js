import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from "./Calls";
// import {Typography} from 'antd';
import GridCard from './LandingPage/Sections/GridCard'
// import MovieDetail from './MovieDetail/MovieDetail'

import MainImage from "./LandingPage/Sections/MainImage";
 


const Landing = ()  => {
   const [Movies, setMovies] = useState([])
   const [CurrentPage, setCurrentPage] = useState([0])

  useEffect(() => {
    const endpoint =  `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint)
  }, [])

  const fetchMovies = (path) => {

    fetch(path)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setMovies([...Movies, ...response.results])
        setCurrentPage(response.page)
      });
  }


  const handleClick = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage +1}`;
    fetchMovies(endpoint)

  }

    return (
      <div style={{ width: "100%", margin: 0 }}>
        {Movies[0] && (
          <MainImage
            image={`${IMAGE_BASE_URL}w1280${Movies[0].backdrop_path &&
              Movies[0].backdrop_path}`}
            title={Movies[0].original_title}
            text={Movies[0].overview}
          />
        )}

        {/* //body */}
        <div style={{ width: "85%", margin: "1rem auto" }}>
          <h2 level={2}>Movies by latest</h2>

          <hr />
          {/* movie cards */}

          <div className="container">
            <div className="row">
              <div className="" style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr", gridGap: "1rem"}}>
                {Movies &&
                  Movies.map((movie, index) => (
                    <React.Fragment key={index}>
                      <GridCard
                        image={
                          movie.poster_path
                            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                            : null
                        }
                        movieId={movie.id}
                        movieName={movie.original_title}
                      />
                    </React.Fragment>
                  ))}
                ;
              </div>
            </div>
          </div>
          {/* <Row gutter={[16, 16]}></Row> */}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={handleClick}>Load More</button>
        </div>
        
      </div>
    );
  
}

export default Landing;