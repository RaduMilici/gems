gemApp.factory("WebGLRenderer", ["updater", "animate", function(updater, animate){

  function Renderer(containerID){
    var scope = this;
    this.container = getContainer(containerID);
    this.width = $(this.container).outerWidth();
    this.height = $(this.container).outerHeight();

    var frameID = undefined;
    this.renderer = makeRenderer(this.width, this.height);
    appendCanvas(this.container);

    //--------------------------------------------------------------------------
    this.Render = function(){
      updater.UpdateHandlers();
      animate.controls.update();
      frameID = requestAnimationFrame( this.Render.bind(this) );
      this.renderer.render(animate.loader.scene, animate.camera);
    };
    //--------------------------------------------------------------------------
    function getContainer(containerID){
      try {
        var container = $("#" + containerID);

        if(container.length === 0)
          throw("could not find container with ID " + containerID);
        else
          return container;
      }
      catch(err) {
        console.error(err);
      }
    }
    //--------------------------------------------------------------------------
    function makeRenderer(width, height){
      var renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
      renderer.setSize(width, height);
      return renderer;
    }
    //--------------------------------------------------------------------------
    function appendCanvas(container){
      $(scope.renderer.domElement).appendTo(container);
      $(scope.renderer.domElement).attr('id', containerID + "Canvas");
    }
  }

  return Renderer;

}]);
