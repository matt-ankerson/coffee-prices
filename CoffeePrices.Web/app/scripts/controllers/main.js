'use strict';

/**
 * @ngdoc function
 * @name coffeePricingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the coffeePricingApp
 */
angular.module('coffeePricingApp')
  .controller('MainCtrl', function ($scope, $window, $cookieStore, $rootScope, $route, visor, $location) {
      $scope.$route = $route;
        $scope.logout = function () {
        $cookieStore.remove('user');
            $rootScope.user = undefined;
            visor.setUnauthenticated();
            $location.url('/main');
            $window.location.reload();
        };
  });
