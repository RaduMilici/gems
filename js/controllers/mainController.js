gemApp.controller("mainController", ["$scope", "main3D", "gemMesh", function($scope, main3D, gemMesh) {
  main3D.Start();

  $scope.cloud = main3D.project.cloud;
  $scope.gemMesh = gemMesh;
  $scope.userWidth = 150;
  $scope.userHeight = 50;
  $scope.userLength = 150;
  $scope.userNoiseScale = $scope.cloud.minNoiseScale;
  $scope.showBox = true;
  $scope.selectedMesh = "Crystal";
  $scope.meshSize = 6;
  $scope.meshCount = undefined;
  $scope.randomPlace = false;
  var throttleArea = 10000; //will call throttled 'UpdateCloud_throttled' above this area

//------------------------------------------------------------------------------
  $scope.ToggleControls = function(bool){
    main3D.ToggleControls(bool);
  };
//------------------------------------------------------------------------------
  $scope.RollSeed = function(){
    $scope.cloud.RollSeed($scope.userNoiseScale);
    $scope.UpdateCloud();
  };
//------------------------------------------------------------------------------
  $scope.UpdateCloud = function(){
    $scope.cloud.Clear();
    $scope.cloud.SetMeshSize($scope.meshSize);
    $scope.cloud.Populate($scope.userWidth, $scope.userHeight, $scope.userLength, $scope.randomPlace);
  };
  var UpdateCloud_throttled = _.throttle($scope.UpdateCloud, 300);
//------------------------------------------------------------------------------
  $scope.SelectMesh = function(){
    $scope.cloud.Clear();
    gemMesh.SelectMesh($scope.selectedMesh).then(function(){
        $scope.meshSize = gemMesh.Min;
        $scope.UpdateCloud();
      }
    );
  };
//------------------------------------------------------------------------------
  $scope.SetCount = function(){

  };
//------------------------------------------------------------------------------
  $scope.$watchCollection("[userWidth, userHeight, userLength]",  function(newScale) {
    main3D.project.cloud.Scale(newScale[0], newScale[1], newScale[2]);
  });
//------------------------------------------------------------------------------
  $scope.$watch("showBox",  function(newVal) {
    main3D.project.cloud.scaleCubeMesh.visible = newVal;
  });
//------------------------------------------------------------------------------
  $scope.$watch("randomPlace",  function() {
    $scope.UpdateCloud();
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

  gemMesh["Load" + $scope.selectedMesh]().then(function(object){
    $scope.cloud.Populate($scope.userWidth, $scope.userHeight, $scope.userLength);
    $scope.meshCount = $scope.cloud.count;
  });

}]);
