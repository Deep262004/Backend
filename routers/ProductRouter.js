const express = require('express');

const router = express.Router();

router.get("/add", (req, res) => {
      res.send('response from product add');
});

router.get("/getall", (req, res) => {
      res.send('response from product getall');
});

router.get("/getbyid", (req, res) => {
      res.send('response from product getbyid');
});

router.get("/delete", (req, res) => {
      res.send('response from product delete');
});

router.get("/update", (req, res) => {
      res.send('response from product update');
});


module.exports = router;