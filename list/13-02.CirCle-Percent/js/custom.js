$(document).ready(function() {
    var $round = $('.round'),
        roundRadius = $round.find('circle').attr('r'),
        roundPercent = $round.data('percent'),
        roundDuration = $round.data('duration'),
        roundCircum = 2 * roundRadius * Math.PI,
        roundDraw = roundPercent * roundCircum / 100;

    $round.css({
        'transition-duration' : roundDuration + 's',
        'stroke-dasharray' : roundDraw  + ' 999'
    })

    $('.percent .num').prop('Counter', 0).stop().animate({
        Counter: parseInt(roundPercent)
    }, {
        duration: roundDuration * 1000,
        step : (now) => {
            $('.percent .num').text(Math.ceil(now));
        }
    });
});

$(function(){
    console.log('Circle Percent');
});