gemApp.factory("Cloud", ["animate", "Square", "$interval", "HeightMap", "gemMesh", "$log", "materials",
function(animate, Square, $interval, HeightMap, gemMesh, $log, materialsService){
function Cloud(){
  var floatPrecision = 2;
  //cloud size
  this.minWidth = 50;
  this.maxWidth = 1000;
  this.minLength = 50;
  this.maxLength = 1000;
  this.minHeight = 50;
  this.maxHeight = 300;
  //noise
  this.minNoiseScale = 16;
  this.maxNoiseScale = 128;
  //magnitude
  this.minMagnitude = 0;
  this.maxMagnitude = 256;
  //mesh
  this.meshHeight = undefined;
  this.interval = undefined;
  this.numberOfDroplets = 100;
  this.magnitude = 50;
  this.count = 0;
  //squares
  this.squares = [];

  this.materialSettings = {
    number: 50000,
    Crystal:{
      crystal: 80,
      amber: 20,
      smoke: 0
    },
    Droplet:{
      gold: 0,
      silver: 100,
      copper: 0,
      black: 0,
      blue: 0,
      red: 0
    }
  };
  this.materialIDs = [];

  var width, length, height;
  var lineColor = 0x535353;
  var scaleCubeColor = 0xffffff;
  var gemMat = new THREE.MeshBasicMaterial({ color: 0xFFFAD5 });
  var offsetMatrix = new THREE.Matrix4();
  var scaleCubeGeom = new THREE.BoxGeometry( 1, 1, 1 );
  var lineSegmentMesh, gemsMesh;

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
      this.meshHeight = size;
    else
      this.meshHeight = gemMesh.Max;

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
    this.count = 0;
    this.squares.positions = [];
    var scope = this;
    var linesGeom = new THREE.Geometry();
    var gemGeom = new THREE.Geometry();
    var interval = this.interval;
    var halfInt = interval / 2;
    var wStop = x / 2 - halfInt;
    var lStop = z / 2 - halfInt;
    gemsMesh = new THREE.Mesh(gemGeom, materialsService[gemMesh.Selected.name]);
		gemsMesh.castShadow = true;
		gemsMesh.receiveShadow = true;
    this.materialIDs = generateMaterialIDs(this.materialSettings);

    var randomInterval = 0;
    var randomHalfInt = 0;
    var highest = 0;

    if(randomPos === true){
      randomInterval = interval;
      randomHalfInt = halfInt;
    }

    //loop width
    for (var w = -(x / 2) + halfInt, Xcoord = 0, matOffset = 0;
         w <= wStop;
         w += interval + randomInterval, Xcoord++, matOffset++) {
      //loop length
      for (var l = -(z / 2) + halfInt, Ycoord = 0;
         l <= lStop;
         l += interval + randomInterval, Ycoord++, matOffset++) {

        scope.count++;
        //individual Y positions
        var posY = -hm.GetPixel(Xcoord, Ycoord) / (hm.max / this.magnitude) + this.meshHeight - y;
        //var posY = Math.sin((Xcoord + Ycoord) * 100) * 10;
        //var posY = Math.sin(w + Xcoord + matOffset) * 10;
        posY = posY.toFixed(floatPrecision);
        //cap the roof
        if(-posY > y * 2) {
          posY = random(-y - this.meshHeight, -y * 2);
          //posY -= y*x;
        }

        var newSquare = new Square({
          width: 1,
          length: 1,
          posX: w + random(-randomHalfInt, randomHalfInt),
          posY: posY,
          posZ: l + random(-randomHalfInt, randomHalfInt)
        });

        //store positions for logging
        this.squares.push({
          pos: newSquare.mesh.position
        });
        //wires
        linesGeom.vertices.push(newSquare.geometry.vertices[0]);
        linesGeom.vertices.push(newSquare.geometry.vertices[1]);
        //scale
        newSquare.mesh.scale.set(this.meshHeight, this.meshHeight, this.meshHeight);
        //merge
        newSquare.mesh.updateMatrix();
        gemsMesh.geometry.merge(newSquare.mesh.geometry, newSquare.mesh.matrix, this.materialIDs[matOffset]);
      }
    }
    //lines
    lineSegmentMesh = new THREE.LineSegments(linesGeom,  new THREE.LineBasicMaterial({color: lineColor}));

    //offset gems and wires
    console.log(highest)
    var box = new THREE.Box3().setFromObject( gemsMesh );
    gemsMesh.position.setY(-box.min.y - y);
    lineSegmentMesh.position.setY(-box.min.y - y);
    lineSegmentMesh.updateMatrixWorld();

    for (var j = 0; j < lineSegmentMesh.geometry.vertices.length; j += 2) {
      lineSegmentMesh.geometry.vertices[j] = lineSegmentMesh.worldToLocal(
        new THREE.Vector3(lineSegmentMesh.geometry.vertices[j].x,
                          0,
                          lineSegmentMesh.geometry.vertices[j].z));
    }

    lineSegmentMesh.geometry.verticesNeedUpdate = true;
    animate.loader.Add(lineSegmentMesh);
    animate.loader.Add(gemsMesh);
  };
//-----------------------------------------------------------------------
  this.LogPositions = function(){
    console.log("dasd")
    $log.debug(JSON.stringify(this.squares));
  };
//-----------------------------------------------------------------------
  this.Clear = function(){
    lineSegmentMesh.geometry.dispose();
    animate.loader.scene.remove(lineSegmentMesh);
    gemsMesh.geometry.dispose();
    animate.loader.scene.remove(gemsMesh);
  };
//-----------------------------------------------------------------------
  function random(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }
//-----------------------------------------------------------------------
  function generateMaterialIDs(settings){
    var mats = [];

    _.each(_.keys(settings[gemMesh.Selected.name]), function(mat, i){
      var percent = settings[gemMesh.Selected.name][mat];
      var num = settings.number * (percent / 100);
      for (var m = 0; m < num; m++)
        mats.push(i);
    });

    return _.shuffle(mats);
  }
}

  return Cloud;
}]);
