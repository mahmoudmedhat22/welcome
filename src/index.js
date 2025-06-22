const express = require('express')
const path = require('path') 
const bcrypt = require('bcrypt')
const collection = require('./config')
const { name } = require('ejs')
const { send } = require('process')

const app = express()
// set ejs aview engine
app.set('view engine','ejs')
// static file
app.use(express.static('public'))
// convert data to Json format
 app.use(express.json())
 // urlencooded?
 app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>[
    res.render('login')
])
app.get('/SignUp',(req,res)=>[
    res.render('signup')
])

app.post('/SignUp', async (req,res)=>{
 const data ={
    name: req.body.username,
    password:req.body.password,}
 
    // check if the user is exists in database 
    const existingUser = await collection.findOne({name:data.name})
    if(existingUser){
        res.send("this username already exists trying with another name")
    }else{
        // hash password
        const saltround = 10 //number of salt round bcrypt
        const hashPassword = await bcrypt.hash(data.password,saltround)
        data.password = hashPassword // replace password for hash password

    const userdata = await collection.insertMany(data)
    console.log(userdata)
}})

// login user 
app.post('/login',async(req,res)=>{
   try{
     const check = await collection.findOne({name:req.body.username})
     if(!check){
        res.send('user not found')
     } 
     // compare hash password from database
     const IsPasswordIsMatch = await bcrypt.compare(req.body.password,check.password)
     if(!IsPasswordIsMatch){
        res.send("username or password is not correct")
     }else{
        res.render('home')
     }
    }
    catch{
        res.send('wrong details')
    }
  
   

})

// app.post("/login", async (req, res) => {
//     try {
//         const check = await collection.findOne({ name: req.body.username });
//         if (!check) {
//             res.send("User name cannot found")
//         }
//         // Compare the hashed password from the database with the plaintext password
//         const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
//         if (!isPasswordMatch) {
//             res.send("wrong Password");
//         }
//         else {
//             res.render("home");
//         }
//     }
//     catch {
//         res.send("wrong Details");
//     }
// });


const  port = 5000
app.listen(port,()=>{
    console.log(`server connected : ${port} `)
})