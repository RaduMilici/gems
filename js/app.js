var gemApp = angular.module("gemApp", ["ngRoute", "ngMaterial"]);

//routes

gemApp.config(function($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "templates/mainView.html",
      controller: "mainController"
		});
});

//directives
gemApp.directive("cloudSize", function() {
  return {
    templateUrl: "directives/cloudSize.html"
  };
});
