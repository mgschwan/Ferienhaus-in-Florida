function halfTrapezoid(width, height, color) {
  var g = new createjs.Shape();
  
  g.graphics.lf([color,"rgba(0,0,0,0)"], [0, 1], 0, 0, width, 0).mt(0,0).lt(width,0).lt(width-height,height).lt(0,height).lt(0,0);
  
  //g.graphics.beginFill(color).mt(0,0).lt(width,0).lt(width-height,height).lt(0,height).lt(0,0);
  return g;
}

function invertedHalfTrapezoid(width, height, color) {
  var g = new createjs.Shape();
  
  g.graphics.lf([color,"rgba(0,0,0,0)"], [1, 0], 0, 0, width, 0).mt(0,0).lt(width,0).lt(width,height).lt(height,height).lt(0,0);
  
  //g.graphics.beginFill(color).mt(0,0).lt(width,0).lt(width-height,height).lt(0,height).lt(0,0);
  return g;
}
