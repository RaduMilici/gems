gemApp.factory("HeightMap", [function(){

  return function(scale){
    var _this = this;
    var side = scale;
    this.max = 0;
//----------------------------------------------------------------------
    this.randomNoise = function(canvas, x, y, width, height, alpha) {
      x = x || 0;
      y = y || 0;
      width = width || canvas.width;
      height = height || canvas.height;
      alpha = alpha || 255;
      var g = canvas.getContext("2d"),
          imageData = g.getImageData(x, y, width, height),
          pixels = imageData.data,
          n = pixels.length,
          i = 0;
      while (i < n) {
          pixels[i++] = pixels[i++] = pixels[i++] = (Math.random() * 256) | 0;
          pixels[i++] = alpha;
      }
      g.putImageData(imageData, x, y);
      return canvas;
    };
//----------------------------------------------------------------------
    this.perlinNoise = function(canvas, noise) {
      noise = noise || this.randomNoise(createCanvas(canvas.width, canvas.height));
      var g = canvas.getContext("2d");
      g.save();

      for (var size = 4; size <= noise.width; size *= 2) {
          var x = (Math.random() * (noise.width - size)) | 0,
              y = (Math.random() * (noise.height - size)) | 0;
          g.globalAlpha = 4 / size;
          g.drawImage(noise, x, y, size, size, 0, 0, canvas.width, canvas.height);
      }

      g.restore();
      return canvas;
    };
//----------------------------------------------------------------------
    this.GetPixel = function(x, y) {
      x = tile(x);
      y = tile(y);
      //var roll = ctx.getImageData(x, y, 1, 1).data[0];
      var roll = imgData.data[(y* side * 4) + (x * 4)];
      if(roll > this.max)
        this.max = roll;
      return roll;
    };
//----------------------------------------------------------------------
    function createCanvas(w, h) {
      var c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      return c;
    }
//----------------------------------------------------------------------
  function tile(n){
    var range = side - 1;
    return Math.abs(((n + range) % (range * 2)) - range);
  }
//----------------------------------------------------------------------
    var canvas = createCanvas(side, side);
    canvas = this.perlinNoise(canvas);
    var ctx = canvas.getContext("2d");
    var imgData = ctx.getImageData(0, 0, side, side);
    //var sourceBuffer32 = new Uint32Array(myGetImageData.data.buffer);
  };

}]);
