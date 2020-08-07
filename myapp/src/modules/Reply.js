var mongoose = require('mongoose');
var db = require('./db.js')
var replySchema = new mongoose.Schema({
    con:{type:String},
    user  : { type: mongoose.Types.ObjectId, ref: 'User' },
    to: { type: mongoose.Types.ObjectId, ref: 'User' },
    createTime:{type:String}
});

var replyModel = db.model('Reply', replySchema);
module.exports = replyModel;