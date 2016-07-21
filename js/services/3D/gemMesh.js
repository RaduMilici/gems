gemApp.factory("gemMesh", ["updater", "$q", function(updater, $q){
  var url = "js/assets/";
  var loader = new THREE.JSONLoader();

  return {
    Droplet: undefined,
    Crystal: undefined,
    Selected: undefined,
    Min: undefined,
    Max: undefined,
    EnvMap: loadEnvMap(),
    Height: undefined,
//------------------------------------------------------------------------------
    LoadMesh: function(name){
      var deferred = $q.defer();
      loader.load(url + name + ".js", onLoad.bind(this));
      function onLoad(geometry){
        var object = new THREE.Mesh(geometry);
        if(name == "droplet") geometry.computeVertexNormals();
        deferred.resolve(object);
      }
      return deferred.promise;
    },
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
  function loadEnvMap(){
    var ext = ".jpg";
    var cubeUrl = url + "cubemap/env__";
    var urls = [
      cubeUrl + "FR" + ext,
      cubeUrl + "BK" + ext,
      cubeUrl + "UP" + ext,
      cubeUrl + "DN" + ext,
      cubeUrl + "RT" + ext,
      cubeUrl + "LF" + ext
    ];
    var eMap = new THREE.CubeTextureLoader().load(urls);
    eMap.format = THREE.RGBFormat;
    eMap.mapping = THREE.CubeRefractionMapping;
    return eMap;
  }
}]);
