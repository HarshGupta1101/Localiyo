const mongoose = require('mongoose');

const imgschema = new mongoose.Schema({
   
    filename:{type:String,unique:true,required:true},
    contentType:{type:String,required:true},
    imageBase64:{type:String,required:true},
    postid:{type:mongoose.Types.ObjectId,ref:"posts"},
},{timestamps:true} );


const ImgageModel = mongoose.model("uploads",imgschema);
module.exports=ImgageModel;