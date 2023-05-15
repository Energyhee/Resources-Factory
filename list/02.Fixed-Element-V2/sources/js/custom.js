function ElementFix(opt){
    try{
        if( $(opt.obj).length > 0 ){
            var fixObj = $(opt.obj)
            ,   fixTop = fixObj.offset().top
            ,   winTop = 0;

            if(!fixObj.prev('.fixDummy').length) fixObj.before('<div class="fixDummy" style="height: 0; overflow: hidden;"></div>');
            if($(opt.sub).length){
                var subObj = $(opt.sub)
                ,   subTop = subObj.offset().top;

                $(opt.sub).before('<div class="subDummy" style="height: 0; overflow: hidden;"></div>');
            } 

            function elSub(obj, pos){
                if(pos > subTop){
                    $('.subDummy').attr('style', `height: ${subObj.outerHeight()}px;`);
                    obj.addClass('fixed').attr('style', `top: ${subTop}px;`);
                    if(opt.moving) elToggle(obj, pos, winTop);
                }else if(pos <= subTop){
                    $('.subDummy').attr('style', 'height: 0;');
                    obj.removeClass('fixed').attr('style', 'top: 0;');
                }
            }

            function elToggle(el, now, pre){
                var target = $(el);
                
                if( now >  pre ){
                    target.removeClass('show').addClass('hide');
                    // target.css('transform', `translateY(-${target.outerHeight()}px)`);
                }else if( now < pre ){
                    target.removeClass('hide').addClass('show');
                    // target.css('transform', 'translateY(0)');
                }
            };
            
            $(window).scroll(function(){
                var winPos = $(window).scrollTop();
                if(winPos > fixTop){
                    $('.fixDummy').attr('style', `height: ${fixObj.outerHeight()}px;`);
                    fixObj.addClass('fixed').attr('style', `top: ${fixTop}px;`);

                    if($(opt.sub).length) elSub(subObj, winPos, winTop);
                    if(opt.moving) elToggle(fixObj, winPos, winTop);

                }else if(winPos <= fixTop){
                    $('.fixDummy').attr('style', 'height: 0;');
                    fixObj.removeClass('fixed').attr('css', 'top: 0;');
                }
                winTop = winPos;
            }).trigger('scroll');
        }
    }catch(e){
        console.log('%c[ERROR]%c Find Element Error search for "ElementFix"', 'bold; color: red;", "color: beige');
    }
}

$(function(){
    console.log('Element Fixed Ver2');

    var fixedBasic = new ElementFix({
        state : true,
        moving : true,
        obj : '#header',
        sub : '.subHead'
    });
});