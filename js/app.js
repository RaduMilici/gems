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

gemApp.directive("crystalMaterials", function() {
  return {
    templateUrl: "directives/crystalMaterials.html"
  };
});

gemApp.directive("dropletMaterials", function() {
  return {
    templateUrl: "directives/dropletMaterials.html"
  };
});

gemApp.directive("selectMesh", function() {
  return {
    templateUrl: "directives/selectMesh.html"
  };
});

gemApp.directive("noiseControl", function() {
  return {
    templateUrl: "directives/noiseControl.html"
  };
});
