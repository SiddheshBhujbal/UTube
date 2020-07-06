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
var key = 'AIzaSyC3viJ8zyI1Ngj-t7qoO18zz_XF9mRtn_s';

//ROOT ROUTE
app.get('/',function(req,res){
	res.redirect('/home')
})

//INDEX ROUTE
app.get('/home',function(req,res){
	var values = '';
		request('https://www.googleapis.com/youtube/v3/search?q='+values+'&part=snippet&type=video&maxResults=9&key='+key,function(err,response,body){
			if(!err && response.statusCode ==200){
				var result = JSON.parse(body) 
				res.render('home',{result: result.items})
			}else{
				console.log(err,response.statusCode)
				res.send('Error!')
			}
		})
	
})

//CREATE ROUTE
app.post('/home',function(req,res){
	var values = req.body.search;
	
		request('https://www.googleapis.com/youtube/v3/search?q='+values+'&part=snippet&type=video&maxResults=9&key='+key,function(err,response,body){
			if(!err && response.statusCode ==200){
				var result = JSON.parse(body) 
				res.render('home',{result: result.items})
			}else{
				console.log(err,response.statusCode)
				res.send('Error!')
			}
		})
	
})	
	

	

//START THE SERVER
app.listen(3000,function(){
	console.log('Server Setup is done!!')
})