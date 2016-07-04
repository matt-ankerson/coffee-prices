'use strict';

/**
 * @ngdoc function
 * @name coffeePricingApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the coffeePricingApp
 */
angular.module('coffeePricingApp')
    .controller('NavCtrl', function ($scope, $cookieStore, $rootScope, $route, visor, $location) {
            $scope.$route = $route;
            $scope.logout = function () {
                $cookieStore.remove('user');
                $rootScope.user = undefined;
                visor.setUnauthenticated();
                $location.url('/home');
        };
    });
