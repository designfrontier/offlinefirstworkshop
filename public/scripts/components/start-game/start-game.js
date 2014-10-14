(function () {
    action.eventMe({
        init: function () {
            var that = this
                , dom = document.querySelector('.start-game--button')
                , domBG = document.querySelector('.start-game');

            that.listen('game:reset', function(){
                domBG.classList.remove('hidden');
            });

            dom.addEventListener('click', function(){
                //set up the game
                that.emit('game:setup');

                domBG.classList.add('hidden');
            });
        }
    });
})();