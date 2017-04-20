'use strict';

/**
 * @ngdoc service
 * @name techkidsWebApp.post
 * @description
 * # post
 * Service in the techkidsWebApp.
 */
angular.module('techkidsWebApp')
  .service('post', function ($http, toastr) {
    var post = [];

    post.getAll = function (page, cb) {
      var url = '/posts/newsfeed/' + page;
      $http.get(url).then(function (res) {
        if(res.data.status){
          cb(res.data.result)
        }
        else {
          toastr.error(res.data.message);
        }
      });
    };

    post.getOne = function (_id, cb) {
      var url = '/posts/' + _id;
      $http.get(url).then(function (res) {
        if(res.data.status){
          cb(res.data.result)
        }
        else {
          toastr.error(res.data.message);
        }
      });
    };

    post.postNew = function (data, cb) {
      $http.post('/posts/create', data).then(function (res) {
        if(res.data.status){
          toastr.success(res.data.message);
          cb(res.data.resutl)
        }
        else {
          toastr.error(res.data.message);
        }
      })
    };

    post.edit = function (data, cb) {
      $http.put('/posts/' + data._id , data).then(function (res) {
        if(res.data.status){
          toastr.success(res.data.message);
          cb(res.data.resutl)
        }
        else {
          toastr.error(res.data.message);
        }
      })
    };

    post.delete = function (_id, cb) {
      $http.delete('/posts/' + _id).then(function (res) {
        if(res.data.status){
          toastr.success(res.data.message);
          cb(res.data.resutl)
        }
        else {
          toastr.error(res.data.message);
        }
      })
    };

    post.like = function (_id, cb) {
      $http.post('/posts/'+_id + '/like').then(function (res) {
        if(res.data.status){
          toastr.success(res.data.message);
          cb(res.data.resutl)
        }
        else {
          toastr.error(res.data.message);
        }
      })
    };

    post.unlike = function (_id, cb) {
      $http.post('/posts/'+_id + '/unlike').then(function (res) {
        if(res.data.status){
          toastr.success(res.data.message);
          cb(res.data.resutl)
        }
        else {
          toastr.error(res.data.message);
        }
      })
    };

    post.comment = function (_id, data, cb) {
      $http.post('/posts/'+ _id + '/comments/create', data).then(function (res) {
        if(res.data.status){
          cb(res.data.result)
        }
        else {
          toastr.error(res.data.message);
        }
      })
    };

    post.deleteComment = function (_id, cb) {
      $http.delete('/posts/comments/' + _id).then(function (res) {
        if(res.data.status){
          toastr.success(res.data.message);
          cb(res.data.resutl)
        }
        else {
          toastr.error(res.data.message);
        }
      });
    };

    return post;
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
