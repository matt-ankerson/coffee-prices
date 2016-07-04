'use strict';

/**
 * @ngdoc overview
 * @name coffeePricingApp
 * @description
 * # coffeePricingApp
 *
 * Main module of the application.
 */
angular
  .module('coffeePricingApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'visor'
  ])
  .config(function (visorProvider, $routeProvider) {
    visorProvider.authenticate = function ($cookieStore, $q, $rootScope) {
        var user = $cookieStore.get('user');
        if (user) {
            $rootScope.user = user;
                return $q.when(user);
        } else {
            return $q.reject(null);
        }
    };
    visorProvider.doOnNotAuthorized = function ($location, restrictedUrl) {
        $location.url('/access_denied?prevUrl=' + encodeURIComponent(restrictedUrl));
    };
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        restrict: function (user) {
            return user === undefined;
        },
        controllerAs: 'login'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        restrict: function (user) {
            return !!user;
        },
        controllerAs: 'main'
      })
      .when('/access_denied', {
        templateUrl: 'views/access_denied.html',
        controller: 'AccessDeniedCtrl',
        controllerAs: 'access_denied'
      })
      .when('/', {
        redirectTo: '/main'
      })
      .otherwise({
        redirectTo: '/main'
      });
  });
