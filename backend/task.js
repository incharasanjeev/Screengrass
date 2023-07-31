const mongoose=require('mongoose');
const { Schema } =mongoose;

const TaskSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    TaskArray: {
        type: Array,
        required: true,
    },
   
    
   
})

module.exports= mongoose.model('Task',TaskSchema);