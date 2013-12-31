function feriengame(gamefield,stage) {
  this.state = "init";
  this.stage = stage;
  this.gamefield = gamefield;
  
  this.playerCards = [];
  this.npcCards = [];

  this.start = function() {
    this.state = "start";
    this.gamefield.displayFrontscreen(this.stage, this);
  }

  this.round = function() {
    this.state = "round-begin";
    this.gamefield.displayCard(this.playerCards[0],this.stage,this);
  }
  
  this.finishGame = function() {
      this.start();
  }

  this.finishRound = function(selector) {
    this.state = "round-end";
    var winner = this.gamefield.evaluateWinner(this.playerCards[0],this.npcCards[0],selector);
    var wintext = "";
    if (winner == -1) { this.state = "round-end-winner-player"; wintext="Player wins"; }
    if (winner == 0) { this.state = "round-end-draw"; wintext="Draw";}
    if (winner == 1) { this.state = "round-end-winner-npc"; wintext = "Computer wins"; }
    
    this.gamefield.displayDualCard(this.playerCards[0],this.npcCards[0],wintext,this.stage);
    stage.removeAllEventListeners();
    stage.addEventListener("click",this);
    
  }
  this.newRound = function() {
    /* If game is not finished */
    if (this.state.indexOf("round-end-") == 0)
    {
      var pc = this.playerCards.splice(0,1);
      var npcc = this.npcCards.splice(0,1);
      if (this.state == "round-end-winner-player"){
       this.playerCards.push(pc);
       this.playerCards.push(npcc);
      }
      if (this.state == "round-end-winner-npc"){
       this.npcCards.push(pc);
       this.npcCards.push(npcc);
      }
      if (this.state == "round-end-draw"){
       this.playerCards.push(pc);
       this.npcCards.push(npcc);
      }
    }

    if (this.playerCards.length == 0 || this.npcCards.length==0) this.finishGame();
    else this.round();
    
  }

  this.newGame = function() {
      var cardcount=this.gamefield.getCardCount();
      var cards_tmp= [];
      for (var i=0; i < cardcount; i++)
      {
        cards_tmp.push(i);
      }
      cards_tmp = shuffleArray(cards_tmp);
      this.playerCards = cards_tmp.splice(0, cards_tmp.length/2);
      this.npcCards = cards_tmp;
     
   
      this.newRound();
  }

  this.handleEvent = function(event){
    if (this.state.indexOf("round-end-")==0){
      this.newRound();
      event.stopPropagation();
    }
    else if (this.state=="round-begin")
    {
      if (event.target.name == "bathrooms-selector" ||
          event.target.name == "bedrooms-selector" ||
          event.target.name == "boatdistance-selector" ||
          event.target.name == "price-selector")
      {
         this.finishRound(event.target.name);
      }
      event.stopPropagation();
    }
    else if (event.target.name=="start")
    {
      this.newGame();
      event.stopPropagation();
    }
  }




}
