const should = require('chai').should();
const supertest = require('supertest');
const sinon = require('sinon');
const sinonMongoose = require('sinon-mongoose');
const expect = require('chai').expect;
//const logger = require('./../applogger');
var app = require('../webserver/service.js');
const url = supertest('http://localhost:8080');

let Testing = require('../webserver/config/testing');

let log4js = require('log4js');
let logger = log4js.getLogger();

describe("Signup route", function(err){

  it("should handle and login the registered user with correct credentials", function(done){
    url
        .post("/signup")
        .send(Testing.Signup)
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});

describe("AdminSignup route", function(err){

  it("should handle and login the registered user with correct credentials", function(done){
    url
        .post("/adminsignup")
        .send(Testing.AdminSignup)
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
          this.timeout(7000);
  });
});

describe("admindetails route", function(err){

  it("", function(done){
    url
        .post("/admindetails")
        .send(Testing.AdminDetails)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});

describe("Check user route", function(err){

  it("should check users", function(done){
    url
        .post("/checkuser")
        .send(Testing.CheckUser)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});

describe("Deletes user data", function(err){

  it("should delete user info", function(done){
    url
        .delete("/deleteuser")
        .send(Testing.DeleteUser)
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});

describe("Updates Password", function(err){
  this.timeout(7000);
  it("should update user password", function(done){
    url
        .post("/updatepassword")
        .send(Testing.UpdatePassword)
        .expect(302)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          //logger.debug().log("success")
          should.not.exist(err);
          done();
        });
  });
});

describe("Updating Profile", function(err){

  it("should update profile", function(done){
    url
        .put("/updateprofile")
        .send(Testing.UpdateProfile)
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});

describe("View Query", function(err){

  it("should view query", function(done){
    url
        .get("/viewquery")
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
  });
  //this.timeout(50000);
  this.timeout(15000);
});

describe("Analytics route", function(err){

  it("should handle and return the count", function(done){
    url
        .get("/analytics")
        .expect(500)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});

describe("getbroadcastmessage route", function(err){

  it("", function(done){
    url
        .get("/getbroadcastmessage")
        .expect(302)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});

describe("getadminuser route", function(err){

  it("get admin details", function(done){
    url
        .get("/getadmin")
        .expect(302)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});

describe("getknowledgebase rouet", function(err){

  it("router to get question answer set", function(done){
    url
        .get("/getknowledge")
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
      //  this.timeout(100000);
      this.timeout(15000);
  });
});
describe("verify question", function(err){
this.timeout(7000)
  it(" to verify questions", function(done){
    url
        .post("/question/verifyQuestion")
        .send(Testing.VerifyQuestion)
        .expect(302)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
  });
});

describe("add question answer", function(err){

  it("should add questions", function(done){
    url
        .post("/question/addQuestionAnswer")
        .send({})
        .expect(302)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});

describe("Rate answer", function(err){

  it("should rate the answer", function(done){
    url
        .post("/question/rateAnswer")
        .send(Testing.Rateanswer)
        .expect(302)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(7000)
  });
});


describe("Concept createConcept", function(err){

  it("", function(done){

    url
        .post("/concept/createConcept")
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});

describe("Concept rc", function(err){

  it("rc", function(done){

    url
        .get("/concept/rc")
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(15000);
  });
});

describe("Concept renameConcept", function(err){

  it("renameConcept", function(done){

    url
        .put("/concept/renameConcept")
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          //logger.debug(res);
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});


describe("analytics ", function(err){

  it("analytics", function(done){

    url
        .get("/analytics/")
        .expect(500)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});


describe("book  ", function(err){

  it("", function(done){

    url
        .post("/book/")
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});

describe("bookmarks  ", function(err){

  it(" ", function(done){

    url
        .get("/bookmarks/")
        .expect(500)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});

describe("bookmarks  ", function(err){

  it(":bookmarkId ", function(done){

    url
        .delete("/bookmarks/:5")
        .expect(500)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});

describe("get broadcast message  ", function(err){

  it(" ", function(done){

    url
        .get("/getbroadcastmessage/")
        .expect(302)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});

describe("dashboard route", function(err){

  it("fetch ", function(done){

    url
        .post("/dashboard/fetch/")
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});

describe("get knowledge base", function(err){

  it("getting knowledge base route", function(done){

    url
        .get("/getKnowledge/")
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          //logger.debug(res)
          should.not.exist(err);
          done();
        });
        this.timeout(15000);
  });
});

describe("get knowledge base", function(err){

  it("intents/:intent", function(done){

    url
        .get("/getKnowledge/intents/:5")
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          //logger.debug(res)
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});

describe("get knowledge base", function(err){

  it("keywords/:keyword", function(done){

    url
        .get("/getKnowledge/keywords/:5")
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          //logger.debug(res)
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});

describe("get knowledge base", function(err){

  it("keywordsandintents/:intent/:keyword", function(done){

    url
        .get("/getKnowledge/keywordsandintents/:intent/:5")
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          //logger.debug(res)
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});

describe("intent", function(err){

  it("baseIntents", function(done){

    url
        .get("/intent/baseIntents")
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});


describe("intent", function(err){

  it("addNewSameAsIntent", function(done){

    url
        .post("/intent/addNewSameAsIntent")
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});


describe("recommendations", function(err){

  it("getSiblings", function(done){

    url
        .get("/recommendations/getSiblings")
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});

describe("retriveChats", function(err){

  it("chats", function(done){

    url
        .get("/retriveChats/chats/")
        .expect(200)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});

describe("redis", function(err){

  it("getKeywords", function(done){

    url
        .get("/redis/getKeywords")
        .expect(200)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});

describe("redis", function(err){

  it("getTypes", function(done){

    url
        .get("/redis/getTypes")
        .expect(200)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(15000);
  });
});

describe("user", function(err){

  it("setlogindomain", function(done){

    url
        .put("/user/setlogindomain")
        .expect(200)
        .expect('Content-Type', /text/)
        .end(function(err, res){
          should.not.exist(err);
          done();
        });
        this.timeout(7000);
  });
});
