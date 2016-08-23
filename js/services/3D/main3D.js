gemApp.factory("main3D", ["animate", "WebGLRenderer", "Loader", "Project", "gemMesh", "screenshot", "updater",
function(animate, WebGLRenderer, Loader, Project, gemMesh, screenshot, updater){
  this.project = undefined;
  this.containerID = "WebGL";
//------------------------------------------------------------------------------
  this.Start = function () {
    animate.renderer = new WebGLRenderer(this.containerID);
    animate.loader = new Loader();
    animate.MakeCamera({
      pos: new THREE.Vector3(-350, 50, 350),
      lookAt: new THREE.Vector3(0, -100, 0),
    });
    var winResize  = new THREEx.WindowResize(animate.renderer.renderer, animate.camera);
    this.project = new Project();
    animate.loader.scene.background = gemMesh.EnvMap;
    addLight();
  };
//------------------------------------------------------------------------------
  this.ToggleControls = function(bool){
    animate.controls.enabled = bool;
  };
//------------------------------------------------------------------------------
  this.TakeScreenshot = function(){
    screenshot.Take(this.containerID + "Canvas");
  };
//------------------------------------------------------------------------------
  function addLight(){
    animate.loader.Add( new THREE.AmbientLight( 0xffffff ) );
  }
//------------------------------------------------------------------------------

  return this;
}]);
