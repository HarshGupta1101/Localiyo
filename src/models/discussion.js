const mongoose = require('mongoose');

const forumschema = new mongoose.Schema({
    fcontent:{type:String},
    fusername:{type:String},
    creator:String,
    fsincetime:String,
    ftitle:{type:String},
    forumsuerphoto:String
},{timestamps:true} );

const forummodel = mongoose.model("forums",forumschema);
module.exports=forummodel;


