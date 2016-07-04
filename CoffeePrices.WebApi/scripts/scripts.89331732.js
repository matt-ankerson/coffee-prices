"use strict";angular.module("coffeePricingApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","visor"]).config(["visorProvider","$routeProvider",function(a,b){a.authenticate=function(a,b,c){var d=a.get("user");return d?(c.user=d,b.when(d)):b.reject(null)},a.doOnNotAuthorized=function(a,b){a.url("/access_denied?prevUrl="+encodeURIComponent(b))},b.when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl",restrict:function(a){return void 0===a},controllerAs:"login"}).when("/main",{templateUrl:"views/main.html",controller:"MainCtrl",restrict:function(a){return!!a},controllerAs:"main"}).when("/access_denied",{templateUrl:"views/access_denied.html",controller:"AccessDeniedCtrl",controllerAs:"access_denied"}).otherwise({redirectTo:"/main"})}]),angular.module("coffeePricingApp").controller("LoginCtrl",["$scope","visor","authService","$rootScope","$cookieStore",function(a,b,c,d,e){a.login=function(){if(c.credentialsValid(a.username,a.password)){var f={username:a.username};e.put("user",f),d.user=f,b.setAuthenticated(f)}}}]),angular.module("coffeePricingApp").controller("MainCtrl",["$scope","$cookieStore","$rootScope","$route","visor","$location",function(a,b,c,d,e,f){a.$route=d,a.logout=function(){b.remove("user"),c.user=void 0,e.setUnauthenticated(),f.url("/main")}}]),angular.module("coffeePricingApp").controller("NavCtrl",["$scope","$cookieStore","$rootScope","$route","visor","$location",function(a,b,c,d,e,f){a.$route=d,a.logout=function(){b.remove("user"),c.user=void 0,e.setUnauthenticated(),f.url("/home")}}]),angular.module("coffeePricingApp").service("authService",function(){this.username="username",this.password="password",this.credentialsValid=function(a,b){return this.username===a&&this.password===b?!0:!1}});