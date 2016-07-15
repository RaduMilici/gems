gemApp.factory("screenshot", [function(){
  return {
    Take: function(id){
      var canvas;

      try {
        canvas = $("#" + id)[0];
        if(canvas.length === 0)
          throw("could not find container with ID " + id);
      }
      catch(err) {
        console.error(err);
      }

      var myWindow = window.open();
      myWindow.document.write("<img src='" + canvas.toDataURL("image/png") + "'>");
    }
  };
}]);
