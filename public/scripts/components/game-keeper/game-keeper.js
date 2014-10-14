(function () {
    var gameKeeper = action.eventMe({
        init: function () {
            var that = this
                , scoreBoard = {}
                , dom = document.querySelector('.start-game--overall');

            that.listen('game:win', function(id){
                scoreBoard[id]++;

                dom.textContent = 'X: ' + scoreBoard.x + ' | O: ' + scoreBoard.o;

                dom.classList.remove('hidden');
            });

            that.listen('game:reset', function(){
                dom.classList.add('hidden');
            });

            that.listen('game:addplayer', function (id) {
                if(typeof scoreBoard[id] === 'undefined'){
                    scoreBoard[id] = 0;
                }
            });
        }
    });
})()