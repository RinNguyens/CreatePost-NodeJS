const Todo = require('../models/todo');

const Router = require('express-promise-router');
const router = new Router();

// tim  todo va render it
router.get('/',async function(req,res){
    

    if(!req.currentUser){
        res.redirect('/auth/login');
    } else {
        const todos = await Todo.findAll();
         res.render('todo/index',{todos});
    }
});

router.post('/',async function(req,res){
    await Todo.create({
        task : req.body.task,
        done : false,
    });
    res.redirect('todo');
});

router.post('/:id/done',async function(req,res){
    const todo = await Todo.findOne({
        where : {
            id : req.params.id,
        }
    });
    todo.done = true;
    await todo.save();
    res.redirect('/todo');
});

module.exports = router;