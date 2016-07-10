gemApp.factory("Square", ["animate", function(animate){
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
    var endY = -(Math.random() * this.posY);

    this.geometry = new THREE.Geometry();
    this.geometry.vertices = [
      new THREE.Vector3(this.posX, 0, this.posZ),
      new THREE.Vector3(this.posX, endY, this.posZ)];
      
    this.mesh = new THREE.Mesh( geometry );
    this.mesh.position.set(this.posX, endY, this.posZ);
  }

  return Square;
}]);
