'use strict';

/**
 * @ngdoc function
 * @name coffeePricingApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the coffeePricingApp
 */
angular.module('coffeePricingApp')
    .controller('LoginCtrl', function ($scope, visor, authService, $rootScope, $cookieStore) {
        $scope.login = function () {
            if (authService.credentialsValid($scope.username, $scope.password)) {
                var user = {username: $scope.username};
                $cookieStore.put("user", user);
                $rootScope.user = user;
                visor.setAuthenticated(user);
            }
        };
    });
