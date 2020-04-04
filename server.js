const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require("config");
const path = require('path')

const cors = require("cors")
require('dotenv').config()

const app = express(); 

//middleware bodyparser
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


// db config
// const db = config.get('mongoURI');
  
// // connect mongo  
// mongoose
//   .connect(db, {  
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
//   })
//   .then(() => console.log("Mongodb connected..."))
//   .catch(err => console.log(err));


mongoose.connect(
  "mongodb+srv://MovieDb:movie01@cluster0-9n9ja.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  }
);
mongoose.connection
  .once("open", function() {
    console.log("MongoDb connected...");
  })
  .on("error", function(error) {
    console.log("Error is: ", error);
  });

  
//use routes
 app.use("/api/users", require("./routes/api/users"));
 app.use("/api/favorite", require("./routes/api/favorite"));
 app.use("/api/auth", require("./routes/api/auth"));


 //serve static assets

  app.use(express.static(path.join(__dirname, 'client/build'))); 

  app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, '/client/build', 'index.html')); 
  });
 


const port = process.env.PORT || 5000
    app.listen(port, () => console.log(`server started on port ${port}`));