const mongoose=require('mongoose');
const conn=mongoose.connect("mongodb+srv://rohan:rabbitcat@cluster0.wuhmurf.mongodb.net/employees?retryWrites=true&w=majority",
{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
.then(()=>console.log("conneted successfully"))
.catch((err)=>console.log("some error."));
module.exports=conn;