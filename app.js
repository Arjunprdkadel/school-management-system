const express=require('express');
const app=express();
const router=express.Router();

var multer=require('multer');
const conn=require('./dbconnection');
const cookieParser=require('cookie-parser');
const session=require('express-session');


const bodyparser= require('body-parser');
const tcherModel= require('./model/tcherSchema');
const userModel=require('./model/userSchema'); 
const stntModel=require('./model/stuntSchema');


app.use(cookieParser());
app.use(session({key:'user_sid',
                 secret:'secret',
                 resave:false,
                saveUninitialized:false,
            cookie:{
                expires:600000,
                   },
            })
       );

app.set('view engine','ejs');
app.use(express.static('views'));
app.use(express.static('upload'));
app.use('/assets',express.static('assets'));
app.use(express.static('dashboard'));

app.use(bodyparser.urlencoded({extended:true}));
router.get('/',function(req,res){
    res.render('home');
});

router.get('/login',function(req,res){
    res.render('dashboard/login');
});
router.get('/user',function(req,res){
    res.render('user');
});

router.get('/userlogin',function(req,res){
    res.render('login');
});

router.get('/student',function(req,res){
    res.render('dashboard/addstudent');
});
router.get('/teacher',function(req,res){
    res.render('dashboard/addteacher');
});

router.get('/updateStnt',function(req,res){
    res.render('dashboard/editStnt');
});

router.get('/updateTcher',function(req,res){
    res.render('dashboard/editTcher');
});

router.get('/welcome', (req,res)=>{
    res.render('dashboard/welcome')
});
router.get('/header', (req,res)=>{
    res.render('dashboard/header')
});
router.get('/editTcher',function(req,res){
    res.render('dashboard/editTcher');
});
router.get('dashboard/viewStnt',function(req,res){
    res('dashboard/viewStnt');
});

router.get('/editstudent',function(req,res){
    res.render('dashboard/editStnt');
})

router.post('/user',function(req,res){
    const userdata= new userModel({
        email:req.body.email,
        contact:req.body.contact,
        password:req.body.password
    })
    userdata.save()
    res.redirect('/login')
    .then(()=>{console.log("data saved successfully in database.")})
    .catch((err)=>{console.log("there is some error.")});
});

router.get('/viewUser', async (req,res)=>{
   try{
    const userdata=await userModel.find({});
    res.render("dashboard/viewUser",{userdata:userdata});
    console.log(userdata);
   }
   catch(err){
    console.log(err);
};
})
// ***********ADD STUDENT CODE STARTED HERE***********//
const storage=multer.diskStorage({
    destination:function(req,file, cb){
        cb(null, './upload');
    },
    filename:function(req, file ,cb){
        cb(null , file.originalname);
        //cb(null , uuidv4() +'-'+ Date.now() + path.extname(file.originalname)) //Apending jpg

    }
});

const fileFilter= (req,file , cb)=>{
    const allowedFileType=['image/jpeg' , 'image/jpg' , 'image/png' , 'image/webp'];
    if(allowedFileType.includes(file.mimetype)){
        cb(null , true);
    }
    else{
        cb(null, false)
    }
}

let upload=multer({storage , fileFilter});
router.post('/addStnt', upload.single('image'),(req,res)=>{
    var addStnt= new stntModel({
        image:req.file.filename,
        name:req.body.name,
        id:req.body.id,
        contact:req.body.contact,    
        class:req.body.class,
        father:req.body.father,
        dob:req.body.DOB       
    });
    addStnt.save()
    res.redirect('welcome')
    .then(()=>{
        console.log("Student added succesfully....");
    })
    .catch((err)=>{
        console.log(err); 
    }) 
 
});
// ***********ADD STUDENT CODE ENDED HERE***********//

router.get('/viewStnt', async (req,res)=>{
    if(req.session.user && req.cookies.user_sid){
    try{
     const stuntdata=await stntModel.find({});
     res.render("dashboard/viewStnt",{stuntdata:stuntdata});
     console.log(stuntdata);
    }
    catch(err){
        console.log(err); }
    }else{
        res.redirect('/login')
    }    
});
 
