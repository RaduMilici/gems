gemApp.factory("gemMesh", ["updater", "$q", function(updater, $q){
  var url = "js/models/";
  var loader = new THREE.JSONLoader();

  return {
    Droplet: undefined,
    Crystal: undefined,
    Selected: undefined,
    Min: undefined,
    Max: undefined,
    Height: 10,
//------------------------------------------------------------------------------
    Load: function(name){
      var deferred = $q.defer();
      loader.load(url + name + ".js", onLoad.bind(this));
      function onLoad(geometry){
        var object = new THREE.Mesh(geometry);
        deferred.resolve(object);
      }
      return deferred.promise;
    },
//------------------------------------------------------------------------------
    LoadDroplet: function(){
      var _this = this;
      var promise = this.Load("droplet");

      promise.then(function(object){
        _this.SetSizes("Droplet");
        _this.Droplet = _this.Selected = object;
      });

      return promise;
    },
//------------------------------------------------------------------------------
    LoadCrystal: function(){
      var _this = this;
      var promise = this.Load("crystal");

      promise.then(function(object){
        _this.SetSizes("Crystal");
        _this.Crystal = _this.Selected = object;
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
        this.Height =
        this.Min = 3;
        this.Max = 10;
      }
      else if (name == "Droplet"){
        this.Height =
        this.Min = 10;
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
}]);
