gemApp.controller("mainController", ["$scope", "main3D", "gemMesh", function($scope, main3D, gemMesh) {
  main3D.Start();

  $scope.cloud = main3D.project.cloud;
  $scope.userWidth = 200;
  $scope.userHeight = 100;
  $scope.userLength = 200;
  $scope.showBox = true;

  $scope.ToggleControls = function(bool){
    main3D.ToggleControls(bool);
    $scope.UpdateCloud();
  };
  var throttleArea = 10000; //will call throttled 'UpdateCloud_throttled' above this area

//------------------------------------------------------------------------------
  $scope.RollSeed = function(){
    $scope.cloud.RollSeed();
    $scope.UpdateCloud();
  };
//------------------------------------------------------------------------------
  $scope.UpdateCloud = function(){
    $scope.cloud.Clear();
    $scope.cloud.Populate($scope.userWidth, $scope.userHeight, $scope.userLength);
  };
  var UpdateCloud_throttled = _.throttle($scope.UpdateCloud, 300);
//------------------------------------------------------------------------------
  $scope.$watchCollection("[userWidth, userHeight, userLength]",  function(newScale) {
    main3D.project.cloud.Scale(newScale[0], newScale[1], newScale[2]);
    //dynamicUpdate();
  });
//------------------------------------------------------------------------------
  $scope.$watch("showBox",  function(newVal) {
    main3D.project.cloud.scaleCubeMesh.visible = newVal;
    //dynamicUpdate();
  });
//------------------------------------------------------------------------------
  function dynamicUpdate(){
    if($scope.userWidth * $scope.userLength > throttleArea)
      UpdateCloud_throttled();
    else
      $scope.UpdateCloud();
  }
//------------------------------------------------------------------------------
  main3D.project.cloud.Scale($scope.userWidth, $scope.userHeight, $scope.userLength);
  gemMesh.LoadDroplet().then(function(object){
    $scope.cloud.Populate($scope.userWidth, $scope.userHeight, $scope.userLength);
  });

}]);
