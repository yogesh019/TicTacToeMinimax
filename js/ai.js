var AIAction=function(pos){

    this.movePosition=pos;
    this.minimaxVal=0;

    this.applyTo=function(state){

        var next=new State(state);
        next.board[this.movePosition]=state.turn;

        if(state.turn==="O")
            next.oMovesCount++;

        next.advanceTurn();
        
        return next;

    };


};
AIAction.ASCENDING=function(firstAction,secondAction){

    return firstAction.minimaxVal-secondAction.minimaxVal;
};

var AI=function(level){

    var levelOfIntelligence=level;
    var game={};


    function minimaxValue(state){
        if(state.isTerminal()){
            return Game.score(state);
        }
        else{
                var stateScore;
                if(state.turn==="X")
                    stateScore=-1000;
                else
                    stateScore=1000;

            var availablePositions=state.EmptyCells();
            var availableNextStates=[];
            for(var itr=0;itr<availablePositions.length;itr++){
                var action=new AIAction(availablePositions[itr]);
                var next=action.applyTo(state);
                availableNextStates.push(next);
             }

    for(var itr=0;itr<availableNextStates.length;itr++){

        var nextStateScore=minimaxValue(availableNextStates[itr]);

            if(state.turn==="X"){
                if(stateScore<nextStateScore)
                    stateScore=nextStateScore;
            }else{
                if(stateScore>nextStateScore)
                    stateScore=nextStateScore;
            }
        }        

    return stateScore;
    }

}

    
    function takeABlindMove(turn){

          var available = game.currentState.EmptyCells();
    var randomCell = available[Math.floor(Math.random() * available.length)];
    var action = new AIAction(randomCell);

    var next = action.applyTo(game.currentState);

    ui.insertAt(randomCell, turn);

    game.advanceTo(next);
    

    }

  function takeANoviceMove(turn){


    var available=game.currentState.EmptyCells();

    var availableActions=[];
    for(var itr=0;itr<available.length;itr++){
        var action=new AIAction(available[itr]);
        var next=action.applyTo(game.currentState);
        action.minimaxVal=minimaxValue(next);
        availableActions.push(action);
    }
    availableActions.sort(AIAction.ASCENDING);

    var  chosenAction;
    if(Math.random()<=0.5){
        chosenAction=availableActions[0];
    }
    else{
        if(availableActions.length>=2){
            chosenAction=availableActions[1];
        }else{
            chosenAction=availableActions[0];
        }
    }
    var next=chosenAction.applyTo(game.currentState);
    ui.insertAt(chosenAction.movePosition,turn);
    game.advanceTo(next);


  }

  function takeAMasterMove(turn){

    var available=game.currentState.EmptyCells();

    var availableActions=[];
    for(var itr=0;itr<available.length;itr++){
        var action=new AIAction(available[itr]);
        var next=action.applyTo(game.currentState);
        action.minimaxVal=minimaxValue(next);
        availableActions.push(action);
    }
    availableActions.sort(AIAction.ASCENDING);

    var  chosenAction=availableActions[0];
    var next=chosenAction.applyTo(game.currentState);
    ui.insertAt(chosenAction.movePosition,turn);
    game.advanceTo(next);

  }


    this.plays=function(_game){
        game=_game;
    };


    this.notify=function(turn){
        switch(levelOfIntelligence){
            case "blind":takeABlindMove(turn);
                             break;

            case "novice":takeANoviceMove(turn);
                            break;

            case "master" : takeAMasterMove(turn);
                            break;

        }
    }
};