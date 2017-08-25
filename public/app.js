// include ngRoute for all our routing needs
    var albumApp = angular.module('albumApp', ['ngRoute']);

    // configure our routes
    albumApp.config(function($routeProvider) {
  $routeProvider

  // route for the home page
            .when('/', {
                templateUrl : 'views/home.html',
                controller  : 'mainCtrl'
            })

            .when('/songs', {
                templateUrl : 'views/song.html',
                controller  : 'mainCtrl'
            })

            });

    // create the controller and inject Angular's $scope
 albumApp.controller('mainCtrl', function($scope, $http) {
 	$scope.formData = {};

 	$scope.albums = [];

    // Cuando se cargue la página, pide del API todos los Albums
    $http({
      method: 'GET',
      url: '/api/albums'
    }).then(function (data){
      $scope.albums = data;
	  console.log(data);
    },function (error){
     console.log('Error: ' + data);
    });

    // Cuando se añade un nuevo album, manda el texto a la API
	$scope.createAlbum = function(){
		$http({
         method: 'POST',
         url: '/api/albums',
         data    : $scope.formData,
        }).then(function (data){
		  $scope.formData = {};
		  $scope.albums = data;
		   console.log(data);
		}),function (error){
          console.log('Error: ' + data);
        };
	};

	// Borra un album despues de checkearlo como acabado
	$scope.deleteAlbum = function(id) {
		$http.delete('/api/albums/' + id)
			.success(function(data) {
				$scope.albums = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};
	
  });

   // create the controller and inject Angular's $scope
 albumApp.controller('songCtrl', function($scope, $http) {
 	$scope.formData = {};

 	$scope.songs = [];

    // Cuando se cargue la página, pide del API todos las Canciones
    $http({
      method: 'GET',
      url: '/api/songs'
    }).then(function (data){
      $scope.songs = data;
	  console.log(data);
    },function (error){
     console.log('Error: ' + data);
    });

    // Cuando se añade una nueva cancion, manda el texto a la API
	$scope.createSongs = function(){
		$http({
         method: 'POST',
         url: '/api/songs',
         data    : $scope.formData,
        }).then(function (data){
		  $scope.formData = {};
		  $scope.songs = data;
		   console.log(data);
		}),function (error){
          console.log('Error: ' + data);
        };
	};

	// Borra una cancion despues de checkearlo como acabado
	$scope.deleteSongs = function(id) {
		$http.delete('/api/songs/' + id)
			.success(function(data) {
				$scope.songs = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};
	
  });
