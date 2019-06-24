var express = require('express');
var app     = express();
var server  = app.listen(3000,'192.168.43.234');
var io      = require('socket.io').listen(server);
var cors    = require('cors');
var bodyParser = require('body-parser');
var dbConn = require('./backend-db');

var http = require('http');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cors({
    origin: '*',
    credentials: true,
}));

const documents = {};

var responses = [];

io.on("connection", socket => {
  let previousId;

  socket.on("message", doc => {
    doc = JSON.parse(doc);
    u_id = doc.message;
    dbConn.findLatestQuestionByUserID(u_id).then(function(result){
      let q_id = result[0].timestamp;
      if(result.length == 0){
        socket.emit("message","Ask moderator to put Question:"+u_id);
      }else{
        socket.emit("message", result[0].question+":"+u_id);
      }
      dbConn.findLatestResponses(q_id).then(function(result){
        responses = result.slice(0);
        io.emit("response", "$");
        for(var i=0; i < responses.length; i++){
          let responder = responses[i].responder;
          let resp = responses[i].response;
          io.emit("response",responder+":"+resp+":"+u_id);
        }
      });
    });
    // socket.emit("document", doc);
  });

  socket.on("editDoc", doc => {
    documents[doc.id] = doc;
    socket.to(doc.id).emit("document", doc);
  });

});

app.post('/register', (req,res) => {
  var name = req.body.name;
  var username = req.body.username;
  var password = req.body.password;
  var mobile = req.body.mobile;

  dbConn.addUser(req, res, name,username, password,mobile);

});

app.post('/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  dbConn.login(req, res, username, password);

});

app.post('/resp',(req, res) => {
  var q_id = req.body.q_id;
  var responder = req.body.responder;
  var resp = req.body.response;
  var mobile = req.body.mobile;
  var token = req.body.token;

  dbConn.addAnswer(q_id,resp, responder,mobile);
  // var scoreResponse = getScore(resp);
  io.emit("response",responder+":"+resp+":"+token);
  res.send('{"message":"success"}');
});

app.get('/get_latest_ques',(req,res)=>{
  console.log(req.query.token);
  dbConn.findLatestQuestionByUserID(req.query.token).then(function(result){
    q_id = result.timestamp;
    if(result.length == 0){
      res.send('{"message": "No Question present"}');
    }else{
      res.send('{"q_id":"'+result[0].timestamp+'","message": "'+result[0].question+'"}');
    }
  });

});

app.post('/post_new_ques', function (req, res) {
  var uname = req.body.askedBy;
  var ques = req.body.message;
  var password = req.body.password;

  dbConn.findUser(uname, password).then(function(result){
    console.log("result: "+result);
    if(result != null ){
      question = ques;
      q_id = (Date.now());
      dbConn.addQuestion(q_id, ques, uname);

      io.emit("response","$");
      io.emit("message",question+":"+uname);
      res.send('{"message": "success"}');

    }else{
      res.send('{"message": "failure"}');
    }
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
