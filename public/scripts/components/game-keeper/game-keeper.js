(function () {
    action.eventMe({
        init: function () {
            var that = this
                , scoreBoard = {}
                , dom = document.querySelector('.game-keeper')
                , localforage = window.localforage;

            that.listen('game:win', function(id){
                scoreBoard[id]++;

                dom.textContent = 'X: ' + scoreBoard.x + ' | O: ' + scoreBoard.o;
                dom.classList.remove('hidden');
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