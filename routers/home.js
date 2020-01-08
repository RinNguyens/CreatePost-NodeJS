const Router = require('express-promise-router');
const fs = require('fs');
const upload = require('../middlewares/upload');
const Product = require('../models/product');
const path = require('path');
const Promise = require('bluebird');


Promise.promisifyAll(fs);
const router = new Router();


router.get('/',async function(req, res) {
  const Products = await Product.findAll();
  res.render('home',{Products});
});

router.post('/',async function(req,res){
  await Product.create({
      name : req.body.name,
      image : req.body.avatar,
      price : req.body.price,
      mota : req.body.mota
  });
});

router.get('/auth/login',function(req,res){
  res.render('../views/auth/login')
})


module.exports = router;
