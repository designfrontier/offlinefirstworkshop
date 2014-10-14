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

                arr[1] = arrayIn[1][1];
                
                if(leftRight){
                    arr[0] = arrayIn[0][0];
                    arr[2] = arrayIn[2][2];
                } else {
                    arr[0] = arrayIn[0][2];
                    arr[2] = arrayIn[2][0];
                }

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
            }

            , setMove = function(objIn){
                moves[objIn.row][objIn.col] = 1;
                checkWin();
            };

        if( typeof obj.id === 'undefined' ){
            obj.id = 'x';
        }

        obj.listen('game:move:' + obj.id, setMove);

        obj.listen('game:reset', function() {
            moves = [[0,0,0], [0,0,0], [0,0,0]];
        });

        return obj;
    };

    exportMe['createPlayer'] = createPlayer;

})((typeof module !== 'undefined' && module.exports) || window.ticTac)