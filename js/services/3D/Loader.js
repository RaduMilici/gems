gemApp.factory("Loader", [function(){

  function Loader(){
    this.scene = new THREE.Scene();

    //--------------------------------------------------------------------------
    this.Add = function(obj){
      this.scene.add(obj);
    };
  }

  return Loader;
}]);
