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
	text: String
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

//GET de cada album
app.get('/api/album:album', function(req, res) {
Album.find({
		_id: req.params.album
	}, function(err, album) {
		if(err){
			res.send(err);
		}
		res.json(album);
	  });
});

// POST que crea un Album y devuelve todos tras la creación
app.post('/api/albums', function(req, res) {				
	Album.create({
		text: req.body.text,
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

// Carga una vista HTML simple donde irá nuestra Single App Page
// Angular Manejará el Frontend
app.get('*', function(req, res) {						
	res.sendfile('./public/index.html');				
});
// Escucha en el puerto 8080 y corre el server
app.listen(8080, function() {
	console.log('App listening on port 8080');
});