function countCircle(){
    var time
    ,   box = $('.chart .countNum')
    ,   num = parseInt(box.attr('data-time-set'))
    ,   count;

    box.attr('data-time-count', num).find('span').text(num);

    if ( box.siblings('svg').find('circle').length ){
        box.siblings('svg').find('circle').addClass('action').css({
            'animation-duration' : num + 's'
        });
    }

    function timer(){
        num = num - 1;
        box.attr('data-time-count', num).find('span').text(num);
        count = num;

        if ( count === 0 ){
            clearInterval(time);
            box.siblings('svg').find('circle').removeClass('action');
            return;
        }
    };

    time = setInterval(timer, 1000);
}

$(function(){
    console.log('Circle Counter');

    countCircle();
});