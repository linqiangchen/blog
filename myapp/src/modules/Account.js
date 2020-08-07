var mongoose = require('mongoose');
var db = require('./db.js')
var accountSchema = new mongoose.Schema({
    user  : { type: String},
    pass:{type:String},
    time:{type:String}
    
});
    accountSchema.statics.check = function(user,callback){
        this.model('Account').find({user : user},callback);
   }

// accountSchema.statics.upImage = function(user,name,callback){
//     this.model('Image').updateOne({user:user},{$push: {image:name}},callback);
// }
var accountModel = db.model('Account', accountSchema);

module.exports = accountModel;