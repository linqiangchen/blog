var mongoose = require('mongoose');
var db = require('./db.js')
var commentSchema = new mongoose.Schema({
    id:{ type: mongoose.Types.ObjectId, ref: 'Post' },
    con:{type:String},
    reply:[{ type: mongoose.Types.ObjectId, ref: 'Reply' }],
    user  : { type: mongoose.Types.ObjectId, ref: 'User' },
    createTime:{type:String}
});
commentSchema.statics.check = function(callback){
     this.model('Comment').find(callback);
}
var commentModel = db.model('Comment', commentSchema);
module.exports = commentModel;