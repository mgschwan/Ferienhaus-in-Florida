var image_base_path="img/villa/";
var card_font = "Fascinate Inline Regular";

function card(options) {
  
  this.villaname = options["name"];
  this.price = options["price"];
  this.bathrooms = options["bathrooms"];
  this.bedrooms = options["bedrooms"];
  this.price = options["price"];
  this.boatingdistance = options["boatingdistance"];
  this.image = new createjs.Bitmap(image_base_path+options["image"]);
}

card.prototype.getName = function() { return this.villaname;}

card.prototype.getImage = function(width,height) { 
    /* The size adjustment only works if the image is already loaded
     * That is why preloadjs must be used
     */
    return scaleToFit(this.image, width, height);
    
}
card.prototype.getBathrooms = function() { return this.bathrooms; }
card.prototype.getBedrooms = function() { return this.bedrooms; }
card.prototype.getPrice = function() { return this.price; }
card.prototype.getBoatingDistance = function() { return this.boatingdistance; }

card.prototype.display = function (stage, width, height, eventtarget) {
    var img = this.getImage(width,height);
    img.mask = null; /* Mask may have been set in displaySemi */
    stage.addChild(img);
   
    fontsize=parseInt(height/20);
    fontsize_big=parseInt(1.2*height/20);
    
    var texts = [];
    texts.push(new createjs.BitmapText(this.getName(),global_fontsheet).setTransform(width/100,height/50));
    
    //texts.push(new createjs.Text(this.getName(),"bold "+fontsize_big+"px 'Fascinate Inline'","#e7e7e7").setTransform(width/100,height/50));
    
    var element;
    element = new createjs.Text("Bathrooms: "+this.getBathrooms(),"bold "+fontsize+"px "+card_font,"#e7e7e7").setTransform(width/100,2*height/10);
    element.set({"name":"bathrooms-selector"});
    element.addEventListener("click",eventtarget);
    texts.push(element);
    
    element = new createjs.Text("Bedrooms: "+this.getBedrooms(),"bold "+fontsize+"px "+card_font,"#e7e7e7").setTransform(width/100,3*height/10);
    element.set({"name":"bedrooms-selector"});
    element.addEventListener("click",eventtarget);
    texts.push(element);
    
    element = new createjs.Text("Gulf distance: "+this.getBoatingDistance(),"bold "+fontsize+"px "+card_font,"#e7e7e7").setTransform(width/100,4*height/10);
    element.set({"name":"boatdistance-selector"});
    element.addEventListener("click",eventtarget);
    texts.push(element);
    
    element = new createjs.Text("Price: "+this.getPrice(),"bold "+fontsize+"px "+card_font,"#e7e7e7").setTransform(width/100,5*height/10);
    element.set({"name":"price-selector"});
    element.addEventListener("click",eventtarget);
    texts.push(element);
    
    for (var t in texts)
    {
      var bounds = texts[t].getTransformedBounds();
      var background = halfTrapezoid(1.4*bounds.width+bounds.height+20,bounds.height*1.4,"#333333").setTransform(0,bounds.y-bounds.height*0.2);
      background.set({"name":texts[t].name});
      background.addEventListener("click",eventtarget);
      stage.addChild(background);
      
      stage.addChild(texts[t]); 
    }
}

card.prototype.displaySemi = function (stage, width, height) {
    
    var img = this.getImage(width,height);
    img.mask = new createjs.Shape();
    img.mask.graphics.beginFill("#fff").mt(width*0.6,0).lt(width*0.4,height).lt(width,height).lt(width,0).closePath();
    stage.addChild(this.getImage(width, height));
    var divider=new createjs.Shape();
    divider.graphics.beginStroke("#fff").setStrokeStyle("10").mt(width*0.6,0).lt(width*0.4,height);
    stage.addChild(divider);
    
    fontsize=parseInt(height/20);
    fontsize_big=parseInt(1.2*height/20);
    
    var texts = [];
    texts.push(new createjs.BitmapText(this.getName(),global_fontsheet));
    var bounds = texts[texts.length-1].getBounds();
    texts[texts.length-1].setTransform(width-bounds.width-3*width/100,height-bounds.height-height/50);
    
    //texts.push(new createjs.Text(this.getName(),"bold "+fontsize_big+"px 'Fascinate Inline'","#e7e7e7").setTransform(width/100,height/50));
    
    texts.push(new createjs.Text("Bathrooms: "+this.getBathrooms(),"bold "+fontsize+"px "+card_font,"#e7e7e7"));
    var w = texts[texts.length-1].getBounds().width;
    texts[texts.length-1].setTransform(width-w-3*width/100,height-2*height/10);

    texts.push(new createjs.Text("Bedrooms: "+this.getBedrooms(),"bold "+fontsize+"px "+card_font,"#e7e7e7"));
    w = texts[texts.length-1].getBounds().width;
    texts[texts.length-1].setTransform(width-w-3*width/100,height-3*height/10);

    texts.push(new createjs.Text("Gulf distance: "+this.getBoatingDistance(),"bold "+fontsize+"px "+card_font,"#e7e7e7"));
    w = texts[texts.length-1].getBounds().width;
    texts[texts.length-1].setTransform(width-w-3*width/100,height-4*height/10);

    texts.push(new createjs.Text("Price: "+this.getPrice(),"bold "+fontsize+"px "+card_font,"#e7e7e7"));
    w = texts[texts.length-1].getBounds().width;
    texts[texts.length-1].setTransform(width-w-3*width/100,height-5*height/10);
    
       
    for (var t in texts)
    {
      var bounds = texts[t].getTransformedBounds();
      stage.addChild(invertedHalfTrapezoid(1.4*bounds.width+bounds.height,bounds.height*1.4,"#333333").setTransform(width-(1.4*bounds.width+bounds.height),bounds.y-bounds.height*0.2));
      stage.addChild(texts[t]); 
    }
}

/* Card comparison methods to evaluate the winner */
card.prototype.compare = function(otherCard, selector) {
  var winner = "high"; /* Decide if higher or lower values win */
  var tmp_other, tmp_self;
  if (selector == "bathrooms-selector"){ tmp_self = this.getBathrooms(); tmp_other = otherCard.getBathrooms(); }
  if (selector == "bedrooms-selector") { tmp_self = this.getBedrooms(); tmp_other = otherCard.getBedrooms(); }
  if (selector == "boatdistance-selector") { tmp_self = this.getBoatingDistance(); tmp_other = otherCard.getBoatingDistance(); winner="low";}
  if (selector == "price-selector") {tmp_self = this.getPrice(); tmp_other = otherCard.getPrice(); winner="low";}
  
  if (tmp_other == tmp_self) return 0;
  if (tmp_other > tmp_self)
  {
    if (winner=="low") return -1;
    return 1
  }
  
  if (winner=="low") return 1;
  return -1;
}





function loadCards(jsondata, preloadQueue) {
  var cards = [];
  
  for (var i = 0; i < jsondata.length; i++)
  {
      preloadQueue.loadFile(image_base_path+jsondata[i]["image"]);
      cards.push(new card(jsondata[i]));
  }
  return cards;
}
