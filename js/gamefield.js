function gamefield(preloadQueue, width, height, stage)
{
  
  this.preloadQueue = preloadQueue;
  this.all_cards = loadCards(cards_data /* stored in cards.json */, this.preloadQueue);
  this.width = width;
  this.height = height;
  preloadQueue.loadFile("img/frontscreen.png");
  preloadQueue.loadFile("img/startbutton.png");
  this.frontscreen=new createjs.Bitmap("img/frontscreen.png");
  this.startbutton=new createjs.Bitmap("img/startbutton.png");
  
  this.stage = stage;
    
  this.getCardCount = function() { return this.all_cards.length; }  
    
  /* Display card number cardNr on stage */
  this.displayCard = function(cardNr, stage, eventtarget) {
    stage.removeAllChildren();
    var card = this.all_cards[cardNr];
    card.display(stage, this.width, this.height, eventtarget);
  }
  
  this.displayDualCard = function(cardNr1, cardNr2, winner, stage) {
    stage.removeAllChildren();
    var card1 = this.all_cards[cardNr1];
    var card2 = this.all_cards[cardNr2];
    card1.display(stage,this.width,this.height);
    card2.displaySemi(stage,this.width,this.height);


    var wintext = new createjs.BitmapText(winner,global_fontsheet);
    var bounds = wintext.getBounds();
    wintext.setTransform(this.width/2-bounds.width/2,this.height/2-bounds.height/2);
    stage.addChild(wintext);
  }
  
  this.displayFrontscreen = function(stage, eventtarget) {
    stage.removeAllChildren();
    stage.addChild(scaleToFit(this.frontscreen, this.width, this.height));
    var button = scaleToFit(this.startbutton, this.width/5, this.height/5).setTransform(this.width/2-this.width/10,(1.3*this.height/2)-this.height/10);
    button.alpha=0.8;
    button.set({"name":"start"});
    button.removeAllEventListeners();
    button.addEventListener("click", eventtarget);
    stage.addChild(button);
  }
  
  this.evaluateWinner = function(cardNr1, cardNr2, selector)
  {
    return this.all_cards[cardNr1].compare(this.all_cards[cardNr2],selector);
  }
  
  
  
  
  this.resize = function(width,height) {
    this.width = width;
    this.height = height;
  }
  
}
