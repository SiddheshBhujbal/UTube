var express    = require('express'),
	app        = express(),
	bodyParser = require('body-parser'),
	request    = require('request'),
	axios      = require('axios');
    
//APP CONFIG
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//API KEY
var key = 'AAIzaSyBhoI2FGxLoWeb527r0VTQXCUK00Zt4mZk';

//ROOT ROUTE
app.get('/',function(req,res){
	res.redirect('/home')
})

//INDEX ROUTE
app.get('/home',function(req,res){
	res.render('home',{search:''})
})

//CREATE ROUTE
app.post('/home',function(req,res){
	var search = req.body.search
	axios.get('https://www.googleapis.com/youtube/v3/search?q='+search+'&part=snippet&type=video&key'+key)
	.then(function(search){
		res.render('home',{search:search})
	})
	.catch(function(error){
		res.send(error)
	})
	
})
	

//START THE SERVER
app.listen(3000,function(){
	console.log('Server Setup is done!!')
})