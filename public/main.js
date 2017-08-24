angular.module('examen', []);
function mainController($scope, $http) {
	$scope.formData = {};

	// Cuando se cargue la página, pide del API todos los Albums
	$http.get('/api/albums')
		.success(function(data) {
			$scope.albums = data;
			console.log(data)
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// Cuando se añade un nuevo album, manda el texto a la API
	$scope.createAlbum = function(){
		$http.post('/api/albums', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.albums = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};

	// Borra un album despues de checkearlo como acabado
	$scope.deleteAlbum = function(id) {
		$http.delete('/api/album' + id)
			.success(function(data) {
				$scope.albums = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};
}