(function (exportMe) {
    var createPlayer = function (objIn) {
        var obj = action.eventMe(objIn || {})
            , moves = [[0,0,0], [0,0,0], [0,0,0]]

            , sum = function (arrIn) {
                var arr = arrIn
                    , sum = 0;

                arr.forEach(function(item){
                    sum += item;
                });

                return sum;
            }

            , curriedVerticalSum = function(array1, array2, array3) {
                //not really a curried function... :-(
                var arr1, arr2, arr3;

                if(Array.isArray(array1)){
                    arr1 = array1;
                }

                if(Array.isArray(array2)){
                    arr2 = array2;
                }

                if(Array.isArray(array3)){
                    arr3 = array3;
                }

                return function (elem) {
                    return sum([arr1[elem], arr2[elem], arr3[elem]]);
                };
            }

            , diagSum = function(arrayIn, leftRight){
                var arr = [];

                if(leftRight){
                    arr[0] = arrayIn[0][0];
                    arr[2] = arrayIn[2][2];
                } else {
                    arr[0] = arrayIn[0][2];
                    arr[2] = arrayIn[2][0];
                }

                arr[1] = arrayIn[1][1];

                return sum(arr);
            }

            , checkWin = function () {
                var rowWin = !!(sum(moves[0]) === 3 || sum(moves[1]) === 3 || sum(moves[2]) === 3)
                    , colWin
                    , diagWin = !!(diagSum(moves, true) === 3 || diagSum(moves, false) === 3)

                    , verticalSum = curriedVerticalSum(moves[0], moves[1], moves[2]);

                colWin = !!(verticalSum(0) === 3 || verticalSum(1) === 3 || verticalSum(2) === 3)

                if (rowWin || colWin || diagWin) {
                    obj.emit('game:win', obj.id);
                }
            };

        if( typeof obj.id === 'undefined' ){
            obj.id = 'x';
        }

        obj.listen('game:move:' + obj.id, function(objIn){
            moves[objIn.row][objIn.col] = 1;

            //have I won?!
            checkWin();
        });

        obj.listen('game:reset', function() {
            //reset my moves
            moves = [[0,0,0], [0,0,0], [0,0,0]];
        });

        obj.emit('game:addplayer', obj.id);

        return obj;
    };

    exportMe['createPlayer'] = createPlayer;

})((typeof module !== 'undefined' && module.exports) || window.ticTac)