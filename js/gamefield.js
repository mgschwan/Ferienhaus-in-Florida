function gamefield()
{
  this.all_cards = loadCards(cards_data /* stored in cards.json */);

  this.cardImage = null;
  this.texts = [];

  /* Display card number cardNr on stage */
  this.displayCard = function(cardNr, stage) {
    if (this.cardImage != null) stage.removeChild(this.cardImage);
    for (var t in this.texts)
    {
      stage.removeChild(this.texts[t]);
    }

    var card = this.all_cards[cardNr];
    this.cardImage = card.getImage();
    stage.addChild(this.cardImage);
    this.texts.push(new createjs.Text(card.getName(),"bold 24px Arial","#333333").setTransform(22,27));
    this.texts.push(new createjs.Text(card.getName(),"bold 24px Arial","#e7e7e7").setTransform(20,25));
        
    this.texts.push(new createjs.Text("Bathrooms: "+this.all_cards[cardNr].getBathrooms(),"bold 24px Arial","#333333").setTransform(22,62));
    this.texts.push(new createjs.Text("Bathrooms: "+this.all_cards[cardNr].getBathrooms(),"bold 24px Arial","#e7e7e7").setTransform(20,60));
    this.texts.push(new createjs.Text("Bedrooms: "+this.all_cards[cardNr].getBedrooms(),"bold 24px Arial","#333333").setTransform(22,102));
    this.texts.push(new createjs.Text("Bedrooms: "+this.all_cards[cardNr].getBedrooms(),"bold 24px Arial","#e7e7e7").setTransform(20,100));
    this.texts.push(new createjs.Text("Price: "+this.all_cards[cardNr].getPrice(),"bold 24px Arial","#333333").setTransform(22,142));
    this.texts.push(new createjs.Text("Price: "+this.all_cards[cardNr].getPrice(),"bold 24px Arial","#e7e7e7").setTransform(20,140));

    for (var t in this.texts)
    {
      stage.addChild(this.texts[t]); 
    }
  }
  
}
