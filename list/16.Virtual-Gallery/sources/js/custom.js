let log = console.log;

function print(num1, num2, call){
    calcul(num1 + num2);
}

function calcul(val){
    console.log(val);
}

document.addEventListener('DOMContentLoaded', function(){
    console.log('virtual gallery');

    /* intro door action */
    var wrap = $('.intro-virtual-wrap');
    wrap.find('.open').on('click', function(){
        var btn = $(this)
        ,   href = btn.data('href')
        ,   door = wrap.find('.inside-wrap');

        wrap.addClass('closeUp');
        door.addClass('action');

        setTimeout(function(){
            log('move');
            // location.href = href;
        }, 2000);
    });
    print(1, 2, calcul);
});