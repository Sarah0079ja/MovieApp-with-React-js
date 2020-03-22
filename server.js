const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require("config");

const app = express(); 

//middleware bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


// db config
const db = config.get('mongoURI');
  
// connect mongo  
mongoose
  .connect(db, {  
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Mongodb connected..."))
  .catch(err => console.log(err));

  
//use routes
 app.use("/api/users", require("./routes/api/users"));
 app.use("/api/favorite", require("./routes/api/favorite"));

const port = process.env.PORT || 5000
    app.listen(port, () => console.log(`server started on port ${port}`));