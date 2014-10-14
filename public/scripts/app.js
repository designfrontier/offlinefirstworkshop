(function(){
    var boxes = document.querySelectorAll('.game-board--box')
        
        , getValueAsNumber = function (attribIn) {
            return parseInt(attribIn.value, 10);
        };

    window.ticTac = {};

    window.ticTac.game = action.eventMe({
        init: function(){
            var that = this
                , moveCount = 0

                , checkMoveCount = function(){
                    moveCount++;

                    if(moveCount >= 9){
                        winner.textContent = 'Cats Game :-(';
                        winner.classList.remove('hidden');

                        that.emit('game:reset');
                    }
                }

                , winner = document.querySelector('.start-game--victor');

            that.listen('game:win', function(id){
                //do something to show who wins...
                winner.textContent = id.toUpperCase() + ' Wins!';
                winner.classList.remove('hidden');

                that.emit('game:reset');
            });

            that.listen('game:start', function(){
                that.active = 'x';
            });

            that.listen('game:move:x', function(){
                that.active = 'o';
                checkMoveCount();
            });

            that.listen('game:move:o', function(){
                that.active = 'x';
                checkMoveCount();
            });

            that.listen('game:reset', function(){
                moveCount = 0;

                //display the start dialog
                document.querySelector('.start-game').classList.remove('hidden');
            });

            that.listen('game:setup', function(){
                that.active = 'x';

                if(typeof that.players === 'undefined'){
                    //we recycle the players so no reason to recreate
                    //  after initial setup

                    console.log('creating players');

                    that.players = [];

                    that.players.push(ticTac.createPlayer({id:'x'}));
                    that.players.push(ticTac.createPlayer({id:'o'}));
                }

                //reset the board
                [].forEach.call(boxes, function(box){
                    box.textContent = '';
                });

                that.emit('game:start');
            });
        }
    });

    [].forEach.call(boxes, function(box){
        box.addEventListener('click', function(){
            var row = getValueAsNumber(box.attributes['data-row'])
                , col = getValueAsNumber(box.attributes['data-col']);

            box.textContent = ticTac.game.active;
            action.emit('game:move:' + window.ticTac.game.active, {row: row, col: col});
        });
    });

    document.querySelector('.start-game--button').addEventListener('click', function(){
        //set up the game
        ticTac.game.emit('game:setup');

        document.querySelector('.start-game').classList.add('hidden');
    });
})()