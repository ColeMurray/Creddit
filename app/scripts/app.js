'use strict';

/**
 * @ngdoc overview
 * @name credditApp
 * @description
 * # credditApp
 *
 * Main module of the application.
 */
angular
  .module('credditApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .constant('FIREBASE_URL', 'https://creddit.firebaseio.com/')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/posts.html',
        controller: 'PostCtrl'
      })
      .when('/posts/:postId', {
        templateUrl: 'views/showposts.html',
        controller: 'PostViewCtrl'
      })
      .when('/register', {
        templateUrl:'views/register.html',
        controller:'AuthCtrl',
        resolve:{
          user: function(Auth){
            return Auth.resolveUser();
          }
        }
      })
      .when('/login', {
        templateUrl:'views/login.html',
        controller:'AuthCtrl',
        resolve:{
          user: function(Auth){
            return Auth.resolveUser();
          }
        }
      })
      .when('/user/:userId', {
        templateUrl: 'views/profile.html',
        controller: 'AuthCtrl',
        resolve:{
            user: function(Auth){
              return Auth.resolveUser();
            }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
