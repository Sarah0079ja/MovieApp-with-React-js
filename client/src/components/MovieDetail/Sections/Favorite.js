import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {Button} from 'antd'
// import { useSelector } from "react-redux";

 function Favorite(props) {

    //    const user = useSelector(state => state.user);

    //    const movieId = props.movieId;
    //    const userFrom = props.userFrom;
    //    const movieTitle = props.movieInfo.title;
    //    const moviePost = props.movieInfo.backdrop_path;
    //    const movieRunTime = props.movieInfo.runtime;
    //    const  moviePost = props.movieInfo.backdrop_path

    const [FavoriteNo, setFavoriteNo] =useState(0) 
    const [Favorited, setFavorited] =useState(false)

     const variable = {
       userFrom: props.userFrom,
       movieId: props.movieId,
       movieTitle: props.movieInfo.original_title,
       movieImage: props.movieInfo.backdrop_path,
       movieRunTime: props.movieInfo.runtime,
       moviePost: props.movieInfo.backdrop_path
     };


    useEffect(() => {
       
        axios.post('/api/favorite/favoriteNo', variable)
        .then(res => {
            if(res.data.success) {
                setFavoriteNo(res.data.favoriteNo)
            } else {
                alert('favouriteNo not available')
            }
        })

        axios.post('/api/favorite/favorited', variable)
        .then(res => {
            if(res.data.success) {
                setFavorited(res.data.favorited)
            } else {
                alert('Failed to get favorite info')
            }
        })
       
    })

    const onClickFavorite = () => {

        // if (user.userData && !user.userData.isAuth) {
        //     return alert('Login Required')
        // }
        if (Favorited) {
           //when already added

             axios.post("/api/favorite/removeFav", variable)
             .then(res => {
               if (res.data.success) {
                   console.log(res.data.favoriteNo)
                    setFavoriteNo(FavoriteNo - 1);
                    setFavorited(!Favorited);
                
               } else {
                 alert("Failed to remove from favorite");
               }
             })

        } else {
            //when not added yet

            axios.post('/api/favorite/addFav', variable)
                .then(res => {
                    if (res.data.success) {
                        setFavoriteNo(FavoriteNo +1)
                        setFavorited(!Favorited);
                    } else {
                        alert('failed to add to favorite')
                    }
                })
        }
    }
    return (
      <div>
        <Button onClick={onClickFavorite}> {!Favorited ? 'Add to Favorite' : 'Not Favortie'}{FavoriteNo}</Button>
      </div>
    );
}
export default Favorite