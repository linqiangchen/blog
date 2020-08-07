var mongoose = require('mongoose');
var db = require('./db.js')
var articleSchema = new mongoose.Schema({
    con : {type : String, },
    author  : {type : String},
    
});
articleSchema.statics.check = function(callback){
     this.model('Artic').find(callback);
}
var articModel = db.model('Artic', articleSchema);
module.exports = articModel;