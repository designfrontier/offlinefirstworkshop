$(function(){
    'use strict';
    
    action.listen('actor:change', function(actor){
        $('#actorImage').attr('src', actor.get('image'));
    });
});