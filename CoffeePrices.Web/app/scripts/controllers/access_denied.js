'use strict';

/**
 * @ngdoc function
 * @name coffeePricingApp.controller:AccessDeniedCtrl
 * @description
 * # AccessDeniedCtrl
 * Controller of the coffeePricingApp
 */
angular.module('coffeePricingApp')
  .controller('AccessDeniedCtrl', function ($scope, $routeParams) {
      $scope.prevUrl = $routeParams.prevUrl;
  });
