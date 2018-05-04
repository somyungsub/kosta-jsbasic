// 모듈을 추출합니다.
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var static = require('serve-static');
var path = require('path');
var dateutils = require('date-utils');



// 웹 서버를 생성합니다.
var app = express();
var router = express.Router();

app.use('/public', static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));




app.all('/data.json', function (request, response) {
    // html페이지에서 출력할 선수들의 정보를 저장한 배열을 선언합니다

    var runners = [
        {
            name: "홍길동",
            gender: "m",
            time: Math.floor(Math.random()*1000)
        },
        {
            name: "장동건",
            gender: "m",
            time: Math.floor(Math.random()*1000)
        } ,
        {
            name: "김태희",
            gender: "f",
            time: Math.floor(Math.random()*1000)
        },
        {
            name: "이보영",
            gender: "f",
            time: Math.floor(Math.random()*1000)
        }
    ];
    response.send(runners);
});



app.all('/time', function (request, response) {
     var now = new Date().toFormat("YYYY년MM월DD일 HH:MM:SS");

    // 응답합니다.
    response.send('<h1>' + now + '</h1>');
});





// start the server
app.listen(1337);
console.log('1337 is the magic port!');
console.log('Visit me at http://localhost:1337/public/index.html');