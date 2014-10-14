(function(){
    action.eventMe({
        init: function(){
            var that = this
                , moveCount = 0

                , checkMoveCount = function(){
                    moveCount++;

                    if(moveCount >= 9){
                        that.emit('game:tie');
                        that.emit('game:reset');
                    }
                }
                
                , getValueAsNumber = function (attribIn) {
                    return parseInt(attribIn.value, 10);
                }

                , boxes = document.querySelectorAll('.game-board--box');

            [].forEach.call(boxes, function(box){
                box.addEventListener('click', function(){
                    var row = getValueAsNumber(box.attributes['data-row'])
                        , col = getValueAsNumber(box.attributes['data-col']);

                    if(box.textContent === ''){
                        box.textContent = that.active;
                        action.emit('game:move:' + that.active, {row: row, col: col});
                    }
                });
            });

            that.listen('game:win', function(id){
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
            });

            that.listen('game:setup', function(){
                that.active = 'x';

                if(!that.setup){
                    that.setup = true;

                    that.emit('game:newplayer', 'x');
                    that.emit('game:newplayer', 'o');
                }

                //reset the board
                [].forEach.call(boxes, function(box){
                    box.textContent = '';
                });

                that.emit('game:start');
            });
        }
    });
})()