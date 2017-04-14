const express = require('express');
let app = express();

var router = express.Router();

app.use(router);

// config DB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/web5');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error: '));
db.once('open', function() {
console.log('DB connection success! ');
});
//TODO

var schema = mongoose.Schema({
	testId : Number,
	content : String,
	sections : [{
		sectionId : Number,
		testId : Number,
		purpose : String,
		content : String,
		parts : [{
			partId : Number,
			sectionId : Number,
			testId : Number,
			purpose : String,
			tent : String,
			questions : [{
				part : Number,
				section : Number,
				test : Number,
				answers : [{
					value : String,
					label : String
				}],
				correctAnswers :[String],
				content : String,
				type :{type: String},
				questionId : Number
			}]
		}]
	}]
})

var Test = mongoose.model('Test', schema);

var test1 = new Test({
    "testId": "1",
    "content": "This part contains two sections. Please mark your answer on the answer sheet at the last page.",
    "sections": [{
        "sectionId": "1",
        "testId": "1",
        "purpose": "READING AND GRAMMAR TEST",
        "content": "",
        "parts": [{
            "partId": "1",
            "sectionId": "1",
            "testId": "1",
            "purpose": "Circle the letter (A, B, C or D) next to the word or phrase which best completes each sentence.",
            "tent": "",
            "questions": [{
                "part": "1",
                "section": "1",
                "test": "1",
                "answers": [{
                    "value": "A",
                    "label": "a revision"
                }, {
                    "value": "B",
                    "label": "a control"
                }, {
                    "value": "C",
                    "label": "an investigation"
                }, {
                    "value": "D",
                    "label": "a check-up"
                }],
                "correctAnswers": [
                    "A"
                ],
                "content": "It/'s a good idea to see your doctor regularly for ................... .",
                "type": "single",
                "questionId": "1"
            }, {
                "part": "1",
                "section": "1",
                "test": "1",
                "answers": [{
                    "value": "A",
                    "label": "product"
                }, {
                    "value": "B",
                    "label": "outcome"
                }, {
                    "value": "C",
                    "label": "amount"
                }, {
                    "value": "D",
                    "label": "crop"
                }],
                "correctAnswers": [
                    "B"
                ],
                "content": "Last year the potato harvest was very disappointing, but this year it looks as though we shall have a better ...................",
                "type": "single",
                "questionId": "2"
            }, {
                "part": "1",
                "section": "1",
                "test": "1",
                "answers": [{
                    "value": "A",
                    "label": "signal"
                }, {
                    "value": "B",
                    "label": "warning"
                }, {
                    "value": "C",
                    "label": "shot"
                }, {
                    "value": "D",
                    "label": "show"
                }],
                "correctAnswers": [
                    "C"
                ],
                "content": "When the starter gave the ................... all the competitors in the race began to run round the track.",
                "type": "single",
                "questionId": "3"
            }]
        }, {
            "partId": "2",
            "sectionId": "1",
            "testId": "1",
            "purpose": "Use the correct forms of the verbs in the brackets to complete the passage below.",
            "tent": "I (write) (16) ............to express my dissatisfaction of my stay at the Lord Hotel in London last weekend. I (book) (17) ............... the hotel in Sweden and also (receive) (18) ...........",
            "questions": [{
                "part": "2",
                "section": "1",
                "test": "1",
                "answers": [],
                "correctAnswers": [
                    "w"
                ],
                "content": "",
                "type": "fill",
                "questionId": "1"
            }, {
                "part": "2",
                "section": "1",
                "test": "1",
                "answers": [],
                "correctAnswers": [
                    "b"
                ],
                "content": "",
                "type": "fill",
                "questionId": "2"
            }, {
                "part": "2",
                "section": "1",
                "test": "1",
                "answers": [],
                "correctAnswers": [
                    "r"
                ],
                "content": "",
                "type": "fill",
                "questionId": "3"
            }]
        }, {
            "partId": "3",
            "sectionId": "1",
            "testId": "1",
            "purpose": "Read the passage carefully and choose the best answer to the questions below:",
            "tent": "During the teenage years, many young people can at times be difficult to talk to.",
            "questions": [{
                "part": "2",
                "section": "1",
                "test": "1",
                "answers": [{
                    "value": "A",
                    "label": "handbook for parents"
                }, {
                    "value": "B",
                    "label": "school timetable"
                }, {
                    "value": "C",
                    "label": "teenage magazine."
                }, {
                    "value": "D",
                    "label": "book for children"
                }],
                "correctAnswers": [
                    "A",
                    "B"
                ],
                "content": "This passage is taken from a",
                "type": "multiple",
                "questionId": "1"
            }, {
                "part": "2",
                "section": "1",
                "test": "1",
                "answers": [{
                    "value": "A",
                    "label": "because most teenagers are quiet"
                }, {
                    "value": "B",
                    "label": "because teenagers don't want to talk to other people."
                }, {
                    "value": "C",
                    "label": "because teenagers think adults are trying to check up on them."
                }, {
                    "value": "D",
                    "label": "because most teenagers hate adults."
                }],
                "correctAnswers": [
                    "B",
                    "C"
                ],
                "content": "Why do adults sometimes find teenagers difficult to talk to?",
                "type": "multiple",
                "questionId": "2"
            }, {
                "part": "2",
                "section": "1",
                "test": "1",
                "answers": [{
                    "value": "A",
                    "label": "When people talk to them because they are really interested and not just checking on them."
                }, {
                    "value": "B",
                    "label": "When adults give them a lot money to spend."
                }, {
                    "value": "C",
                    "label": "When adults talk to them about something other than their work in school."
                }, {
                    "value": "D",
                    "label": "When adults talk to them about sex, alcohol and drugs."
                }],
                "correctAnswers": [
                    "C",
                    "D"
                ],
                "content": "When can you expect young people to be more talkative than usual.",
                "type": "multiple",
                "questionId": "3"
            }]
        }]
    }]
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});

test1.save(function(err) {
	if(err){
		console.log(err);
	} else {
		console.log('long');
	}
});

Test.findOne({_id : 0 , __v : 0}).then(function(data){
	console.log(data.sections);
})

app.use(express.static('./client'));

router.get('/test', function(req, res){
	Test.findOne(function(data){
		res.json(data)
	})
});

router.get('/', function(req, res){
	res.sendFile(__dirname + '../client/index.html');
});

// app.listen(8888);
var server = app.listen(8080, function(){
  console.log('Server run at locallhost:8080');
})
