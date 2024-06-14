/* 공통 js파일 */

function fnMobileGnbOpen(){
    $('.left-scroll ul li').on('click', function() {
        var clickedIndex = $(this).index();		
        var targetPosition = $('.right-scroll').scrollTop() + $('.right-scroll .menu-box').eq(clickedIndex).position().top;
        
        $('.right-scroll').stop().animate({scrollTop: targetPosition + 1}, 400, function(){
            $('.left-scroll ul li').removeClass('active').eq(clickedIndex).addClass('active');
        });
    });

    $('.right-scroll').on('scroll', function() {
        updateActiveMenu();
    });
    
    updateActiveMenu();
    
    function updateActiveMenu() {
        var scrollPosition = $('.right-scroll').scrollTop();
        var scrollMenuItems = $('.menu-box');
        var currentActiveIndex = 0;

        for (var i = 0; i < scrollMenuItems.length; i++) {
            if (scrollPosition >= scrollPosition + $(scrollMenuItems[i]).position().top) {
                currentActiveIndex = i;
            } else {
                break;
            }
        }

        $('.left-scroll ul li').removeClass('active');
        $('.left-scroll ul li').eq(currentActiveIndex).addClass('active');
        
        var scrollLeftPosition = $('.left-scroll').scrollTop();
        var leftMenuHeight = $('.left-scroll ul li').outerHeight();
        var leftActiveTop = $('.left-scroll ul li').eq(currentActiveIndex).position().top;
        
        if(scrollLeftPosition + leftMenuHeight + leftActiveTop < $('.left-scroll').outerHeight()){
            $('.left-scroll').stop().animate({scrollTop: 0}, 400);
        }else{
            $('.left-scroll').stop().animate({scrollTop: scrollLeftPosition + leftActiveTop}, 400);
        }
    }
}

function scrollDisable(state){
    if(state){
        $('body').addClass('scroll-disable').on('scroll touchmove mousewheel', function(e){
            e.preventDefault();
        });
    }else{
        $('body').removeClass('scroll-disable');
    }
}

function layerTooltipPop(obj){
    if($(obj).length > 0){
        (!$(obj).hasClass('show')) ? $(obj).addClass('show') : $(obj).removeClass('show');
        $(obj).find('.layer-tooltip-close').on('click', function(){
            $(obj).removeClass('show');
        });
    }
}

function layerSnackPop(
        sec = 1000, 
        obj = '.layer-snack-wrap',
        txt = '문구',
        btn = null
    ){
    if($(obj).length > 0){
        $(obj).addClass('show');
        if(txt.length) $(obj).find('p').html(txt);
        if(btn != null) $(btn).attr('disabled', true);
        setTimeout(function(){
            $(obj).removeClass('show');
            if(btn != null) $(btn).attr('disabled', false);
        }, parseInt(sec));
    }
}

function copyUrlShare(url, obj){
	var tempElm = document.createElement('input');
	try{
		tempElm.value = url;
		document.body.appendChild(tempElm);
		tempElm.select();
		if(document.execCommand('copy'))
        layerSnackPop('1600', '.layer-snack-wrap', '이메일 주소 복사가 완료 되었습니다.', obj);
	}catch(e){
        layerSnackPop('1600', '.layer-snack-wrap', `복사 실패: + ${e}`);
	}
	document.body.removeChild(tempElm);
}

function layerPopOpen(obj){
	if($(obj).length && !$(obj).is(':visible')){
        if($(obj).hasClass('bottom')){
            $(obj).addClass('show').fadeIn().find('.layer-box').css({
                'opacity': '1', 
                'transform': 'translate(-50%, 0)'
            });
        }else{
            $(obj).addClass('show').fadeIn();
        }
        scrollDisable(true);
		$(obj).find('.layer-close, .layer-today').on('click', function(){
			$(obj).removeClass('show').fadeOut(function(){
				if($(obj).find('.state').hasClass('show')) $(obj).find('.state').removeClass('show');
                scrollDisable();
			});
		});
	}
}

