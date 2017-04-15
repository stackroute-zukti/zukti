const userAddMicroservice = require('seneca')();

let processQuestion = require('./processQuestion');

userAddMicroservice.add({
    role: 'questionprocessing',
    cmd: 'process'
}, function(msg, done) {
    console.log('into seneca now...');

    let sentence = msg.lowerCaseNewQuestion;
    let intentLexicon = msg.intentLexicon;
    let keywordLexicon = msg.keywordLexicon;
    let typeLexicon = msg.typeLexicon;

    console.log('sentence: ', sentence);
    console.log('intentLexicon: ', intentLexicon);
    console.log('keywordLexicon: ', keywordLexicon);
    console.log('typeLexicon: ', typeLexicon);

    done(null, processQuestion(sentence, intentLexicon, keywordLexicon, typeLexicon));
});

/*ToDO: Move IP and Port to config*/
userAddMicroservice.listen({host: '127.0.0.1', port: '3000'});
