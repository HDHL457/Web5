'use strict';

/**
 * @ngdoc function
 * @name techkidsWebApp.controller:ModalinstancectrlCtrl
 * @description
 * # ModalinstancectrlCtrl
 * Controller of the techkidsWebApp
 */
angular.module('techkidsWebApp')
  .controller('ModalinstanceCtrl', function ($uibModalInstance, data, $scope, post, $rootScope, $window) {
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.formData = {};

    post.getOne(data._id, function (res) {
      $scope.data = res;
    });

    $scope.comment = function (_id) {
      post.comment(_id, $scope.formData, function (res) {
        var newComment = res;
        newComment.author = $rootScope.globals.user;
        $scope.data._comments.push(newComment);
        $scope.formData.content = '';
      });
    };

    $scope.like = function (_id) {
      post.like(_id, function () {
        $scope.data.is_like = true;
        $scope.data.like_number ++ ;
      })
    };

    $scope.unlike = function (_id) {
      post.unlike(_id, function () {
        $scope.data.is_like = false;
        $scope.data.like_number -- ;
      })
    };

    $scope.delete = function(_id){
      post.delete(_id, function () {
        $window.location.reload();
      })
    };

    $scope.deleteComment = function (item) {
      post.deleteComment(item._id, function () {
        $scope.data._comments.splice($scope.data._comments.indexOf(item), 1);
      });
    };

  });

