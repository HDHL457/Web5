'use strict';

/**
 * @ngdoc directive
 * @name techkidsWebApp.directive:navbar
 * @description
 * # navbar
 */
angular.module('techkidsWebApp')
  .directive('navbar', function () {
    return {
      templateUrl:'../../views/navbar.html',
      restrict: 'E',
      controller: 'NavbarCtrl',
      link: function(scope, element) {
      }
    }
  });
