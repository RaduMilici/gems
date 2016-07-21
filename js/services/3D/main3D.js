gemApp.factory("main3D", ["animate", "WebGLRenderer", "Loader", "Project", "gemMesh", "screenshot",
function(animate, WebGLRenderer, Loader, Project, gemMesh, screenshot){
  this.project = undefined;
  this.containerID = "WebGL";
//------------------------------------------------------------------------------
  this.Start = function () {
    animate.renderer = new WebGLRenderer(this.containerID);
    animate.loader = new Loader();
    animate.MakeCamera({
      pos: new THREE.Vector3(-350, 250, -350),
      lookAt: new THREE.Vector3(0, -100, 0),
    });
    var winResize  = new THREEx.WindowResize(animate.renderer.renderer, animate.camera);
    this.project = new Project();
    //animate.loader.scene.background = gemMesh.EnvMap;
    addLight();
    animate.Start();
  };
//------------------------------------------------------------------------------
  this.ToggleControls = function(bool){
    animate.controls.enabled = bool;
  };
//------------------------------------------------------------------------------
  this.TakeScreenshot = function(){
    screenshot.Take(this.containerID + "Canvas");
  };

  function addLight(){
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.3 );
    directionalLight.position.copy( animate.camera.position );
    animate.loader.Add( directionalLight );

    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.7 ); // soft white light
    animate.loader.Add( ambientLight );

    var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.3 );
    animate.loader.Add( light );
  }

  return this;
}]);