//*****EDIT STUDENT CODE******//
 router.get("/editP/:id", async (req,res)=>{  
    try{
        const stuntdata=await stntModel.findById(req.params.id);
        console.log(stuntdata);
        res.render('dashboard/editStnt',{stuntdata:stuntdata});
    }
    catch(err){
        console.log(err);
    }
});
//*****UPDATE DATA POST CONDE*******//
router.post('/editP/:id' , async(req,res)=>{
    try{
        let updateP={
        name:req.body.name,
        id:req.body.id,
        contact:req.body.contact,    
        class:req.body.class,
        father:req.body.father,
        dob:req.body.DOB  
        };
         let updateProduct=await stntModel.findByIdAndUpdate(req.params.id , updateP);
        console.log(updateProduct);
        res.redirect('/viewStnt');
    }
    catch(err){
        console.log(err);
    }
});
//*********DELETE STUDENT CODE***********//
router.get("/delete/:id",async(req,res)=>{
    try{
        const data = await stntModel.findByIdAndRemove(req.params.id);
        res.redirect('/viewStnt');
        }catch(err){
            console.log(err);
    }
});
//*******TEACHER POST CODE*********//
router.post('/addTcher', upload.single('image'),(req,res)=>{
    var addTcher=new tcherModel({
        image:req.file.filename,
        name:req.body.name,
        degree:req.body.degree,
        dob:req.body.dob,    
        classes:req.body.classes,
        contact:req.body.contact,
        address:req.body.address       
    });
    addTcher.save()
    res.redirect('welcome')
    .then(()=>{
        console.log("Teacher added succesfully....");
    })
    .catch((err)=>{
        console.log(err); 
    }) 
 
});

router.get('/viewTcher', async (req,res)=>{
    if(req.session.user && req.cookies.user_sid){
    try{
     const tdata=await tcherModel.find({});
     res.render("dashboard/viewTcher",{tdata:tdata});
     console.log(tdata);
    }
    catch(err){
        console.log(err); }
    }else{
        res.redirect('/login')
    }    
});
 

router.get("/editTcher/:id", async (req,res)=>{  
    try{
        const tdata=await tcherModel.findById(req.params.id);
        console.log(tdata);
        res.render('dashboard/editTcher',{tdata:tdata});
    }
    catch(err){
        console.log(err);
    }
});

router.get("/deletetcher/:id",async(req,res)=>{
    try{
        const tdata = await tcherModel.findByIdAndRemove(req.params.id);
        res.redirect('/viewTcher',{tdata:tdata});
        }catch(err){
            console.log(err);
    }
});
//********LOGIN AND SESSION CODE********//
var sessionChecker = (req,res,next)=>{
    if(req.session.userModel && req.cookies.id){
        res.redirect('/welcome');
    }else{
        next();
    }
};

router.post('/login', async (req,res)=>{
    var email=req.body.email;
        password=req.body.password;

    try{
        var user=await userModel.findOne({email:email})
        .exec();
        console.log(user);
        if(!user){
            res.redirect('/login');
        }
         res.redirect('/welcome');
        user.comparePassword(password,
            (error,match)=>{
                if(!match){
                    res.redirect('/login');
                }
            });
            req.session.user=user; 
            //console.log(req.session.user)
            res.redirect('/'); //welcome tha
    }
    catch(error){
        console.log(error)
    }
});

router.get('/welcome', function(req,res){
    if(req.session.user && req.cookies.user_sid){
        res.render("welcome");
    }
    else{
        res.redirect("/login");
    }
});

router.get("/logout",(req,res)=>{
    if(req.session.userModel && req.cookies.id){
        res.clearCookie('id');
        res.render('login');
    }else{
        res.redirect('/login')
    }
});

router.get('show/:id',function(req,res){
    console.log(req.params.id);
     User.findById(req.params.id, function(err, data){
         if (err){
             console.log(err);
         }else{
             console.log(data);
             res.render('show',{data:data});
         }
     });
 })



app.use('/',router);
app.listen(8000, ()=>{
    console.log("run server on PORT 8000.")
});
