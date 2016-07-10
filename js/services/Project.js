gemApp.factory("Project", ["updater", "Cloud", function(updater, Cloud){
  function Project(){
    this.cloud = new Cloud();
  }

  return Project;
}]);
