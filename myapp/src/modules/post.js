var mongoose = require('mongoose');
var db = require('./db.js')
var User = require('./User')
var postSchema = new mongoose.Schema({
    con : {type : String, },
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    star:{type:Number, default:0}, 
    star_user:[{ type: mongoose.Types.ObjectId, ref: 'User' }],
    createTime:{type:String},
    read:{type:Number, default:0}
});
postSchema.statics.check = function(callback){
     this.model('Post').find().populate('user').exec(callback);
}
postSchema.statics.doComment = function(id,callback){
    this.model('Post').updateOne({_id:id},{$push:{}});
}
postSchema.statics.show = function(id,callback){
    this.model('Post').findOne({_id:id}).populate({
        path: 'comment',
        // Get friends of friends - populate the 'friends' array for every friend
        populate: { path: 'reply' }
      }).populate('user').exec(callback);
}
postSchema.statics.myPosts = function(user,callback){
    this.model('Post').find({user:user}).populate('user').exec(callback);
}

postSchema.statics.read = function(id,readnum,callback){
    this.model('Post').updateOne({_id:id},{$set :{read:readnum}},callback);
}
var postModel = db.model('Post', postSchema);
module.exports = postModel;