gemApp.factory("Project",
["updater", "Cloud", "HDR", "animate",
function(updater, Cloud, HDR, animate){
  function Project(){
    var hdr = new HDR(animate);
    animate.composer = hdr.composer;
    this.cloud = new Cloud();
  }

  return Project;
}]);
