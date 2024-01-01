const mongoose=require('mongoose');
const stntSchema=mongoose.Schema({
    
    image:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    
    id:{
        type:String,
        require:true
    },

    contact:{
        type:String,
        require:true
    },

    class:{
        type:String,
        require:true
    },
    father:{
        type:String,
        require:true
    },
    dob:{
        type:String,
        require:true
    },
});


const stntModel=mongoose.model("studentdata",stntSchema);
module.exports=stntModel;
