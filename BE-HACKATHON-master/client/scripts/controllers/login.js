  'use strict';

/**
 * @ngdoc function
 * @name techkidsWebApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the techkidsWebApp
 */
angular.module('techkidsWebApp')
  .controller('LoginCtrl', function ($scope, $location, authentication, toastr) {
    $scope.isLogin = true;

    $scope.formLogin = {};

    $scope.toSignIn = function () {
      $scope.isLogin = true;
    };

    $scope.toSignUp = function () {
      $scope.isLogin = false;
    };

    $scope.Login = function() {
      authentication.Login($scope.formLogin, function (message) {
        toastr.success(message);
        $location.path('/');
      })
    };

    $scope.SignUp = function() {
      $scope.formLogin.role = 'user';
      authentication.SignUp($scope.formLogin, function (message) {
        toastr.success(message);
        $location.path('/');
      })
    };

  });
