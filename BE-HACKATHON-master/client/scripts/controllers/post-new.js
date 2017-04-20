'use strict';

/**
 * @ngdoc function
 * @name techkidsWebApp.controller:PostNewCtrl
 * @description
 * # PostNewCtrl
 * Controller of the techkidsWebApp
 */
angular.module('techkidsWebApp')
  .controller('PostNewCtrl', function ($scope, post, $routeParams, $location) {
    if($routeParams.id){
      $scope.type = 'edit';
      post.getOne($routeParams.id, function (res) {
        $scope.formData = res;
      });
    }
    else $scope.type = 'create';
    $scope.categories = ["Sports" , "Entertainments", "Music", "Relax", "Education", "Science"];
    $scope.formData = {};
    $scope.createPost = function () {
      if($scope.type == 'edit'){
        post.edit($scope.formData, function (mesage) {
          $location.path("/");
        });
      }
      else {
        post.postNew($scope.formData, function (mesage) {
          $location.path("/");
        });
      }
    }
  });
