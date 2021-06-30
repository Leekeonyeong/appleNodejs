const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs');

var db;
var date;
MongoClient.connect('mongodb+srv://dbadmin:1q2w3e4r@cluster0.tunop.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function(에러, client){
    if(에러) {return console.log(에러)}

    db = client.db('todoapp');

   
    app.listen(8080, function(){
        console.log('listening on 8080');
    });
})



app.get('/write', function(요청, 응답){
    응답.sendFile(__dirname + '/write.html')
})

app.get('/', function(요청, 응답){
    응답.sendFile(__dirname + '/index.html')
})

app.post('/add', function(요청, 응답){
    date = new Date();
    db.collection('post').insertOne({제목 : 요청.body.todoTitle, 내용 : 요청.body.todoContent, 일시 : date.getFullYear() + '년 ' + (date.getMonth()+1) + '월 ' + date.getDate() + '일'}, function(에러, 결과){
        console.log('전송완료')
    });
})

app.get('/list', function(요청, 응답){
    응답.render('list.ejs');
})