'use strict';

/**
 * @ngdoc function
 * @name techkidsWebApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the techkidsWebApp
 */
angular.module('techkidsWebApp')
  .controller('NavbarCtrl', function ($scope, authentication) {
    $scope.Logout = function () {
     authentication.ClearCredentials();
    }
  });
