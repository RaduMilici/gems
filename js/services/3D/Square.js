gemApp.factory("Square", ["animate", "gemMesh", function(animate, gemMesh){
  var staticMat = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  var staticMatrix = new THREE.Matrix4();
  staticMatrix.makeRotationX( Math.PI/2 );
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );

  function Square(settings){
    settings = settings || {};
    this.width = settings.width || 1;
    this.length = settings.length || 1;
    this.posX = settings.posX || 0;
    this.posY = settings.posY || 0;
    this.posZ = settings.posZ || 0;

    this.geometry = new THREE.Geometry();
    this.geometry.vertices = [
      new THREE.Vector3(this.posX, 0, this.posZ),
      new THREE.Vector3(this.posX, this.posY, this.posZ)
    ];

    //this.mesh = new THREE.Mesh( geometry );
    this.mesh = gemMesh.Droplet.clone();
    this.mesh.position.set(this.posX, this.posY, this.posZ);
  }

  return Square;
}]);
