// importing express
const express = require('express');
const UserRouters = require('./routers/userRouters');
const productRouter = require('./routers/ProductRouter');

// creating an express app

const app =express();

const port = 5000;

//middleware
app.use('/user', UserRouters);
app.use('/Product',productRouter);

 // route or endpoint
app.get('/', (req, res) => {
      res.send('response from express');
})

app.get('/add', (req,res) =>{
      res.send('response from add');
})

app.get('/getall', (req,res) =>{
      res.send('response from getall');
})

app.get('/delete', (req,res) =>{
      res.send('response from delete');
})


//starting the server
app.listen( port, () => {console.log('server started');})