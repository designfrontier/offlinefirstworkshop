$(function(){
    'use strict';
    
    $('#changeActors').click(function(){
        action.emit('cast:movie');
    });
});