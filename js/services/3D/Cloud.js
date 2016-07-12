gemApp.factory("Cloud", ["animate", "Square", "$interval", "HeightMap", "gemMesh",
function(animate, Square, $interval, HeightMap, gemMesh){
function Cloud(){
  //cloud size
  this.minWidth = 50;
  this.maxWidth = 1000;
  this.minLength = 50;
  this.maxLength = 1000;
  this.minHeight = 50;
  this.maxHeight = 300;
  //noise
  this.minNoiseScale = 16;
  this.maxNoiseScale = 300;
  //mesh
  this.meshSize = 10;
  this.interval = 15;
  this.numberOfDroplets = 100;
  this.count = 0;

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

  var hm = new HeightMap(this.minNoiseScale);
//-----------------------------------------------------------------------
  this.RollSeed = function(scale){
    hm = new HeightMap(scale);
  };
//-----------------------------------------------------------------------
  this.SetMeshSize = function(size){
    if(size < gemMesh.Max)
      this.meshSize = size;

    this.interval = size + size * 0.5;
  };
//-----------------------------------------------------------------------
  this.Scale = function(x, y, z){
    width  = x;
    height = y;
    length = z;
    this.scaleCubeMesh.scale.set(width, height, length);
  };
//-----------------------------------------------------------------------
  this.Populate = function(x, y, z, randomPos){
    var scope = this;
    this.count = 0;
    var linesGeom = new THREE.Geometry();
    var gemGeom = new THREE.Geometry();
    gemsMesh = new THREE.Mesh(gemGeom, new THREE.MeshFaceMaterial([
      new THREE.MeshBasicMaterial({color: 0xff0000}),
      new THREE.MeshBasicMaterial({color: 0x00ff00}),
      new THREE.MeshBasicMaterial({color: 0x0000ff}),
    ]));
    var interval = this.interval;
    var halfInt = interval / 2;
    var wStop = x / 2 - halfInt;
    var lStop = z / 2 - halfInt;

    var randomInterval = 0;
    var randomHalfInt = 0;

    if(randomPos === true){
      randomInterval = interval;
      randomHalfInt = halfInt;
    }

    for (var w = -(x / 2) + halfInt, Xcoord = 0;
         w <= wStop;
         w += interval + randomInterval, Xcoord++) {

      for (var l = -(z / 2) + halfInt, Ycoord = 0;
         l <= lStop;
         l += interval + randomInterval, Ycoord++) {

        scope.count++;
        var pixel = -hm.GetPixel(Xcoord, Ycoord);
        var newSquare = new Square({
          width: 1,
          length: 1,
          posX: w + random(-randomHalfInt, randomHalfInt),
          posY: (pixel / (hm.max / y) + gemMesh.Height) /*TODO: multiply by amplitude here*/ ,
          posZ: l + random(-randomHalfInt, randomHalfInt)
        });
        //linesGeom.vertices.push(newSquare.geometry.vertices[0]);
        //linesGeom.vertices.push(newSquare.geometry.vertices[1]);
        newSquare.mesh.scale.set(this.meshSize, this.meshSize, this.meshSize);
        newSquare.mesh.updateMatrix();
        gemsMesh.geometry.merge(newSquare.mesh.geometry, newSquare.mesh.matrix, Math.floor(Math.random() * 3));
      }
    }
    //var lineSeg = new THREE.LineSegments(linesGeom,  new THREE.LineBasicMaterial({color: lineColor}));
    //lineSegmentMesh = lineSeg;
    //animate.loader.Add(lineSeg);
    animate.loader.Add(gemsMesh);
  };
//-----------------------------------------------------------------------
  this.Clear = function(){
    //lineSegmentMesh.geometry.dispose();
    //animate.loader.scene.remove(lineSegmentMesh);
    gemsMesh.geometry.dispose();
    animate.loader.scene.remove(gemsMesh);
  };
//-----------------------------------------------------------------------
  function random(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }
}

  return Cloud;
}]);
