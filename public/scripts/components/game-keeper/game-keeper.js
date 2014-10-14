(function () {
    var gameKeeper = action.eventMe({
        init: function () {
            var that = this
                , scoreBoard = {};

            that.listen('game:win', function(id){
                scoreBoard[id]++;

                console.log('X has won: ' + scoreBoard.x + ' O has won: ' + scoreBoard.o);
            });

            that.listen('game:addplayer', function (id) {
                if(typeof scoreBoard[id] === 'undefined'){
                    scoreBoard[id] = 0;
                }
            });
        }
    });
})()