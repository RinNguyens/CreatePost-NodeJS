const User = require('../models/user');
const bcrypt = require('bcrypt');
const Router = require('express-promise-router');
const router = new Router();
const {isEmail,isEmpty} = require('validator');
const auth = require('../middlewares/auth');
router.get('/',async function(req,res){
    res.render('auth/login');
});
router.get('/signup',async function(req,res){
    res.render('auth/signup');
});
router.get('/logout',async function(req,res){
    req.session.destroy();
    
    res.redirect('/');
});

router.post('/signup',async (req,res,next)=>{
    // User should secure password before sending
    let {email,displayname,password} = req.body;
    console.log(email,displayname,password);

    if(isEmpty(email) || isEmpty(displayname) || isEmpty(password) || !isEmail(email)){
        res.json({
            result : 'faild',
            data : {},
            message : 'Email or Password is Empty.'
        });
        return;
    };
    try {
        let Users = await User.create({
            email : req.body.email,
            displayName : req.body.displayname,
            password : req.body.password
        }, {
            fields : ['email','displayName','password'],
        });
        if(Users){
            res.redirect('login');
            next();
            res.json({
                result : 'Email is the Ok',
                data : Users,
                message : 'Insert a New Users SuccessFully'
            });
           
        } else {
            res.json({
                result : 'Email is the Faild',
                data : Users,
                message : 'Insert a New Users FAILD'
            });
        }
    } catch(error) {
        res.json({
            result : 'Email is the Faild',
            data : {},
            message : `Insert a New Users FAILD. Error : ${error}`
        });
    }
    Users = User.save();
});

router.post('/login',async (req,res,next)=>{
    const { email,password } = req.body;
    if(isEmpty(email) || isEmpty(password)) {
        res.json({
            result : 'Faild',
            data : {},
            message : 'Login user Faild '
        });
        return;
    }
    const user = await User.findOne({
        where: { email },
      });
    if (!user) {
    throw Error('Wrong email/password');
    }
    req.session.userId = user.id;
    console.log(req.session);
    res.redirect('/');
});

module.exports = router;