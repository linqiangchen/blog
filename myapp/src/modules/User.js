var mongoose = require('mongoose');
var db = require('./db.js')
var Post = require('./post')
var userSchema = new mongoose.Schema({
    user : {type : String, },
    image : {type : Array},
    sex   : {type : String},
    avatr : {type : String, default : 'avatr.png'},
    username : {type : String,default : '匿名用户'},
    birthday : {type : String},
    describe : {type : String , default : '这个人很懒，什么也没有留下'},
    label : {type: Array},
    posts:[{ type: mongoose.Types.ObjectId, ref: 'Post' }],
    follow:[{ type: mongoose.Types.ObjectId, ref: 'User' }]
});

userSchema.statics.checkAllmsg = function(user,callback){
    this.model('User').find({user : user}).populate({
        path: 'posts',
        // Get friends of friends - populate the 'friends' array for every friend
        populate: { path: 'user' }
      }).populate("follow").exec(callback);
}
userSchema.statics.fans = function(user_id,callback){
    this.model('User').find({follow:user_id},callback);
}
userSchema.statics.check = function(user,callback){
     this.model('User').find({user : user},callback);
}
userSchema.statics.findUserByName = function(name,callback){
    this.model('User').find({username : { $regex:name} },callback);
}
userSchema.statics.follow = function(user,id,callback){
    this.model('User').updateOne({user:user},{$push: {follow:id}},callback);
}
userSchema.statics.upImage = function(user,name,callback){
    this.model('User').updateOne({user:user},{$push: {image:name}},callback);
}
userSchema.statics.upAvatr = function(user,avatr,callback){
    this.model('User').updateOne({user:user},{$set :{avatr: avatr}},callback);
}
userSchema.statics.shoucang = function(user,_id,callback){
    this.model('User').updateOne({user:user},{$push: {posts:_id}},callback);
}
userSchema.statics.myShoucang = function(user,callback){
    this.model('User').findOne({user:user}).populate({
        path: 'posts',
        // Get friends of friends - populate the 'friends' array for every friend
        populate: { path: 'user' }
      }).exec(callback);
}
userSchema.statics.upUserName = function(user,form,callback){
    this.model('User').updateOne({user:user},{$set :{
        username: form.name,
        sex:form.sex,
        birthday:form.birthday,
        label:form.label,
        describe:form.desc
    }},callback);
}

var userModel = db.model('User', userSchema);
module.exports = userModel;