let express = require('express');
let router = express.Router();
const path=require('path');
var PDFDocument = require('pdfkit');
var fs = require('fs');
let fetchContent = require('./functions/fetchContent');
router.post('/',function(req,res){
  //var content=req.body.content;
  var domain=req.body.domain;
  console.log(domain);
  if(domain=='react')
  {
  var filename=req.body.filename1;
  var doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(path.resolve(".")+'/PDF/'+filename+'.pdf'));
  let resultCallback = function(content) {
    doc.text(content);
    //font('fonts/Chalkboard.ttc', 'Chalkboard-Bold').text(content).fontSize(18);
    console.log(content);
     res.json({content});
     //res.send(content);
     doc.end();
  };
  fetchContent(resultCallback,domain);
}
else {
  var filename=req.body.filename2;
  var doc1 = new PDFDocument();
  doc1.pipe(fs.createWriteStream(path.resolve(".")+'/PDF/'+filename+'.pdf'));
  let resultCallback = function(content) {
    doc1.text(content+"<br>");
    console.log(content);
     res.json({content});
     //res.send(content);
     doc1.end();
  };
  fetchContent(resultCallback,domain);
  }

  //  doc.text(content,100,100);
  //  doc.fillColor("blue");
  //  doc.fontSize(25);
  // console.log("inside pdfGenrator");
  // res.json({content});

});

module.exports = router;
