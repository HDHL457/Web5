'use strict';

/**
 * @ngdoc overview
 * @name techkidsWebApp
 * @description
 * # techkidsWebApp
 *
 * Main module of the application.
 */
angular
  .module('techkidsWebApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'toastr',
    'ngFileUpload',
    'ngBootbox',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {

    $httpProvider.interceptors.push('httpRequestInterceptor');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/login', {
        controller: 'LoginCtrl',
        templateUrl: 'views/login.html',
        controllerAs: 'login'
      })
      .when('/post-new/:id?', {
        templateUrl: 'views/post-new.html',
        controller: 'PostNewCtrl',
        controllerAs: 'postNew'
      })
      .otherwise({
        redirectTo: '/'
      });
    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });

  })
  .run(function ($rootScope, $location, $anchorScroll, $routeParams, $cookies, $http) {
    $rootScope.globals = $cookies.getObject('globals') || {};
    if ($rootScope.globals.user) {
      $http.defaults.headers.common['token'] = $rootScope.globals.token;  //gửi token với mỗi request
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {      //check xem đã login chưa, nếu chưa chuyển tới /login
      // redirect to login page if not logged in and trying to access a restricted page
      var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
      var loggedIn = $rootScope.globals.user;
      if (restrictedPage && !loggedIn) {
        $location.path('/login');
      }
    });

    $rootScope.$on('$routeChangeSuccess', function (newRoute, oldRoute) {
      $location.hash($routeParams.scrollTo);
      $anchorScroll();
    });
  });
