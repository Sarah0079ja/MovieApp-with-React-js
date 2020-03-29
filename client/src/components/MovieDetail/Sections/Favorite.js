import React,{useEffect, useState} from 'react';
import axios from 'axios'

 function Favorite(props) {

  const [FavoriteNo, setFavoriteNo] = useState(0)
  const [Favorited, setFavorited] = useState(false, [])

  const variable = {
    userFrom: props.userFrom,
    movieId: props.movieId,
    movieTitle: props.movieInfo.original_title,
    movieImage: props.movieInfo.backdrop_path,
    moviRunTime: props.movieInfo.runtime
  }

  useEffect(() => {

    
    
    axios.post("api/favorite/favoriteNo", variable)
      .then(res => {
        if(res.data.success){
            setFavoriteNo(res.data.favoriteNo)
        } else {
          alert('Failed to get Favorite Number')
        }
      })

    axios.post('api/favorite/favorited', variable)
      .then(res => {
        if(res.data.success){
          setFavorited(res.data.favorited)
        } else {
          alert('Failed to get favorite info')
        }
      })

  }, [])

const  onClickFavorite = () => {
  if(Favorited) {
    //when already added
    axios.post("/api/favorite/removeFromFavorite", variable).then(res => {
      if (res.data.success) {
        setFavoriteNo(FavoriteNo - 1);
        setFavorited(!Favorited);
      } else {
        alert("Failed to remove from Favorites");
      }
    });


  } else {
    // when not adding yet
    axios.post('/api/favorite/addToFavorite', variable)
    .then(res => {
      if(res.data.success) {
        setFavoriteNo(FavoriteNo + 1)
        setFavorited(!Favorited);
      } else {
        alert('Failed to add to Favorites')
      }
    })

  }
}

  return (
    <div>
      <button onClick={onClickFavorite}>{Favorited ? 'remove from Favorite': 'Add to Favorite'}{FavoriteNo}</button>
    </div>
  )
}

export default Favorite;