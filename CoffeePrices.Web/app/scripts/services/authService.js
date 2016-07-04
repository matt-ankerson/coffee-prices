/* global angular */
'use strict';

/**
 * @ngdoc service
 * @name coffeePricingApp.service:AuthService
 * @description
 * # authService
 * Service in the coffeePricingApp
 */
angular.module('coffeePricingApp')
    .service('authService', function() {
    
    this.username = 'username';
    this.password = 'password';

    this.credentialsValid = function(user, pass) {
        if ((this.username === user) && (this.password === pass)) {
            return true;
        }
        else {
            return false;
        }
    };
});
