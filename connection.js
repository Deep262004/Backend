const mongoose = require('mongoose');  //req

const url = "mongodb+srv://Deep262004:Aditya@cluster0.ixejx.mongodb.net/mydbretryWrites=true&w=majority&appName=Cluster0";

//asynchronous function - returns Promise
mongoose.connect(url)
      .then((result) => { // shortcut keys thenc
            console.log('database connected');
      })
      .catch((err) => {
            console.log(err);
      });

      module.exports=mongoose