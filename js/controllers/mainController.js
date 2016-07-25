gemApp.controller("mainController", ["$scope", "main3D", "gemMesh",
function($scope, main3D, gemMesh) {
  main3D.Start();

  //cloud size
  $scope.userWidth = 150;
  $scope.userHeight = 100;
  $scope.userLength = 1000;
  $scope.userDensity = 80;

  $scope.cloud = main3D.project.cloud;
  $scope.gemMesh = gemMesh;
  $scope.userNoiseScale = $scope.cloud.minNoiseScale;
  $scope.userMagnitude = $scope.cloud.magnitude;
  $scope.showBox = true;
  $scope.selectedMesh = "Crystal"; //Droplet
  $scope.cloud.meshHeight = undefined;
  $scope.randomPlace = false;
  $scope.crystalMats = $scope.cloud.materialSettings.Crystal;
  $scope.dropletMats = $scope.cloud.materialSettings.Droplet;

//------------------------------------------------------------------------------
  $scope.ToggleControls = function(bool){
    main3D.ToggleControls(bool);
  };
//------------------------------------------------------------------------------
  $scope.LogCloud = function(){
    $scope.cloud.LogPositions();
  };
//------------------------------------------------------------------------------
  $scope.RollSeed = function(){
    $scope.cloud.RollSeed($scope.userNoiseScale);
    $scope.UpdateCloud();
  };
//------------------------------------------------------------------------------
  $scope.UpdateCloud = function(){
    clampCloudDimensions();
    $scope.cloud.Clear();
    $scope.cloud.SetMeshSize($scope.cloud.meshHeight);
    $scope.userDensity = Math.trunc(100 - (($scope.cloud.meshHeight - gemMesh.Min) /  (gemMesh.Max - gemMesh.Min)) * 100);
    $scope.cloud.Populate($scope.userWidth, $scope.userHeight, $scope.userLength, $scope.randomPlace);
  };
//------------------------------------------------------------------------------
  $scope.SelectMesh = function(){
    $scope.cloud.Clear();
    gemMesh.SelectMesh($scope.selectedMesh).then(function(){
        $scope.cloud.meshHeight = gemMesh.GetSize($scope.cloud.meshHeight);
        $scope.UpdateCloud();
      }
    );
  };
//------------------------------------------------------------------------------
  $scope.Screenshot = function(){
    main3D.TakeScreenshot();
  };
//------------------------------------------------------------------------------
  $scope.$watchCollection("[userWidth, userHeight, userLength]",  function(newScale) {
    main3D.project.cloud.Scale(newScale[0], newScale[1], newScale[2]);
  });
//------------------------------------------------------------------------------
  $scope.$watchCollection("[crystalMats.crystal, crystalMats.amber, crystalMats.smoke]", function(newVal, oldVal) {
    //$scope.UpdateCrystalSliders();
  });
//------------------------------------------------------------------------------
  $scope.$watch("showBox", function(newVal) {
    main3D.project.cloud.scaleCubeMesh.visible = newVal;
  });
//------------------------------------------------------------------------------
  $scope.$watch("cloud.meshHeight", function(newVal) {

  });
//------------------------------------------------------------------------------
  $scope.$watch("randomPlace", function() {
    $scope.UpdateCloud();
  });
//------------------------------------------------------------------------------
  $scope.UpdateCrystalSliders = function(){
    var sum = 0;
    _.each(_.keys($scope.crystalMats), function(k){sum += $scope.crystalMats[k];});
    $scope.crystalMats.crystal = setSliderVal($scope.crystalMats.crystal, sum);
    $scope.crystalMats.amber   = setSliderVal($scope.crystalMats.amber, sum);
    $scope.crystalMats.smoke   = setSliderVal($scope.crystalMats.smoke, sum);
  };
//------------------------------------------------------------------------------
  $scope.UpdateDropletSliders = function(){
    var sum = 0;
    _.each(_.keys($scope.dropletMats), function(k){sum += $scope.dropletMats[k];});
    $scope.dropletMats.gold   = setSliderVal($scope.dropletMats.gold, sum);
    $scope.dropletMats.silver = setSliderVal($scope.dropletMats.silver, sum);
    $scope.dropletMats.copper = setSliderVal($scope.dropletMats.copper, sum);
    $scope.dropletMats.black  = setSliderVal($scope.dropletMats.black, sum);
    $scope.dropletMats.blue   = setSliderVal($scope.dropletMats.blue, sum);
    $scope.dropletMats.red    = setSliderVal($scope.dropletMats.red, sum);
  };
//------------------------------------------------------------------------------
  $scope.GetDensity = function(){
    //return Math.round(($scope.cloud.meshHeight / 100) * 100);
  };
//------------------------------------------------------------------------------
  $scope.SetDensity = function(){
    $scope.cloud.meshHeight = (gemMesh.Max + gemMesh.Min) - (gemMesh.Max * ($scope.userDensity / 100));
    $scope.UpdateCloud();
  };
//------------------------------------------------------------------------------
  function clampCloudDimensions(){
    $scope.userWidth  = clampNum($scope.userWidth, $scope.cloud.minWidth, $scope.cloud.maxWidth);
    $scope.userHeight = clampNum($scope.userHeight, $scope.cloud.minHeight, $scope.cloud.maxHeight);
    $scope.userLength = clampNum($scope.userLength, $scope.cloud.minLength, $scope.cloud.maxLength);
  }
//------------------------------------------------------------------------------
  function clampNum(num, min, max){
    if(num > max)
      return num;
    if(num < 0)
      return 0;
    return num;
     //return num < min ? min : num > max ? max : num;
  }
//------------------------------------------------------------------------------
  function setSliderVal(val, sum){
    return Math.trunc((val / sum) * 100);
  }
//------------------------------------------------------------------------------
  main3D.project.cloud.Scale($scope.userWidth, $scope.userHeight, $scope.userLength);

  gemMesh["Load" + $scope.selectedMesh]().then(function(object){
    $scope.cloud.meshHeight = gemMesh.Height;
    $scope.cloud.SetMeshSize($scope.cloud.meshHeight);
    $scope.cloud.Populate($scope.userWidth, $scope.userHeight, $scope.userLength);
    $scope.userDensity = Math.trunc(100 - (($scope.cloud.meshHeight - gemMesh.Min) /  (gemMesh.Max - gemMesh.Min)) * 100);
  });

}]);
