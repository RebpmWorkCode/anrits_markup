$(document).ready(function(){

    $('#showHideSocial').click(function(){

        if ($('#socialIcon').is(':hidden')) {
            $('#socialIcon').show('slow');
        } else {
            $('#socialIcon').hide('slow');
        }
        return false;

    });

});
