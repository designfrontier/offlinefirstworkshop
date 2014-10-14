(function () {
    action.eventMe({
        init: function () {
            var that = this
                , scoreBoard = {}
                , dom = document.querySelector('.game-keeper')
                , localforage = window.localforage;

            //get the scoreboard from local db
            localforage.getItem('scoreboard').then(function(doc){
                if(doc !== null && typeof doc !== 'undefined'){
                    scoreBoard = doc;
                }
            });

            that.listen('game:win', function(id){
                scoreBoard[id]++;

                dom.textContent = 'X: ' + scoreBoard.x + ' | O: ' + scoreBoard.o;
                dom.classList.remove('hidden');

                //persist this offline
                localforage.setItem('scoreboard', scoreBoard);
            });

            that.listen('game:reset', function(){
                dom.classList.add('hidden');
            });

            that.listen('game:addplayer', function (obj) {
                if(typeof scoreBoard[obj.id] === 'undefined'){
                    scoreBoard[obj.id] = 0;
                }
            });
        }
    });
})();