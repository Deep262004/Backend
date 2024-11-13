const mongoose = require('mongoose');  //req

const url = " ";

//asynchronous function - returns Promise
mongoose.connect(url)
.then((result) => { // shortcut keys thenc
      console.log('database connected');
})
.catch((err) => {
      console.log(err);
});