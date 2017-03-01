/*jslint browser: true*/
/*global $, jQuery, alert*/
//Send Post request to server with credentials
$(document).ready(function () {
    "use strict";    
   
    $(function () {
    $('#topsearchbutton').on('click', function(event) {
        event.preventDefault();
        $('#search').addClass('open');
        $('#search > form > input[type="search"]').focus();
    });
    
    $('#search, #search button.close').on('click keyup', function(event) {
        if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
            $(this).removeClass('open');
        }
    });
    
    
   
});      
    
});
