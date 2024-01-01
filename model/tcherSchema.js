const mongoose=require('mongoose');
const tcherSchema=mongoose.Schema({
    
    image:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    
    degree:{
        type:String,
        require:true
    },

    dob:{
        type:String,
        require:true
    },

    classes:{
        type:String,
        require:true
    },
    contact:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
});


const tcherModel=mongoose.model("teacherdata",tcherSchema);
module.exports=tcherModel;
