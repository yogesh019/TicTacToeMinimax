
/*
 * ui object encloses all UI related methods and attributes
 */
var ui = {};


ui.insertAt = function(indx, symbol) {
    

    var board = $('.cell');
    var targetCell = $(board[indx]);

    if(!targetCell.hasClass('occupied')) {
        targetCell.html(symbol);
        targetCell.css({
            color : symbol == "X" ? "white" : "black"
        });
        targetCell.addClass('occupied');
    }
}