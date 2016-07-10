gemApp.controller("mainController", ["$scope", "main3D", function($scope, main3D) {
  main3D.Start();

  $scope.cloud = main3D.project.cloud;
  $scope.userWidth = 100;
  $scope.userHeight = 60;
  $scope.userLength = 100;
  $scope.ToggleControls = main3D.ToggleControls;

  $scope.cloud.Populate($scope.userWidth, $scope.userHeight, $scope.userLength);

  $scope.UpdateCloud = function(){
    $scope.cloud.Clear();
    $scope.cloud.Populate($scope.userWidth, $scope.userHeight, $scope.userLength);
  }

  $scope.$watchCollection("[userWidth, userHeight, userLength]",  function(newScale) {
    main3D.project.cloud.Scale(newScale[0], newScale[1], newScale[2]);
    //$scope.UpdateCloud();
  });

}]);
