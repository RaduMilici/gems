var gemApp = angular.module("gemApp", ["ngRoute", "ngMaterial"]);

//routes

/*gemApp.config(function($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "templates/main.html"
		});
});*/

//directives
gemApp.directive("mainView", function() {
  return {
    templateUrl: "directives/mainView.html",
    controller: "mainController"
  };
});
