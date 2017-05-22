var express = require('express');
var router = express.Router();
var Chat= require('../../models/chatSchema');

// @ChatBot : get chat history for particular receiver and sender
router.post('/getchat',function(req,res,next){
  var senderMail=req.body.senderMail;
  var receiverMail=req.body.receiverMail;
  Chat.findOne({
    $and: [
      { $or: [ { 'senderMail': senderMail }, { 'receiverMail': senderMail } ] },
      { $or: [ { 'senderMail': receiverMail }, { 'receiverMail': receiverMail } ] }
    ]
    },function(err,data)
    {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send(data);
        }
    });
});

// @ChatBot : update the notification of users
router.post('/updateCounter',function(req,res,next){
  var senderMail=req.body.senderMail;
  var receiverMail=req.body.receiverMail;
  var senderName=req.body.senderName;
  var notificationCount= req.body.updateCounter;
  Chat.findOne({
    $and: [
      { $or: [ { 'senderMail': senderMail }, { 'receiverMail': senderMail } ] },
      { $or: [ { 'senderMail': receiverMail }, { 'receiverMail': receiverMail } ] }
    ]
    },function(err,data)
    {
        if(err)
        {
            res.send(err);
        }
        else
        {
            if(data)
            {
                if(data.senderName === senderName)
                {
                    Chat.findOneAndUpdate({
                        $and: [
                            { $or: [ { 'senderMail': senderMail }, { 'receiverMail': senderMail } ] },
                            { $or: [ { 'senderMail': receiverMail }, { 'receiverMail': receiverMail } ] }
                            ]
                    },{$set:{
                            senderCount: notificationCount
                        }},function(err,data)
                        {
                            if(err)
                            {
                                res.send(err)
                            }
                            else
                            {
                                res.send(data)
                            }
                        })
                }
                else
                {
                    Chat.findOneAndUpdate({
                        $and: [
                            { $or: [ { 'senderMail': senderMail }, { 'receiverMail': senderMail } ] },
                            { $or: [ { 'senderMail': receiverMail }, { 'receiverMail': receiverMail } ] }
                            ]
                        },{$set:{ receiverCount: notificationCount}},
                        function(err,data)
                        {
                            if(err)
                            {
                                res.send(err)
                            }
                            else
                            {
                                res.send(data)
                            }
                        })
                }
            }
        else
        {
            res.send("no data");
        }
     }
  });
});

module.exports = router;
