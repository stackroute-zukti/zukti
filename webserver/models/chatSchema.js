var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var chatSchema=mongoose.Schema({
  senderMail:String,
  receiverMail:String,
  senderName:String,
  receiverName:String,
  senderCount: Number,
  receiverCount: Number,
  chat:[{
    name:String,
    message:String,
    date:{type: Date, default: Date.now }
  }]
});

module.exports=mongoose.model('chatdetails',chatSchema);
