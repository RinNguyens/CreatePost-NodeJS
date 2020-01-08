const User = require('../models/user');
const Router = require('express-promise-router');
const fs = require('fs');
const Promise = require('bluebird');
const path = require('path');
const upload = require('../middlewares/upload');

Promise.promisifyAll(fs);

const router = new Router();

router.get('/upload',function(req,res){
    if(!req.currentUser){
        res.redirect('/auth/login');
    }else {
        res.render('profile/upload');
    }
});

router.post('/upload', upload.single('avatar'), async function (req, res, next) {
    const { file } = req;
    const ext = path.extname(file.originalname);
    const fileName = req.currentUser.id + ext;
    const sourcePath = path.join(__dirname, '..', 'upload', file.filename);
    const destPath = path.join(__dirname, '..', 'public', 'image', fileName);
    await fs.rename(sourcePath, destPath,(err)=>{console.log('upload faild')});


    res.redirect('/')
  });

module.exports = router;
