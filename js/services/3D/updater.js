gemApp.factory("updater", [function(){
  return {
    handlers: [],
    AddHandler : function(h){
      this.handlers.push(h);
    },
    RemoveHandler: function(h){
        var index = this.handlers.indexOf(h);
        if(index > -1) this.handlers.splice(index, 1);
    },
    returnHandlerIndex: function(h){
        var index = this.handlers.indexOf(h);
        if(index > -1)
          return index;
        else
          return false;
    },
    UpdateHandlers: function (delta, timestamp) {
      for (var i = 0; i < this.handlers.length; i++)
        this.handlers[i].Update(delta, timestamp);
    },
    ClearAll: function() {
      this.handlers.length = 0;
    }
  };
}]);
