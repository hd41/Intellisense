var express = require('express');
var app     = express();
var server  = app.listen(3000,'192.168.43.234');
var io      = require('socket.io').listen(server);
var cors    = require('cors');
var bodyParser = require('body-parser');
var dbConn = require('./backend-db');
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
var http = require('http');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cors({
    origin: '*',
    credentials: true,
}));

const documents = {};

var q_id = '0';
var question = 'ads';
var responses = [];

dbConn.findLatestQuestion().then(function(result){
  question = result.question;
  q_id = result.timestamp;
  dbConn.findLatestResponses(q_id).then(function(result){
    responses = result.slice(0);
    console.log(question+" :- "+q_id+" :- "+responses);
  });
});

io.on("connection", socket => {
  let previousId;
  dbConn.findLatestQuestion().then(function(result){
    question = result.question;
    q_id = result.timestamp;
    dbConn.findLatestResponses(q_id).then(function(result){
      responses = result.slice(0);
      console.log(question+" :- "+q_id+" :- "+responses);
    });
  });

  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId);
    previousId = currentId;
  };

  socket.on("message", doc => {
    io.emit("documents", Object.keys(documents));
    socket.emit("document", doc);
  });

  socket.on("editDoc", doc => {
    documents[doc.id] = doc;
    socket.to(doc.id).emit("document", doc);
  });


  io.emit("message",question);
  io.emit("response", "$");
  for(var i=0; i < responses.length; i++){
    let responder = responses[i].responder;
    let resp = responses[i].response;
    io.emit("response",responder+":"+resp);
  }

  console.log("emitted");
});

app.post('/resp',(req, res) => {
  var responder = req.body.responder;
  var resp = req.body.response;
  var mobile = req.body.mobile;
  dbConn.addAnswer(q_id,resp, responder,mobile);
  // var scoreResponse = getScore(resp);
  io.emit("response",responder+":"+resp);
  res.send('{"message":"success"}');
});

app.get('/get_latest_ques',(req,res)=>{
  res.send('{"message": "'+question+'"}');
});

app.post('/post_new_ques', function (req, res) {
  var uname = req.body.askedBy;
  var ques = req.body.message;
  if(ques == null){
    question = "No Question present!!"
  }else{
    question = ques;
    q_id = (Date.now());
    dbConn.addQuestion(q_id, ques, uname);
  }
  io.emit("response","$");
  io.emit("message",question);
  res.send('{"message": "success"}');
});


// probably be getting the last question
app.get('/getQuestion', function(req, res){
  MongoClient.connect(url, function(err, db) {
    console.log('connected to DB');
    if (err) throw err;
    var dbo = db.db("intellisense");
    dbo.collection("questions").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  });
});








/* for Sentiment Analysis */
function getScore(sentence){
  var requestURL = "http://localhost:5000/getScore?sentence="+sentence;
  console.log(requestURL);
  http.get("http://localhost:5000/getScore?sentence="+sentence, function(response) {
      // res.write(response);
      console.log(response);
      return response;
  }).on('end', function() {
      res.end();
  });
}

app.post('/getScore', function(req, res){
  console.log("in GetScore");
  var sentence = req.body.response;
  console.log(""+sentence);
  http.get("http://localhost:5000/getScore?sentence="+sentence, function(response) {
      res.write(response);
  }).on('end', function() {
      res.end();
  });
  res.end();
});
