const express = require('express');

const router = express.Router();

router.get("/add", (req, res) => {
      res.send('response from user add');
});

router.get("/getall", (req, res) => {
      res.send('response from user getall');
});

router.get("/getbyid", (req, res) => {
      res.send('response from user getbyid');
});

router.get("/delete", (req, res) => {
      res.send('response from user delete');
});

router.get("/update", (req, res) => {
      res.send('response from user update');
});


module.exports = router;