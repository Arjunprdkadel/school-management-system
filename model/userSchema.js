const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const userSchema=mongoose.Schema({

    email:{
        type:String,
        require:true
    },

    contact:{
        type:String,
        require:true
    },

    password:{
        type:String,
        require:true
    }
});

userSchema.pre("save", async function(next){
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password,12);
    }
    next();
});

const userModel=mongoose.model("userdata",userSchema);
module.exports=userModel;
