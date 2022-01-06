const strings = require('@supercharge/strings/dist');
const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    firstname:String,
    lastname:String,
    emailid:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:Number,maxlength:10,unique:true},
    pincode:{type:Number,maxlength:6,required:true},
    dob:String,
    profilephoto:{type:Object},
    emailToken:String,
    isVerified:Boolean,
    resetString:String,
},{timestamps:true} );


const usermodel = mongoose.model("user",userschema);
module.exports=usermodel;


