const { application } = require('express');
var express = require('express');
var mysql = require('mysql');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'kayttaja',
    password: 'kayttaja',
    database: 'peli'

});



connection.connect(function(error){
    if(error) {
        console.log('Error');
    } else {
        console.log('connected');
    }

});


app.use(express.static(__dirname + '/views'));

app.get('/', function(request, response) {     response.sendFile(path.join(__dirname + '/OTT_TT_nayttosivu3.html')); });


app.post('/', function(request, response) {

    let tulos= '';

        connection.query("SELECT * FROM pelaajat", function(error, results, fields) {
            console.log(results);
            tulos = results;
        response.send(results);
        response.end();
    });       
            
});    
            

app.listen(3000);