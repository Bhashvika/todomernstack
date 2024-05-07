const router=require("express").Router();
const todomodel=require('../models/todomodel');
router.post('/add',async (req,res)=>{
    try{
        const data=req.body;
        const newtodo=new todomodel(data);
        await newtodo.save().then(()=>{
            res.status(200).json({message:"data added successfully"})
        })
    }
    catch(error){
        console.log(error);
    }
})
router.get('/gettodo',async (req,res)=>{
    let task;
    try{
        task=await todomodel.find();
        res.status(200).json({task});
    }
    catch(error){
        console.log("error");
    }
})
router.get("/gettodo/:id",async (req,res)=>{
    const id=req.params.id;
    let task;
    try{
        task=await todomodel.findById(id);
        res.status(200).json({task})
    }
    catch(error){
        console.log(error);
    }
})
router.put('/updatetodo/:id',async (req,res)=>{
    const id=req.params.id;
    const {Task}=req.body;
    let task;
    try{
        task=await todomodel.findByIdAndUpdate(id,{Task});
        
    }
    catch(error){
        console.log(error);
    }
    await task.save().then(()=>{
        res.status(200).json({message:"data updated successfully"})
    })
})
router.delete('/deletetodo/:id',async (req,res)=>{
    const id=req.params.id;
    try{
        await todomodel.findByIdAndDelete(id)
        .then(()=>{res.json({message:"data deleted successfully"})
        })
    }
    catch(error){
        console.log(error);
    }
})
module.exports=router;