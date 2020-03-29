const express = require("express");
const router = express.Router();

const { Favorite } = require("../../models/Favorite");

const { auth } = require("../../middleware/auth");

//=================================
//             Favorite
//=================================

router.post("/favoriteNo", (req, res) => {
  //find favorite info inside favorite collectionby movieid

  Favorite.find({'movieId': req.body.movieId })
    .exec((err, favorite) => {
      if(err) return res.status(400).send(err)
      res.status(200).json({ success: true, favoriteNo: favorite.length })
    })
});

router.post("/favorited", (req, res) => {
  //find favorite info inside favorite collection by MovieId, userFrom
   Favorite.find({ movieId: req.body.movieId, 'userFrom': req.body.userFrom })
   .exec(( err, favorite) => {
     if(err) return res.status(400).send(err)

     //How to know if i already favorite this movie or not?
     let result = false;
     if(favorite.length !== 0) {
       result = true
     }
     res.status(200).json({ success:true, favorited: result})

   });
  
});

router.post("/addToFavorite", (req, res) => {
  //save info about the movie or user Id inside fav collection
  
  console.log(req.body);
  
  const favorite = new Favorite(req.body);

  favorite.save((err, doc) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({success: true})
  }
  
)});

router.post("/removeFromFavorite", (req, res) => {
  //save info about the movie or user Id inside fav collection

  Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom})
  .exec(( err, doc) => {
    if(err) return res.status(400).json({ success: false, err})
    res.status(200).json({success: true, doc})
  })
  })
  


// router.post("/favorited", (req, res) => {
//   Favorite.find({
//     movieId: req.body.movieId,
//     userFrom: req.body.userFrom
//   }).exec((err, subscribe) => {
//     if (err) return res.status(400).send(err);

//     let result = false;
//     if (subscribe.length !== 0) {
//       result = true;
//     }

//     res.status(200).json({ success: true, subcribed: result });
//   });
// });

// router.post("/addToFavorite", (req, res) => {
//   console.log(req.body);

//   const favorite = new Favorite(req.body);

//   favorite.save((err, doc) => {
//     if (err) return res.json({ success: false, err });
//     return res.status(200).json({ success: true });
//   });
// });

// router.post("/removeFromFavorite", (req, res) => {
//   Favorite.findOneAndDelete({
//     movieId: req.body.movieId,
//     userFrom: req.body.userFrom
//   }).exec((err, doc) => {
//     if (err) return res.status(400).json({ success: false, err });
//     res.status(200).json({ success: true, doc });
//   });
// });

// router.post("/getFavoredMovie", (req, res) => {
//   //Need to find all of the Users that I am subscribing to From Subscriber Collection
//   Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
//     if (err) return res.status(400).send(err);
//     return res.status(200).json({ success: true, favorites });
//   });
// });

module.exports = router;
