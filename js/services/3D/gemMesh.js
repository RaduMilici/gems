gemApp.factory("gemMesh", ["updater", "$q", function(updater, $q){
  var url = "js/models/";
  var loader = new THREE.JSONLoader();

  return {
    Droplet: undefined,
    Height: undefined,
    LoadDroplet: function(){
      var deferred = $q.defer();
      loader.load(url + "droplet.js", onLoad.bind(this));

      function onLoad(geometry){
        var object = new THREE.Mesh(geometry);
        this.Droplet = object;
        deferred.resolve(object);
      }

      this.Height = 10;

      return deferred.promise;
    }
  };
}]);
