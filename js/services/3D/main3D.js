gemApp.factory("main3D", ["animate", "WebGLRenderer", "Loader", "Project", "gemMesh",
function(animate, WebGLRenderer, Loader, Project, gemMesh){
  this.project = undefined;
//------------------------------------------------------------------------------
  this.Start = function () {
    animate.renderer = new WebGLRenderer("WebGL");
    animate.loader = new Loader();
    animate.MakeCamera({
      pos: new THREE.Vector3(-350, 350, -350),
      lookAt: new THREE.Vector3(0, -75, 0),
    });
    this.project = new Project();
    //animate.loader.scene.background = gemMesh.EnvMap;
    //addEnvironment();
    animate.Start();
  };
//------------------------------------------------------------------------------
  this.ToggleControls = function(bool){
    animate.controls.enabled = bool;
  };
//------------------------------------------------------------------------------
  function addEnvironment(){
    var side = 5000;
    var imagePrefix = "js/assets/cubemap/env__";
    var directions  = ["FR", "BK", "UP", "DN", "RT", "LF"];
    var skyGeometry = new THREE.BoxGeometry( side, side, side );
    var materialArray = [];
    for (var i = 0; i < 6; i++)
      materialArray.push( new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(imagePrefix + directions[i] + ".jpg"),
        side: THREE.BackSide
      }));

    var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
    var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
    //animate.loader.Add( skyBox );

  }

  return this;
}]);
