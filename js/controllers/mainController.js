gemApp.controller("mainController", ["$scope", "main3D", "gemMesh",
function($scope, main3D, gemMesh) {
  main3D.Start();

  //cloud size
  $scope.userWidth = 500;
  $scope.userHeight = 100;
  $scope.userLength = 500;

  $scope.cloud = main3D.project.cloud;
  $scope.gemMesh = gemMesh;
  $scope.userNoiseScale = $scope.cloud.minNoiseScale;
  $scope.userMagnitude = $scope.cloud.magnitude;
  $scope.showBox = false;
  $scope.selectedMesh = "Droplet"; //Crysta
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
    $scope.cloud.Clear();
    $scope.cloud.SetMeshSize($scope.cloud.meshHeight);
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
  $scope.$watch("showBox",  function(newVal) {
    main3D.project.cloud.scaleCubeMesh.visible = newVal;
  });
//------------------------------------------------------------------------------
  $scope.$watch("randomPlace",  function() {
    $scope.UpdateCloud();
  });
//------------------------------------------------------------------------------
  $scope.UpdateCrystalSliders = function(){
    var sum = 0;
    _.each(_.keys($scope.crystalMats), function(k){sum += $scope.crystalMats[k];});
    $scope.crystalMats.crystal = Math.trunc(($scope.crystalMats.crystal / sum) * 100);
    $scope.crystalMats.amber   = Math.trunc(($scope.crystalMats.amber / sum) * 100);
    $scope.crystalMats.smoke   = Math.trunc(($scope.crystalMats.smoke / sum) * 100);
  };
  //------------------------------------------------------------------------------
  $scope.UpdateDropletSliders = function(){
    var sum = 0;
    _.each(_.keys($scope.dropletMats), function(k){sum += $scope.dropletMats[k];});
    $scope.dropletMats.gold   = Math.trunc(($scope.dropletMats.gold / sum) * 100);
    $scope.dropletMats.silver = Math.trunc(($scope.dropletMats.silver / sum) * 100);
    $scope.dropletMats.copper = Math.trunc(($scope.dropletMats.copper / sum) * 100);
    $scope.dropletMats.black  = Math.trunc(($scope.dropletMats.black / sum) * 100);
    $scope.dropletMats.blue   = Math.trunc(($scope.dropletMats.blue / sum) * 100);
    $scope.dropletMats.red    = Math.trunc(($scope.dropletMats.red / sum) * 100);
  };
//------------------------------------------------------------------------------
  main3D.project.cloud.Scale($scope.userWidth, $scope.userHeight, $scope.userLength);

  gemMesh["Load" + $scope.selectedMesh]().then(function(object){
    $scope.cloud.meshHeight = gemMesh.Height;
    $scope.cloud.SetMeshSize($scope.cloud.meshHeight);
    $scope.cloud.Populate($scope.userWidth, $scope.userHeight, $scope.userLength);
  });

}]);
