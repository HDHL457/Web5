'use strict';

/**
 * @ngdoc function
 * @name techkidsWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the techkidsWebApp
 */
angular.module('techkidsWebApp')
  .controller('MainCtrl', function ($rootScope, $http, authentication, $window, $scope, post, $uibModal) {

    $scope.page = 0;

    $scope.posts = post.getAll($scope.page, function (data) {
      $scope.posts = data;
    });

    $scope.loadmore = function () {
      $scope.page ++;
      post.getAll($scope.page, function (data) {
        if(data.length){
          data.forEach(function (item) {
            $scope.posts.push(item);
          });
        }
        else $scope.page --;
      });
    };

    $scope.openDetail = function (data) {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/detail-post.html',
        controller: 'ModalinstanceCtrl',
        resolve: {
          data: function () {
            return data;
          }
        }
      });
    };

  });

