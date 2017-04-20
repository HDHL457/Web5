'use strict';

/**
 * @ngdoc service
 * @name techkidsWebApp.authentication
 * @description
 * # authentication
 * Service in the techkidsWebApp.
 */
angular.module('techkidsWebApp')
  .factory('authentication', function ($http, $cookies, $rootScope, toastr, $window) {
    var service = {};

    service.Login = Login;
    service.SignUp = SignUp;
    service.SetCredentials = SetCredentials;
    service.ClearCredentials = ClearCredentials;

    return service;

    function Login(data, callback) {

      $http.post('/users/login', data)
        .then(function (res) {
          if(res.data.status){
            SetCredentials(res.data.result);
            callback(res.data.message);
          }
          else{
            toastr.error(res.data.message, 'Error')
          }
        });

    }

    function SignUp(data, callback) {

      $http.post('/users/signup', data)
        .then(function (res) {
          if(res.data.status){
            toastr.success(res.data.message);
          }
          else{
            toastr.error(res.data.message, 'Error')
          }
        });

    }

    function SetCredentials(data) {
      console.log(data);
      $rootScope.globals = {
        user: {
          username: data.username,
          avatar: data.avatar,
          _id: data._id
        },
        token: data.token
      };

      // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
      // var cookieExp = new Date();
      // cookieExp.setDate(cookieExp.getDate() + 7);
      $cookies.putObject('globals', $rootScope.globals);
    }

    function ClearCredentials() {
      $rootScope.globals = {};
      $cookies.remove('globals');
      $http.defaults.headers.common.token = '';
      $window.location.reload();
    }
})
  .factory('httpRequestInterceptor', function ($rootScope) {
  return {
    request: function (config) {

      var token = $rootScope.globals.token;
      config.headers['token'] = token;
      return config;
    }
  };
});


