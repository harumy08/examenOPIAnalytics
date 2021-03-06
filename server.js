//server.js

var express 	= require('express');
var app 		= express();
var mongoose 	= require('mongoose');

// Conexión con la base de datos
mongoose.connect('mongodb://localhost:27017/musicAlbum');

// Configuración
app.configure(function() {
	// Localización de los ficheros estÃ¡ticos
	app.use(express.static(__dirname + '/public'));
	// Muestra un log de todos los request en la consola		
	app.use(express.logger('dev'));	
	// Permite cambiar el HTML con el método POST					
	app.use(express.bodyParser());
	// Simula DELETE y PUT						
	app.use(express.methodOverride());					
});

// Definición de modelos
var Album = mongoose.model('Album', {
	name: String,
	poster: String
});

// Definición de modelos
var Song = mongoose.model('Song', {
	name: String,
	poster: String
});

// Rutas de nuestro API
// GET de todos los Album
app.get('/api/albums', function(req, res) {				
	Album.find(function(err, albums) {
		if(err) {
			res.send(err);
		}
		res.json(albums);
	});
});

// GET de todos las canciones
app.get('/api/songs', function(req, res) {				
	Song.find(function(err, songs) {
		if(err) {
			res.send(err);
		}
		res.json(songs);
	});
});

// POST que crea un Album y devuelve todos tras la creación
app.post('/api/albums', function(req, res) {				
	Album.create({
		name: req.body.name,
		done: false
	}, function(err, album){
		if(err) {
			res.send(err);
		}

		Album.find(function(err, albums) {
			if(err){
				res.send(err);
			}
			res.json(albums);
		});
	});
});

// POST que crea una cancion y devuelve todas tras la creación
app.post('/api/songs', function(req, res) {				
	Song.create({
		name: req.body.name,
		done: false
	}, function(err, song){
		if(err) {
			res.send(err);
		}

		Song.find(function(err, songs) {
			if(err){
				res.send(err);
			}
			res.json(songs);
		});
	});
});

// DELETE un Album específico y devuelve todos tras borrarlo.
app.delete('/api/albums/:album', function(req, res) {		
	Album.remove({
		_id: req.params.album
	}, function(err, album) {
		if(err){
			res.send(err);
		}

		Album.find(function(err, albums) {
			if(err){
				res.send(err);
			}
			res.json(albums);
		});

	})
});

// DELETE un cancion específico y devuelve todos tras borrarlo.
app.delete('/api/songs/:song', function(req, res) {		
	Song.remove({
		_id: req.params.song
	}, function(err, song) {
		if(err){
			res.send(err);
		}

		Song.find(function(err, songs) {
			if(err){
				res.send(err);
			}
			res.json(songs);
		});

	})
});

//GET de cada album
//app.get('/api/albums:album', function(req, res) {
//Album.find({
	//  _id: req.params.album
	//}, function(err, album) {
	//	if(err){
		//	res.send(err);
		//}
		//res.json(album);
	// });
//});

// Carga una vista HTML simple donde irá nuestra Single App Page
// Angular Manejará el Frontend
app.get('*', function(req, res) {						
	res.sendfile('./public/index.html');				
});
// Escucha en el puerto 8080 y corre el server
app.listen(8080, function() {
	console.log('App listening on port 8080');
});