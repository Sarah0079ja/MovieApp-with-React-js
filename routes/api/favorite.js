const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/auth");

//User model
const {Favorite} = require("../../models/Favorite");

router.post("/favoriteNo", (req, res) => {
  //find favorite info inside Favorite collection by movie id
  Favorite.find
  ({'movieId': req.body.movieId})
    .exec((err, subscribe) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, subscribeNo: subscribe.length });
  })
});



router.post("/favorited", (req, res) => {
  //find favorite info inside Favorite collection by movie id & useFrom
  Favorite.find({ 'movieId': req.body.movieId, 'userFrom': req.body.userFrom })
    .exec((err, subscribe) => {
      if (err) return res.status(400).send(err);

      let result = false;
      if (subscribe.length !== 0) {
        result = true
      }
      res.status(200).json({ message: true, subscribed:result });
    });
});

router.post("/addFav", (req, res) => {
  //save info about userId/movie

  const favorite = new Favorite(req.body);
  favorite.save((err, doc) => {
      if(err) return res.json({success: false, err})
      return res.status(200).json({success: true, doc})
  })

  
});

router.post("/removeFav", (req, res) => {
  //save info about userId/movie

  //  const favorite = new Favorite(req.body)

  Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
  .exec((err, doc) => {
      if(err) return res.status(400).json({success: false, err})
      res.status(200).json({success: true, doc})
  })

  
});

router.post("/getFavMovie", (req, res) => {
  //need to find all Users that i subscribe to from subscribe collection


  Favorite.find({'userFrom': req.body.userFrom})
    .exec((err, favorites) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, favorites });
  });
});


module.exports = router;
 