
var globals={};
var selectedDifficulty;

var el=document.querySelectorAll(".level");
//console.log(el);
function fun(){
    
        console.log(this.id);
        selectedDifficulty=this.id;
    if(typeof selectedDifficulty!=="undefined"){
    
        var aiPlayer=new AI(selectedDifficulty);
        globals.game  =new Game(aiPlayer);
        aiPlayer.plays(globals.game);
        globals.game.start();

    }
}
for(var itr=0;itr<el.length;itr++){
	/*
    document.getElementById(el[itr].id).addEventListener("click",function(){
		console.log(this.id);
		selectedDifficulty=this.id;
	});
    **/
    document.getElementById(el[itr].id).addEventListener("click",fun);
}

function anotherfun(){
    
    if(globals.game.status === "running" && globals.game.currentState.turn === "X" && this.className!=="cell occupied") {
          //  console.log(this.className);
            //console.log("yogesh");
             var indx = parseInt(this.dataset.index);

             var next = new State(globals.game.currentState);
             next.board[indx] = "X";

       
             ui.insertAt(indx, "X");	
            next.advanceTurn();

    	console.log("in anotherfun",next.turn);
             globals.game.advanceTo(next);

         }

}

function again(){
document.querySelector(".re-start").style.display="none";
document.querySelector(".difficulty").style.display="block";    
}


for(var itr=0;itr<9;itr++)

document.querySelectorAll(".cell")[itr].addEventListener("click",anotherfun);

