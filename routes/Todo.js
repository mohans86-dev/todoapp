const express=require('express');
const auth=require('../middleware/userjwt');

const Todo=require('../models/Todo'); 

const router=express.Router();

//desc create TODO task
//method (POST)
router.post('/', auth, async (req, res, next)=>{
    try {
        const toDo=await Todo.create({
            title:req.body.title, 
            description:req.body.description, 
            user:req.user.id
        });
        if(!toDo){
            return res.status(400).json({
                success:false,
                msg:"Something went wrong"
            });
        }
        return res.status(200).json({
            success:true,
            todo:toDo,
            msg:"Successfully created."
        });
    } catch (error) {
        next(error);
    }
});

//desc Fetch all todos
//method (GET)
router.get('/', auth, async (req, res, next)=>{
    try {
        const toDo= await Todo.find({
            user: req.user.id, 
            finished:false
        });

        if(!toDo){
            return res.status(400).json({
                success:false, 
                msg:"Something went wrong"
            });
        }
        res.status(200).json({
            success:true,
            count:toDo.length,
            todos:toDo,
            msg:"sucessfully fetched"
        })
    } catch (error) {
        next(error);
    }
});

//desc Fetch all (finished:true) todos
//method (GET)
router.get('/finished', auth, async (req, res, next)=>{
    try {
        const toDo= await Todo.find({
            user: req.user.id, 
            finished:true
        });

        if(!toDo){
            return res.status(400).json({
                success:false, 
                msg:"Something went wrong"
            });
        }
        res.status(200).json({
            success:true,
            count:toDo.length,
            todos:toDo,
            msg:"sucessfully fetched"
        })
    } catch (error) {
        next(error);
    }
});

//update any todo
//method (PUT)
router.put('/:id', async (req, res, next)=>{
    try {
        let toDo=await Todo.findById(req.params.id);
        if(!toDo){
            return res.status(400).json({
                success:false,
                msg:"Task do not exist"
            });
        }
        toDo= await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators:true
        });
        return res.status(200).json({
            success:true,
            todo:toDo,
            msg:"Something went wrong"
        });
    } catch (error) {
        next(error);
    }
})

//delete todo 
//method (DELETE)
router.delete('/:id', async (req, res, next)=>{
    try {
        let toDo=await Todo.findById(req.params.id);
        if(!toDo){
            return res.status(400).json({succes:false, msg:"Task todo not exist"});
        }
        toDo=await Todo.findByIdAndDelete(req.params.id);
        if(!toDo){
            return res.status(404).json({succes:false, msg:"Something went wrong"});
        }
        return res.status(200).json({succes:true, msg:"Task deleted"});
    } catch (error) {
        next(error);
    }
})

module.exports=router;

