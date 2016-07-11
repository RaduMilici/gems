gemApp.factory("Cloud", ["animate", "Square", "$interval", "HeightMap", "gemMesh",
function(animate, Square, $interval, HeightMap, gemMesh){
function Cloud(){
  this.minWidth = 1;
  this.maxWidth = 200;
  this.minLength = 1;
  this.maxLength = 200;
  this.minHeight = 1;
  this.maxHeight = 200;

  var width, length, height;
  var lineColor = 0x222222;
  var scaleCubeColor = 0xffffff;
  var gemMat = new THREE.MeshBasicMaterial({ color: 0xFFFAD5 });
  var offsetMatrix = new THREE.Matrix4();
  var scaleCubeGeom = new THREE.BoxGeometry( 1, 1, 1 );
  var lineSegmentMesh, gemsMesh;
  var planePos = new THREE.Vector3(0, 50, 0);

  this.scaleCubeMesh = new THREE.Mesh( scaleCubeGeom );

  offsetMatrix.setPosition(new THREE.Vector3(0, -0.5, 0));
  scaleCubeGeom.applyMatrix(offsetMatrix);

  this.scaleCubeMesh = new THREE.BoxHelper( this.scaleCubeMesh );
  this.scaleCubeMesh.material.color.set( scaleCubeColor );
  animate.loader.Add( this.scaleCubeMesh );

  var hm = new HeightMap();

  this.RollSeed = function(){
    hm = new HeightMap();
  };

//-----------------------------------------------------------------------
  this.Scale = function(x, y, z){
    width = x;
    height = y;
    length = z;
    this.scaleCubeMesh.scale.set(x, y, z);
  };
//-----------------------------------------------------------------------
  this.Populate = function(x, y, z){
    var linesGeom = new THREE.Geometry();
    var gemGeom = new THREE.Geometry();
    var interval = 15;
    gemsMesh = new THREE.Mesh(gemGeom, gemMat);
    var wStop = x / 2;
    var lStop = z /2;
    var max = 0;

    for (var w = -x / 2, Xcoord = 0; w <= wStop; w += interval, Xcoord++) {
      for (var l = -z / 2, Ycoord = 0; l <= lStop; l += interval, Ycoord++) {
        var pixel = -hm.GetPixel(Xcoord, Ycoord);
        var newSquare = new Square({
          width: 1,
          length: 1,
          posX: w,
          posY: pixel / (hm.max / y) + gemMesh.Height /*+ (10 * pixel)*/,
          posZ: l
        });
        linesGeom.vertices.push(newSquare.geometry.vertices[0]);
        linesGeom.vertices.push(newSquare.geometry.vertices[1]);
        newSquare.mesh.updateMatrix();
        gemsMesh.geometry.merge(newSquare.mesh.geometry, newSquare.mesh.matrix);
      }
    }

    var lineSeg = new THREE.LineSegments(linesGeom,  new THREE.LineBasicMaterial({color: lineColor}));
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
