const mongoose = require('mongoose');

const postschema = new mongoose.Schema({
    likes:[String],
    islike:Boolean,
    iscount:Number,
    report:[String],
    isreport:Boolean,
    iscountreport:Number,
    content:{type:String,required:true},
    userid:{type:mongoose.Types.ObjectId,ref:"user"},
    username:{type:String,required:true},
    postpcode :Number,
    sincetime:String,
    postuserphoto:String,
    postimgone:[],
},{timestamps:true} );

const postmodel = mongoose.model("posts",postschema);
module.exports=postmodel;


