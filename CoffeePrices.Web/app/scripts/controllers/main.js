'use strict';

/**
 * @ngdoc function
 * @name coffeePricingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the coffeePricingApp
 */
angular.module('coffeePricingApp')
  .controller('MainCtrl', function ($scope, $window, $cookieStore, $rootScope, $route, visor, $location, $http) {
      
      // Request coffee price data.
      $http({
          url: 'https://www.quandl.com/api/v3/datasets/ODA/PCOFFOTM_USD.json?api_key=6o623SPMQGmieHAxPjLE',
          method: 'GET'
      })
      .then(function(response) { 
          if (!response) {return;}
          var labels = [];
          var data = [];
          response.data.dataset.data.map(function(item){
              labels.push(item[0]);
              data.push(item[1]);
          });

          // Set up graph
          $scope.labels = labels.slice(0, 12).reverse();
          $scope.series = ['Price at End of Month'];
          $scope.data = [data.slice(0, 12).reverse()];

          $scope.options = {
              animation: false,
              bezierCurve: false
          };
          $scope.legend = true;

          $scope.dataTitle = response.data.dataset.name;
          $scope.description = response.data.dataset.description;
      });

});
