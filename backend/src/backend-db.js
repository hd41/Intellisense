var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/intellisense', {useNewUrlParser: true});

var questionSchema = new mongoose.Schema({ question: 'string', asked_by: 'string', timestamp:'number' });
var Question = mongoose.model('Question', questionSchema);

var answerSchema = new mongoose.Schema({  q_id: 'number', response: 'string' , responder: 'string', mobile: 'string'});
var Answer = mongoose.model('Answer', answerSchema);

var userSchema = new mongoose.Schema({  name: 'string', username: 'string' , mobile: 'string', password: 'string'});
var User = mongoose.model('User', userSchema);

module.exports.addQuestion = (date_now, question, asked_by) => {
  var question = new Question({ question : question, asked_by: asked_by, timestamp: date_now});

  question.save(function(err){
      if (err) throw err;
      console.log('Question saved.');
      return date_now;
  });
}

module.exports.addAnswer = (q_id, response, responder, mobile) => {
  console.log(q_id+" : "+mobile);
  var answer = new Answer({ q_id: q_id, response: response, responder: responder, mobile: mobile });

  answer.save(function(err){
    if(err) throw err;
    console.log('Response saved.');
  });
}

module.exports.addUser = (req, res, name, username, password, mobile) => {
  var user = new User({ name: name, username: username, mobile: mobile, password: password });

  user.save(function(err,doc_saved){
    if(err) throw err;
    res.send('{"message":"'+doc_saved.id+'"}');
  });
}

module.exports.login = (req, res, username, password) => {
  var user = User.findOne({ username : username, password: password }).exec(function(err, result){
    if(err) throw reject(err);
    else{
      res.send('{"message":"success:'+result.id+'"}');
    }
  });
}



module.exports.findLatestQuestion = () => {
  return new Promise(function(resolve, reject){
    Question.findOne({}).sort({timestamp: -1 }).exec(function(err, res){
        if(err) throw reject(err);
        else resolve(res);
    });
  });
}

module.exports.findLatestQuestionByUserID = (u_id) => {
  return new Promise(function(resolve, reject){
    Question.find({ asked_by: u_id }).sort({timestamp: -1}).exec(function(err, res){
        if(err) throw reject(err);
        else{
          resolve(res);
        }
    });
  });
}

module.exports.findUser = (u_id, password) => {
  return new Promise(function(resolve, reject){
    console.log("in backend-db"+u_id+" : "+password);
    User.findOne({ _id: u_id, password: password }).exec(function(err, res){
        if(err) throw reject(err);
        else{
          resolve(res);
        }
    });
  });
}

module.exports.findLatestResponses = (q_id) => {
  return new Promise(function(resolve, reject){
    Answer.find({ q_id: q_id }).exec(function(err, res){
        if(err) throw reject(err);
        else{
          resolve(res);
        }
    });
  });
}

// add Question to the database
// function addQuestion(question, asked_by){
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("intellisense");
//     var date_now = (Date.now());
//     q_id = date_now;
//     question = question;
//     var myobj = { _id: date_now, question: question, asked_by: asked_by, timestamp: date_now };
//     dbo.collection("questions").insertOne(myobj, function(err, result) {
//       if (err) throw err;
//       console.log("1 question inserted");
//       db.close();
//     });
//   });
// }

// add Answer to the DB
// function addAnswer(response, responder){
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("intellisense");
//     var myobj = { q_id: q_id, response: response , responder: responder};
//     dbo.collection("answers").insertOne(myobj, function(err, result) {
//       if (err) throw err;
//       console.log("1 response inserted");
//       db.close();
//     });
//   });
// }
