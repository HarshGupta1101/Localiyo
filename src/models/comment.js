const mongoose = require('mongoose');

const commentschema = new mongoose.Schema({
    ccontent:{type:String},
    cusername:{type:String},
    csincetime:String,
    discussionid:mongoose.Types.ObjectId,
    commentuserphoto:String
},{timestamps:true} );

const commentmodel = mongoose.model("comments",commentschema);
module.exports=commentmodel;


