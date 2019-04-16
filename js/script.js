
$(document).ready(function () {
    $('.parts__pin').mousemove(function(e){
        var X = e.pageX;
        var Y = e.pageY;
        var top = Y  + 'px';
        var left = X  + 'px';
        var id = $(this).data('tooltip');
        $('#tip-'+id).css({
            display:"block",
            top: top,
            left: left
        });
    });
    $('.parts__pin').mouseout (function(){
        var id = $(this).data('tooltip');
        $('#tip-'+id).css({
            display:"none"
        });
    });
});

