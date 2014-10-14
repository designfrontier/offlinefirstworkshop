(function () {
    var victor = action.eventMe({
        init: function () {
            var that = this
                , dom = document.querySelector('.victor');

            that.listen('game:win', function(id){
                dom.textContent = id.toUpperCase() + ' Wins!';

                dom.classList.remove('hidden');
            });

            that.listen('game:tie', function(){
                dom.textContent = 'No one wins :-(';

                dom.classList.remove('hidden');
            });

            that.listen('game:reset', function(){
                dom.classList.add('hidden');
            });
        }
    });
})()