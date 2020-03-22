const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
  userFrom: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  movieId: {
    type: String,
    
  },

  movieTitle: {
    type: String,
    
  },
  movieImage: {
    type: String,
    
  },
  movieRunTime: {
    type: String,
    
  }

 
});

module.exports = Favorite = mongoose.model("favorite", favoriteSchema);