function chkCookie(key) {
    if (!key) return null;

    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        var parts = cookie.split('=');
        if (parts[0] === key) {
            return parts[1];
        }
    }
    return null;
}

function setCookie(key, value, days) {
    if (!key || key === '') return;
    if (value === undefined) return;

    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }

    document.cookie = key + '=' + value + expires + '; path=/';
}

function TabContent(sel, opt){
	const {
		setClass: sName,
        setBtn: sBtn,
		setCont: sCont,
	} = opt;

	function TabAction(num){
		$(sBtn).removeClass(sName).eq(num).addClass(sName);
		if($(sCont).length){
			$(sCont).removeClass('show').hide().eq(num).addClass('show').fadeIn(400);
		}
		return false;
	};

    if($(sel).length){
        $(sBtn).on('click', (e) => {
            if(!$(e.currentTarget).hasClass(sName)){
                var idx = $(e.currentTarget).index();
                TabAction(idx);
            }
        });
    }
}

function headerFixed(){
    var headerElm = $('#header-elm-wrap');
    $(window).scroll(function(){
        var winTop = $(window).scrollTop();

        if(headerElm.length){
            if(winTop > 0){
                headerElm.addClass('fixed').css('height', $('#header-elm-wrap .inner').outerHeight());
                if($('.main-search-wrap').length && winTop >= $('.main-search-wrap').offset().top){
                    headerElm.addClass('search');
                }else{
                    headerElm.removeClass('search');
                }
            }else{
                headerElm.removeClass('fixed').css('height', 'auto');
            }
        }
    }).trigger('scroll');
}

$(document).ready(function(){
    headerFixed(); 

    if($('.talk-box').length){
        $(document).on('click', '.talk-box-close', function(e){
            setCookie('talk-layer-pop', 'done', 1);
            if($('.talk-box').is(':visible')) $('.talk-box').fadeOut(400);
        });
        /*
        setTimeout(function(){
            setCookie('talk-layer-pop', 'done', 1);
            if($('.talk-box').is(':visible')) $('.talk-box').fadeOut(400);
        }, 3000);
        */
    }

    if($('.quick-top-btn').length){
        $(window).scroll(function(){
            var winTop = $(window).scrollTop();
    
            if(winTop > 0){
                $('.quick-top-btn').show();
            }else{
                $('.quick-top-btn').hide();
            }
        }).trigger('scroll');

        $(document).on('click', '.quick-top-btn', function(e){
            var _this = $(this);
            e.preventDefault();
            _this.attr('disabled', true);
            $('html, body').animate({
                scrollTop: 0
            }, 400, function(){
                _this.attr('disabled', false);
            });
        });
    }

    $(document).on('click', '#quick-cs .quick-btn', function(e){
        var _this = $(this);
        e.preventDefault();
        $(this).parent().toggleClass('active');
        if($(this).parent().hasClass('active')){
            scrollDisable(true);
            _this.attr('disabled', true);
            setTimeout(function(){
                _this.attr('disabled', false);
            }, 400);
        }else{
            scrollDisable();
        }
    });

    $(document).on('click', '#quick-user .quick-btn', function(e){
        var _this = $(this);
        e.preventDefault();
        _this.parent().toggleClass('active');
        $('.quick-top-btn').toggleClass('move');
        if(_this.parent().hasClass('active')){
            scrollDisable(true);
            _this.attr('disabled', true);
            setTimeout(function(){
                _this.attr('disabled', false);
            }, 400);
        }else{
            scrollDisable();
        };
    });

    $(document).on('click', '.btn-menu', function(e) {
		e.preventDefault();
		$('#aside-menu-wrap').addClass('active', fnMobileGnbOpen());
        scrollDisable(true);
	});

    $(document).on('click', '.gnb-btn.close', function(e) {
		e.preventDefault();
		$('#aside-menu-wrap').removeClass('active');
        scrollDisable();
	});

    $(document).on('click', '.toggle .toggle-btn .btn', function(e){
        e.preventDefault();
        $(this).toggleClass('active').parent().siblings('.toggle-cont').slideToggle(400);
    });

});
