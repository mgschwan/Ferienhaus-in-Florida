function scaleToFit(image, width, height) {
    var bounds = image.getBounds();
    if (bounds.width != width || bounds.height != height)
    {
      var xscale = width/bounds.width;
      var yscale = height/bounds.height;
      image.setTransform(0,0,xscale,yscale);
    }
    return image;
}


shuffleArray = function (data) {
  var result = [];
  var elements = data.length;
  var tmp = data.splice(0);
  for (var i=0; i < elements; i++)
  {
    result.push(tmp.splice(Math.floor(Math.random() * (elements-i)),1));
  }
  return result;
}
