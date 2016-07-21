gemApp.factory("gemMesh", ["updater", "$q", function(updater, $q){
  var assetsUrl = "js/assets/";
  var loader = new THREE.JSONLoader();
    var textureLoader = new THREE.TextureLoader();

  return {
    Droplet: undefined,
    Crystal: undefined,
    Selected: undefined,
    Min: undefined,
    Max: undefined,
    EnvMap: loadEnvMap("Cube"),
    LoadEnvMap: loadEnvMap,
    GetCubeURLs: getCubeURLs,
    Height: undefined,
//------------------------------------------------------------------------------
    LoadMesh: function(name){
      var deferred = $q.defer();
      loader.load(assetsUrl + name + ".js", onLoad.bind(this));
      function onLoad(geometry){
        var object = new THREE.Mesh(geometry);
        geometry.computeVertexNormals();
        deferred.resolve(object);
      }
      return deferred.promise;
    },
//------------------------------------------------------------------------------
    LoadTexture: loadTexture,
//------------------------------------------------------------------------------
    LoadDroplet: function(){
      var _this = this;
      var promise = this.LoadMesh("droplet");

      promise.then(function(object){
        _this.SetSizes("Droplet");
        _this.Droplet = _this.Selected = object;
        _this.Selected.name = "Droplet";
      });

      return promise;
    },
//------------------------------------------------------------------------------
    LoadCrystal: function(){
      var _this = this;
      var promise = this.LoadMesh("crystal4");

      promise.then(function(object){
        _this.SetSizes("Crystal");
        _this.Crystal = _this.Selected = object;
        _this.Selected.name = "Crystal";
      });

      return promise;
    },
//------------------------------------------------------------------------------
    SelectMesh: function(name){
      this.SetSizes(name);
      if(this[name] === undefined){
        var p = this["Load" + name]();
        p.then(function(object){
          this.Selected = object;
        });
        return p;
      }
      else{
        var deferred = $q.defer();
        this.Selected = this[name];
        deferred.resolve(this[name]);
        return deferred.promise;
      }
    },
//------------------------------------------------------------------------------
    SetSizes: function(name){
      if(name == "Crystal"){
        this.Min = 3;
        this.Height = this.Max = 10;
      }
      else if (name == "Droplet"){
        this.Min = 10;
        this.Height = 15;
        this.Max = 30;
      }
    },
//------------------------------------------------------------------------------
    GetSize: function(size){
      if(size <= this.Min)
        return this.Min;
      else if (size >= this.Max)
        return this.Max;
      else
        return size;
    }
  };
//------------------------------------------------------------------------------
  function getCubeURLs(name, ext){
      ext = ext || ".jpg";
      var cubeUrl = assetsUrl + "cubemap/" + name + "__";
      return [
        cubeUrl + "FR" + ext,
        cubeUrl + "BK" + ext,
        cubeUrl + "UP" + ext,
        cubeUrl + "DN" + ext,
        cubeUrl + "RT" + ext,
        cubeUrl + "LF" + ext
      ];
  }
//------------------------------------------------------------------------------
  function loadEnvMap(name){
    var urls = getCubeURLs(name);
    var eMap = new THREE.CubeTextureLoader().load(urls);
    eMap.format = THREE.RGBFormat;
    eMap.mapping = THREE.CubeRefractionMapping;
    return eMap;
  }

//------------------------------------------------------------------------------
  function loadTexture(){
    var deferred = $q.defer();

    textureLoader.load( assetsUrl + "/roughness_map.jpg", function( map ) {
      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.anisotropy = 4;
      map.repeat.set( 9, 2 );
      deferred.resolve(map);
      /*standardMaterial.roughnessMap = map;
      standardMaterial.bumpMap = map;
      standardMaterial.needsUpdate = true;*/
    } );

    return deferred.promise;
  }
}]);
