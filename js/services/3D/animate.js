gemApp.factory("animate", [function(){

  function Animate(){
    this.renderer = undefined;
    this.camera = undefined;
    this.controls = undefined;
    this.composer = undefined;

    var fov = 45;
    var near = 1;
    var far = 50000;

    //--------------------------------------------------------------------------
    this.Start = function(){
      this.renderer.Render();
    };
    //--------------------------------------------------------------------------
    this.MakeCamera = function(settings){
      settings = settings || {};
      pos = settings.pos || new THREE.Vector3(10, 0, 0);
      lookAt = settings.lookAt || new THREE.Vector3(0, 0, 0);

      this.camera = new THREE.PerspectiveCamera(
        fov, this.renderer.width / this.renderer.height, near, far);

      this.camera.position.copy(pos);
      this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
      this.controls.enablePan = false;
      this.controls.autoRotate = false;
      this.controls.autoRotateSpeed = 0.5;
      this.controls.minDistance = 150;
      this.controls.maxDistance = 1200;
      this.controls.target.copy(lookAt);
      this.camera.lookAt(lookAt);
    };
    //--------------------------------------------------------------------------

  }

  return new Animate();

}]);
