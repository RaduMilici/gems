gemApp.factory("main3D", ["animate", "WebGLRenderer", "Loader", "Project",
function(animate, WebGLRenderer, Loader, Project){
  this.project = undefined;

  this.Start = function () {
    animate.renderer = new WebGLRenderer("WebGL");
    animate.loader = new Loader();
    animate.MakeCamera({
      pos: new THREE.Vector3(-350, 350, -350),
      lookAt: new THREE.Vector3(0, -75, 0),
    });

    this.project = new Project();

    animate.Start();
  };

  this.ToggleControls = function(bool){
    animate.controls.enabled = bool;
  }

  return this;
}]);
