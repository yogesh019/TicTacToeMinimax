var State=function(old){
	
	this.turn="";
	this.oMovesCount=0;
	this.result="still running";
	this.board=[];

	if(typeof old!=="undefined"){
		this.result=old.result;
		this.oMovesCount=old.oMovesCount;
		this.board=new Array(old.board.length);
		this.turn=old.turn;
		for(var itr=0;itr<old.board.length;itr++){
			this.board[itr]=old.board[itr];
		}

	}

	this.advanceTurn=function(){
		this.turn=this.turn==="X"?"O":"X";
	}
	this.EmptyCells=function(){
	
		var indxs=[];
		
		for(var itr=0;itr<this.board.length;itr++){
			if(this.board[itr]==="E")
				indxs.push(itr);
		}
		return indxs;

	};

	this.isTerminal=function(){

		for(var itr=0;itr<=6;itr=itr+3){
		
			if(this.board[itr]!=="E"&&this.board[itr]===this.board[itr+1]&&this.board[itr+1]===this.board[itr+2]){
				
				this.result=this.board[itr]+"-won";
				return true;
			}		
		}
	
		for(var itr=0;itr<=2;itr++){
			if(this.board[itr]!=="E"&&this.board[itr]===this.board[itr+3]&&this.board[itr+3]===this.board[itr+6]){
				this.result=this.board[itr]+"-won";
				return true;
			}
		}
	

		if(this.board[0]!=="E"&&this.board[0]===this.board[4]&&this.board[4]===this.board[8]){
			this.result=this.board[0]+"-won";
			return true;
		}

		if(this.board[2]!=="E"&&this.board[2]===this.board[4]&&this.board[4]===this.board[6]){
			this.result=this.board[2]+"-won";
			return true;
		}

		if(this.EmptyCells().length===0){
			this.result="draw";
			return true;
		}
		else{
			return false;
		}

	};


};


var Game=function(autoPlayer){

	this.ai=autoPlayer;
	this.currentState=new State();
	this.status="begining";
	this.currentState.board=["E","E","E","E","E","E","E","E","E"];

	this.currentState.turn="X";

	this.advanceTo=function(_state){

		this.currentState=_state;
		if(_state.isTerminal()){

			document.getElementById("human").style.display="none";
			document.querySelector(".initial").style.display="none";
			
console.log("execute");
        
   var el= document.createElement("div");
   el.innerHTML="Restart";
   el.className="re-start";
   document.querySelector(".initial").appendChild(el);
   document.querySelectorAll(".re-start")[0].addEventListener("click",again);

			this.status="ended";
			if(_state.result==="X-won"){
				document.getElementById("won").style.display="block";
			}

			else if(_state.result==="O-won"){
				document.getElementById("lost").style.display="block";
			}

			else{
				document.getElementById("draw").style.display="block"
			}
		}else{
			
			if(this.currentState.turn==="X"){

				
			document.getElementById("human").style.display="block";
			document.querySelector(".initial").style.display="none";
				if(!this.currentState.oMovesCount){	
					
					$('.intial').fadeOut({
           				 duration : "slow",
           	   	   		 done : function() {
                 			
                 			$("#human").fadeIn("fast");
                  			}
        				});
			
				}
		

			  else{

					  $("#human").fadeOut({
            			
            			duration: "fast",
            			done: function() {
                 		$("#human").fadeIn("fast");
            			}
        			});
				}

			}
			else{
				console.log("o-turn");
				this.ai.notify("O");
			}
		}

	};

	this.start=function(){

		if(this.status==="begining"){
			this.status="running";
			this.advanceTo(this.currentState);
		}
	};

	};



Game.score=function(_state){

	if(_state.result!=="still running"){

		if(_state.result==="X-won")
			return 10-_state.oMovesCount;


		if(_state.result==="O-won")
			return -10+_state.oMovesCount;
	
		else{
			return 0;
		}
	}

};