(function (exportMe) {
    var createPlayer = function (objIn) {
        var obj = action.eventMe(objIn || {})
            , moves = [
                [0,0,0]
                , [0,0,0]
                , [0,0,0]
            ]

            , checkWin = function () {
                //Matrix determinant... math!
                //  |A| = a(ei - fh) - b(di - fg) + c(dh - eg)
                //  !! converts to boolean
                //  true means a win
                if(!!(moves[0][0](moves[1][1] * moves[2][2] - moves[1][2] * moves[2][1]) - moves[0][1] (moves[1][0] * moves[2][2] - moves[1][2] * moves[2][0]) + moves[0][2](moves[1][0] * moves[2][1] - moves[1][1] * moves[2][0]))){
                    obj.emit('game:win', obj.id);
                }
            };

        if( typeof obj.id === 'undefined' ){
            id = 'x';
        }

        obj.setMove = function(row, col){
            moves[row][col] = 1;
            checkWin();
        };

        return obj;
    };

    exportMe = {createPlayer: createPlayer};

})((typeof module !== 'undefined' && module.exports) || window.ticTac)