var mongoose = require('mongoose');
var db = require('./db.js')
var imageSchema = new mongoose.Schema({
    name : {type : String, },
    user  : { type: String},
    time:{type:String}
    
});
imageSchema.statics.check = function(callback){
     this.model('Image').find(callback);
}
imageSchema.statics.upImage = function(user,name,callback){
    this.model('Image').updateOne({user:user},{$push: {image:name}},callback);
}
var imageSchema = db.model('Image', imageSchema);

module.exports = imageSchema;