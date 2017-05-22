var express = require('express');
var router = express.Router();
var Channel= require('../../models/channelSchema');


// @ChatBot : default creation of General topic in all domain
router.post('/createChannelsArray',function(req,res,next){
	Channel.findOne({'key':'General'},function(err,data){
			if(err)
			{
				throw err;
			}
			else
			{
				if(!data)
				{
					var newChannel=new Channel({key:'General'});
					newChannel.save(function(err,data)
					{
						if(err)
						{
							throw err;
						}
						else{
							res.send("General Created in database");
						}
					})
				}
				else
				{
					res.send("General Channel already there");
				}
			}
	})
})

// @ChatBot : create new topic for particular domain
router.post('/addNewChannel',function(req,res,next){
	Channel.findOne({'key':req.body.channelName},function(err,data){
			if(err)
			{
				throw err;
			}
			else
			{
				if(!data)
				{
					var newChannel=new Channel({key:req.body.channelName});
					newChannel.save(function(err,data)
					{
						if(err)
						{
							throw err;
						}
						else{
							res.send("New channel Created in database");
						}
					})
				}
				else
				{
					res.send(req.body.channelName+ " channel already Exists");
				}
			}
	})

})

// @ChatBot : getting messages for particular topics
router.post('/getAllMessagesChannel',function(req,res,next){
	Channel.find({'key':req.body.channelName},function(err,data){
		if(err)
		{
			throw err;
		}
		else
		{
			if(data.length>0)
			res.send({msg:"I got all messages from  database",allmsgs:data[0].value})
		}
	})

})

// @ChatBot : getting all topics name
router.post('/getAllChannels',function(req,res,next){
	Channel.find({},function(err,data){
		if(err)
		{
			throw err;
		}
		else
		{
			res.send({msg:"I got all channels from  database",allChannels:data})
		}
	})

})

module.exports = router;
