(function(){
    var boxes = document.querySelectorAll('.game-board--box');

    window.ticTac = {};

    window.ticTac.game = action.eventMe({
        init: function(){
            var that = this;

            that.listen('game:win', function(id){
                console.log(id + 'wins!');

                that.emit('game:reset');
            });

            that.listen('game:start', function(){
                that.active = 'x';
            });

            that.listen('game:move:x', function(){
                that.active = 'o';
            });

            that.listen('game:move:o', function(){
                that.active = 'x';
            });
        }
    });

    [].forEach.call(boxes, function(box){
        box.addEventListener('click', function(){
            box.textContent = ticTac.game.active;
            action.emit('game:move:' + window.ticTac.game.active, {row: box.attributes['data-row'], col: box.attributes['data-col']});
        });
    });

    document.querySelector('.start-game--button').addEventListener('click', function(){
        //set up the game
        ticTac.active = 'o';
        ticTac.players = [];

        ticTac.players.push(ticTac.createPlayer({id:'x'}));
        ticTac.players.push(ticTac.createPlayer({id:'o'}));

        ticTac.game.emit('game:start');

        document.querySelector('.start-game').classList.add('hidden');
    });
})()