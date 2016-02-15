 /* App Module */

var movieActorsApp = angular.module('movieActors', [
  'ngRoute',
  'ngMaterial',
  'ngMessages',
  //'movieActorsAnimations',
  'movieActorsControllers',
  'actorsServices',
  'moviesServices'
]);

movieActorsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/actors', {
        templateUrl: 'partials/actor-list.html',
        controller: 'ActorListCtrl'
      }).
      when('/actors/:actorId', {
        templateUrl: 'partials/actor-detail.html',
        controller: 'ActorDetailCtrl'
      }).
      otherwise({
        redirectTo: '/actors'
      });
}]);


movieActorsApp.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('orange');
});

/* Controllers */

var movieActorsControllers = angular.module('movieActorsControllers', []);

movieActorsControllers.controller('ActorListCtrl', ['$scope', 'ActorService',
  function($scope, ActorService) {
    $scope.submit = function(){
      $scope.loading = true;
      $scope.actors = ActorService.list({actorName: $scope.query}, function(){
        $scope.loading = false;
      });
    };
  }]);

movieActorsControllers.controller('ActorDetailCtrl', ['$scope', '$routeParams', 'MovieService',
  function($scope, $routeParams, MovieService) {
    $scope.movies = MovieService.list({actorId: $routeParams.actorId});
  }]);

/* Services */

var actorsServices = angular.module('actorsServices', ['ngResource']);
actorsServices.factory('ActorService', ['$resource',
  function($resource){
    return $resource('php/actors.php', {}, {
      list: {method:'GET', isArray:true, params:{actorName: ':actorName'}}
    });
  }]);

var moviesServices = angular.module('moviesServices', ['ngResource']);
moviesServices.factory('MovieService', ['$resource',
  function($resource){
    return $resource('php/movies.php', {}, {
      list: {method:'GET', isArray:true, params:{actorId: ':actorId'}},
    });
  }]);
