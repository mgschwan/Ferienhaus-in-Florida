var image_base_path="img/villa/";

function card(options) {
  
  this.villaname = options["name"];
  this.price = options["price"];
  this.bathrooms = options["bathrooms"];
  this.bedrooms = options["bedrooms"];
  this.price = options["price"];
  this.image = new createjs.Bitmap(image_base_path+options["image"]);
  
}
card.prototype.getName = function() { return this.villaname;}
card.prototype.getPrice = function() { return this.price; }
card.prototype.getImage = function() { return this.image; }
card.prototype.getBathrooms = function() { return this.bathrooms; }
card.prototype.getBedrooms = function() { return this.bedrooms; }
card.prototype.getPrice = function() { return this.price; }


function loadCards(jsondata) {
  var cards = [];
  
  for (var i = 0; i < jsondata.length; i++)
  {
      cards.push(new card(jsondata[i]));
  }
  return cards;
}
