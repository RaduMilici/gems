gemApp.factory("Cloud", ["animate", "Square", "$interval", function(animate, Square, $interval){
function Cloud(){
  this.minWidth = 1;
  this.maxWidth = 200;
  this.minLength = 1;
  this.maxLength = 200;
  this.minHeight = 1;
  this.maxHeight = 200;

  var width, length, height;

  var offsetMatrix = new THREE.Matrix4();
  offsetMatrix.setPosition(new THREE.Vector3(0, -0.5, 0));

  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  geometry.applyMatrix(offsetMatrix);

  var scaleCube = new THREE.Mesh( geometry );
  scaleCube = new THREE.BoxHelper( scaleCube );
  scaleCube.material.color.set( 0xffffff );
  animate.loader.Add( scaleCube );

  var lineSegmentMesh, gemsMesh;
  var staticMat = new THREE.MeshBasicMaterial( {color: 0xFFFAD5} );

//-----------------------------------------------------------------------
  this.Scale = function(x, y, z){
    width = x;
    height = y;
    length = z;
    scaleCube.scale.set(x, y, z);
  };
//-----------------------------------------------------------------------
  this.Populate = function(x, y, z){
    var linesGeom = new THREE.Geometry();
    var gemGeom = new THREE.Geometry();
    var interval = 5;
    gemsMesh = new THREE.Mesh(gemGeom, staticMat);
    var wStop = x / 2;
    var lStop = z /2;

    for (var w = -x / 2; w <= wStop; w += interval) {
      for (var l = -z / 2; l <= lStop; l += interval) {
        var newSquare = new Square({width: 1, length: 1, posX: w, posY: y, posZ: l});
        linesGeom.vertices.push(newSquare.geometry.vertices[0]);
        linesGeom.vertices.push(newSquare.geometry.vertices[1]);
        newSquare.mesh.updateMatrix();
        gemsMesh.geometry.merge(newSquare.mesh.geometry, newSquare.mesh.matrix);
      }
    }

    var lineSeg = new THREE.LineSegments(linesGeom,  new THREE.LineBasicMaterial({color: 0x105B63}));
    lineSegmentMesh = lineSeg;
    animate.loader.Add(lineSeg);
    animate.loader.Add(gemsMesh);
  };
//-----------------------------------------------------------------------
  this.Clear = function(){
    lineSegmentMesh.geometry.dispose();
    animate.loader.scene.remove(lineSegmentMesh);

    gemsMesh.geometry.dispose();
    animate.loader.scene.remove(gemsMesh);
  };
//-----------------------------------------------------------------------
}

  return Cloud;
}]);
