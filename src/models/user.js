import mongoose from './index.js'
const validateEmail = (e)=>{
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(e); 
}

const userSchema=new mongoose.Schema({
       
       name:{
           type:String,
           required:[true,'name is required']
       },
       email:{
           type:String,
           required:[true,'email is required'],
           validate:validateEmail
       },
       password:{
           type:String,
           required:[true,'password is required']
       },
       status:{
            type:String,
            default:"Active"
       },
       role:{
           type:String,
           default:'user'
       },
       createdAt:{
           type:Date,
           default:Date.now()
       }
},{
    collection:'users',
    versionKey:false
})
  
 const UserModel= mongoose.model('users',userSchema)

 export default UserModel