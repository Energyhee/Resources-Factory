// 해상도
function mediaCheck(){
    var media = [
            { desktop : window.matchMedia('(min-width:1025px)') },
            { tablet : window.matchMedia('(min-width:768px) and (max-width:1024px)') },
            { mobile : window.matchMedia('all and (max-width:767px)') }
        ];
    var state;

    media.forEach((item) => {
        if(Object.values(item)[0].matches){
            state = Object.keys(item)[0];
        }
    });
    return state;
};

// 공통 탭
function TabContent(sel, opt){
    var {
        setClass: sName,
        setCont: sCont,
        setFn: sFn,
    } = opt;

    function TabAction(num){
        $(sel).parent('li').removeClass(sName).eq(num).addClass(sName);
        if(sCont != undefined){
            $(sCont).removeClass('show').eq(num).addClass('show');
        }
        return false;
    };

    $(document).on('click', sel, (e) => {
        if(!$(e.currentTarget).parent('li').hasClass(sName)){
            var idx = $(e.currentTarget).parent('li').index();

            if(sFn != undefined){
                sFn($(e.currentTarget));
            }

            TabAction(idx);
        }
    });
}

// 애니메이션
function animationAction(opt){
    if(opt.state && $('[data-' + opt.obj + ']').length){
        $('[data-' + opt.obj + ']').each(function(){
            var obj = $(this)
            ,   type = obj.data('motion')
            ,   duration = obj.data('duration')
            ,   delay = obj.data('delay')
            ,   objTop = obj.offset().top
            ,   objSet;

            if(type === 'slide-up' || type === 'slide-down'){
                objSet = 'translateY(0px)';
            }else if(type === 'slide-left' || type === 'slide-right'){
                objSet = 'translateX(0px)';
            }else if(type === 'scale-up' || type === 'scale-down'){
                objSet = 'scale(1)';
            }else if(type === 'fade-in' || type === 'all'){
                objSet = '';
            }

            $(window).on('scroll', function(){
                var winScroll = $(document).scrollTop() || window.pageYOffset;
                if(winScroll > objTop - ($(window).height() * .7)){
                    if(obj.hasClass('action')) return false;
                    obj.css({
                        'transition-duration' : duration + 's',
                        'transition-delay' : delay + 's',
                        'transform' : objSet,
                        'opacity' : '1'
                    });
                    obj.addClass('action');
                }
            }).trigger('scroll');
        });
    }
}

// 모바일 전체메뉴
function moAllMenu(){
    $(document).on('click', '.m-all-btn', function(e){
        var allBtn = $(e.currentTarget)
        ,   allMenu = $('.gnb-wrapper');

        allBtn.toggleClass('on');
        moScrollDisable();

        if(allBtn.hasClass('on')){
            allMenu.addClass('active').fadeIn();
        }else{
            allMenu.removeClass('active').fadeOut();
        }
    });
}

// 스크롤 막기
function moScrollDisable(){
    if($('body').hasClass('sc-disable')){
        $('body').removeClass('sc-disable');
    }else{
        $('body').addClass('sc-disable');
    }
}

$(document).ready(function(){
    console.log(mediaCheck());
    
    if (mediaCheck() === 'desktop' ){
        // 헤더
        $(document).on({
            mouseenter: (e) => {
                $(e.currentTarget).addClass('on');
            },
            mouseleave: (e) => {
                $(e.currentTarget).removeClass('on');
            }
        }, '.gnb-wrap .depth1');   
    }else{
        // 모바일 전체메뉴
        moAllMenu();
    }
});

