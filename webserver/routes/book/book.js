let express = require('express');
let router = express.Router();
const path = require('path');
var PDFDocument = require('pdfkit');
var fs = require('fs');
let fetchContent = require('./functions/fetchContent');
let fetchConcepts = require('./functions/fetchConcepts');
let processQuestion = require('./functions/processQuestion');
let client = require('./functions/redis');
router.post('/verifyQuestion', function(req, res) {
    let question = req.body.question.value;
    let q_time = req.body.question.time;
    let domain = req.body.domain;
    lexicon();
    let keywordLexicon = [];
    let intentLexicon = [];
    let log4js = require('log4js');
    let logger = log4js.getLogger();
    function lexicon() {
        client.hkeys('keywords', function(err, reply) {
            keywordLexicon = reply;
        });
        client.hkeys('intents', function(err, reply) {
            intentLexicon = reply;
            callBack();
        });
    }
    function callBack() {
        let questionInfo = processQuestion(question, keywordLexicon, intentLexicon);
        logger.debug(questionInfo.keywords + ",,,,,,,,,typed now");
        if (questionInfo.keywords) {
            console.log(questionInfo.keywords);
            res.json({isValidQuestion: questionInfo.keywords, time: q_time});
        } else {
            res.json({isValidQuestion: 'The question must have an keyword'});
        }
    }
});
router.post('/', function(req, res) {
    var id = req.body.username;
    var keyword = req.body.k;
    var time = req.body.time;
    var domain = req.body.domain;
    var flag = 0,
        count = 0;
    let resultCallback = function(concepts) {
        console.log(concepts);
        var filepath = path.resolve(".") + '/PDF/';
        fs.readdir(path.resolve(".") + '/PDF/', function(err, files) {
            if (err) {
                throw err;
            }
            files.map(function(file) {
                var resp = file.split('_');
                console.log(resp[0] + resp[1]);
                if (resp[2] == id && resp[1] == time) {
                    count++;
                }
            });

            if (count < 4) {
                flag = 1;
                for (let i = 0; i < concepts.length; i++) {
                    if (keyword == concepts[i]) {
                        var doc = new PDFDocument({margin: 0});
                        let resultCallback = function(domain_arr, content, answer) {
                            console.log(content.length);
                            doc.image('webclient/images/screen.jpg', {
                                fit: [650, 1300]
                            });
                            doc.addPage({margin: 50})
                            for (let i = 0; i < content.length; i++) {
                                doc.fontSize(16)
                                doc.font('Times-Roman')
                                doc.fillColor('blue')
                                doc.text(content[i])
                                doc.text('')
                                doc.fillColor('teal')
                                doc.text(answer[i])
                                doc.text('')
                                doc.text('***---***---***---***---***---***---***---***');
                            }
                            doc.pipe(fs.createWriteStream(path.resolve(".") + '/PDF/' + keyword + "_" + time + "_" + id + "_"+ count+'.pdf'));
                            doc.end();
                            console.log(time + keyword);
                        };
                        fetchContent(resultCallback, domain, keyword);
                        flag = 2;
                        break;
                    } //end of count if
                } //end of keyword if
                //res.json({date:"exceeded the limit"});
            } //end of for
            if (flag == 0) {
                res.json({data: "exceeded the limit"});
            } else if (flag == 1) {
                res.json({data: "No concepts found/you are in different Domain"});
            } else {
                res.json({data: "pdf created successfully....it will take some time to open"});
            }
        });
    }

    fetchConcepts(resultCallback, domain);
});
router.post('/getBook', function(req, res) {
    var username = req.body.username;
    var book_arr = [];
    var filepath = path.resolve(".") + '/PDF/';
    fs.readdir(path.resolve(".") + '/PDF/', function(err, files) {
        if (err) {
            throw err;
        }
        files.map(function(file) {
            var resp = file.split('_');
            //var filter=resp[2].split('.')
            if (resp[2] == username) {
                book_arr.push(file);
            }
            console.log(resp);
        });
        res.json({book_arr});
    });
});
module.exports = router;
