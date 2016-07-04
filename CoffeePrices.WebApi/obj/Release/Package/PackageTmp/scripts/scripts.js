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

'use strict';

/**
 * @ngdoc function
 * @name coffeePricingApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the coffeePricingApp
 */
angular.module('coffeePricingApp')
    .controller('LoginCtrl', function ($scope, $window, visor, authService, $rootScope, $cookieStore) {
        $scope.login = function () {
            if (authService.credentialsValid($scope.username, $scope.password)) {
                var user = {username: $scope.username};
                $cookieStore.put('user', user);
                $rootScope.user = user;
                visor.setAuthenticated(user);
                $window.location.reload();
            }
        };
    });

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

'use strict';

/**
 * @ngdoc function
 * @name coffeePricingApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the coffeePricingApp
 */
angular.module('coffeePricingApp')
    .controller('NavCtrl', function ($scope, $window, $cookieStore, $rootScope, $route, visor, $location) {
            $scope.$route = $route;
            $scope.logout = function () {
                $cookieStore.remove('user');
                $rootScope.user = undefined;
                visor.setUnauthenticated();
                $location.url('/login');
                $window.location.reload();
        };
    });

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
