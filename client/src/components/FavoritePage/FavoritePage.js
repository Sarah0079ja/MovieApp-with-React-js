import React, {useEffect, useState} from 'react'
import './Favorite.css'
import Axios from 'axios'
import  {Popover} from 'antd'
import {IMAGE_BASE_URL} from "../Config";


 function FavoritePage() {

    const variables = { userFrom: localStorage.getItem('userId')}
    const [FavoritedMovies, setFavoritedMovies]  = useState([])


    useEffect(() => {
      fetchFavoritedMovies();

    })

    const fetchFavoritedMovies = () => {
        Axios.post("/api/favorite/getFavMovie", variables).then(res => {
          if (res.data.success) {
            setFavoritedMovies(res.data.favorites);
          } else {
            alert("Failed to get favorite video");
          }
        })
    }

    const onClickRemove = (movieId) => {

        const variable = {
            
            movieId: movieId,
            userFrom:  localStorage.getItem('userId')
        }
         Axios.post("/api/favorite/removeFav", variable).then(res => {
           if (res.data.success) {
             
            fetchFavoritedMovies();
           } else {
             alert("Failed to remove from favorite");
           }
         });
    }

    const renderTableBody = FavoritedMovies.map((movie, index) =>{

        const content = (
            <div>
                {movie.moviePost ? <img src={`${IMAGE_BASE_URL}w500${movie.moviePost}`} alt=""/> : 'no image'}
            </div>
        )
        return (
          <tr>
            <Popover content={content} title={`${movie.movieTitle}`}>
              <td>{movie.movieTitle}</td>
            </Popover>

            <td>{movie.movieRunTime}</td>
            <td><button onClick={() => onClickRemove(movie.movieId)}>Remove From the Favorites</button></td>
          </tr>
        );


    })


    return (
      <div style={{ width: "85%", margin: "3rem auto" }}>
        <h3>My Favorite Movie List</h3>
        <hr />

        <table>
          <thread>
            <tr>
              <th>Movie Title</th>

              <th>Movie Run Time</th>

              <th>Remove from Favorites</th>
            </tr>
          </thread>

          <tbody>
              {renderTableBody}
          </tbody>
        </table>
      </div>
    );
}

export default FavoritePage;