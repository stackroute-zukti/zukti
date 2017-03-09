module.exports = function(sentence) {
    let nlp = require('nlp_compromise');
    let keywordLexicon = require('../../../lexicon/keywordLexicon.json');
    let intentLexicon = require('../../../lexicon/intentLexicon.json');
    /* @yuvashree: fetching the types from the Lexicons */
    let typeLexicon = require('../../../lexicon/typeLexicon.json');
    //  console.log(intentLexicon);
    let str = nlp.text(sentence);
    // split str into individual words
    let tokens = str.root().split(' ');
    // keywords array will contain keywords extracted from question
    let keywords = [];
    // intent array will contain intents extracted from question
    let intents = [];
    /* @yuvashree: type array will contain types extracted from question */
    let types = [];
    /* iterate over the tokens and search for keywords and intents (if a given token
    is keyword or intent then check the next words for kwyword or intent)*/
    for (let i = 0; i < tokens.length; i = i + 1) {
        let keyword = [];
        let intent = [];
        let type = [];
        for (let m = 0; m < intentLexicon.length; m = m + 1) {
            let splitIntent = intentLexicon[m].split(' ');
            if (splitIntent[0] === tokens[i]) {
                let intentPhraseLength = 1;
                for (let n = 1; n < splitIntent.length && i + 1 < tokens.length; n = n + 1) {
                    if (tokens[i + n] === splitIntent[n]) {
                        intentPhraseLength = intentPhraseLength + 1;
                    } else {
                        break;
                    }
                }
                if (intentPhraseLength === splitIntent.length) {
                    intent = splitIntent;
                }
            }
        }
        if (intent.length !== 0) {
            i = i + intent.length - 1;
            intents.push(intent.join(' '));
            // if intent found skip this iteration
            continue;
        }
        for (let j = 0; j < keywordLexicon.length; j = j + 1) {
            let splitkeyword = keywordLexicon[j].split(' ');
            if (splitkeyword[0] === tokens[i]) {
                let phraseLength = 1;
                for (let k = 1; k < splitkeyword.length && i + 1 < tokens.length; k = k + 1) {
                    if (tokens[i + k] === splitkeyword[k]) {
                        phraseLength = phraseLength + 1;
                    } else {
                        break;
                    }
                }
                if (phraseLength === splitkeyword.length) {
                    keyword = splitkeyword;
                }
            }
        }
        if (keyword.length !== 0) {
            i = i + keyword.length - 1;
            keywords.push(keyword.join(' '));
        }
        /* @yuvashree: iterate over the tokens and find the types that user requests */
        for (let y = 0; y < typeLexicon.length; y = y + 1) {
            let splittype = typeLexicon[y].split(' ');
            if (splittype[0] === tokens[i]) {
                let typephraseLength = 1;
                if (typephraseLength === splittype.length) {
                    type = splittype;
                }
            }
        }
        if (type.length !== 0) {
            i = i + type.length - 1;
            types.push(type.join(' '));
        }
    }
    return {keywords, intents, types};
};
