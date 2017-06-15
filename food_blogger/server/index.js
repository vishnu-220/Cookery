
var express = require( "express" );
var http    = require( "http" );
var mysql = require('mysql');
var app      = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser()); 


app.use(session({secret: "vishnu", saveUninitialized : true, resave : true}));

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'cook'
});
var response = {};


app.use( express.static( __dirname  + '/../client' ) );
console.log(__dirname);
//Defining Routing logic

app.get('/login/:name/:password',function(req,res){
	
	var data={
	 username:req.params.name,
	 password:req.params.password
	};
	
	try {
		
		connection.query('SELECT confirmpwd FROM userinfo WHERE	username = ? ', data.username,function(err, rows, fields) {
				
			if (err)
				console.log('Error: '+err);
			if(!rows.length) {
				rows = {};
				rows.responseMessage = 'invalid_user';
				rows.responseStatus = 200;
			}
			else if(rows[0].confirmpwd == data.password){
				
				rows.responseMessage="valid_user";
				req.session.userName = data.username;
				console.log(req.session.userName);
			}
			res.status(200).send(rows.responseMessage);
		});
	} catch(err) {
		console.log('User Login Error:', err);
		response.responseMessage = 'User Login Error';
		response.responseStatus  = 500; 
		res.send(response);
	}

	});
// app.get('/homePage/:name',function(req,res){
	

// });
app.get('/getUsername',function(req,res,next){
	res.status(200).send('Hi ' + "<b>"+(req.session.userName == undefined?"NOT FOUND":req.session.userName)+"</b>"+'!!!');

});

app.get('/signup/:username/:newpassword/:confirmpassword',function(req,res){
	
	try {
		var post  = { username: req.params.username, newpwd: req.params.newpassword, confirmpwd: req.params.confirmpassword};

		connection.query('INSERT INTO userinfo SET ?', post, function(err, result) {
			if (err)
				console.log('Error: '+err);
			else{
				console.log("User added");
				var text="ok";
				res.status=200;
			}
			res.send(text);

		});
	} catch(err) {
		console.log('User cannot be created');
		response.responseMessage = 'db inserting error';
		response.responseStatus  = 500; 
		res.send(response);
	}

});
app.get('*', function (req,res){
	res.send('Error: 404, Page not found<br>For your request');
});



app.listen(3000, function() {
   console.log('Express server listening on port ' ,3000);
} );