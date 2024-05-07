const mongoose=require("mongoose");
const TodoSchema=new mongoose.Schema({
    Task:{type:String,require:true}
});
module.exports=new mongoose.model("tasks",TodoSchema);