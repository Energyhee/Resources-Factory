// # 이미지 다중첨부 정보
var imagesArr = [];

// # 입력값 여부
function inpValue(e, type){
    var scope = e.originalEvent
    ,   eCode = scope.keyCode
    ,   obj = $(e.target)
    ,   scopeVal = obj.val()
    ,   val;

    switch (eCode){
        case 13 :
            scope.target.blur();
            break;
        case 32 :
            scope.returnValue = false;
            break;
    }

    switch (type){
        case 'number' :
            val = scopeVal.replace(/[^0-9]/g,"");
            break;
        case 'text' :
            val = scopeVal.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi,"");
            break;
        case 'km' :
            if(!isNaN(parseInt(scopeVal.replace(/[^0-9]/g,"")))){
                val = parseInt(scopeVal.replace(/[^0-9]/g,"")).toLocaleString("ko-KR");
            }
            break;
        default : 
            val = scopeVal;
            break;
    }
    return val;
}

// # 컨텐츠 헤더 fixed
function userSellHead(){
    if($('.apEasySell').length){
        
        $(window).on('scroll', function(){
            var pgHaed = $('.apEasySell .pageTitle')
            ,	pgHeadTop = $('.apEasySell')[0].offsetTop;
            
            var winTop = $(window).scrollTop()
            ,	pgHaedHeight = pgHaed.outerHeight();
            
            if(winTop >= pgHeadTop){
                pgHaed.addClass('fixed');
                $('.apEasySell').addClass('fixBody');
            }else{
                pgHaed.removeClass('fixed');
                $('.apEasySell').removeClass('fixBody');
            }
        });
    }
}

// # 추가 금액
function numCnt(){
    var plus = 0;

    $('.score label.check input').on('change', function(e){
        var inp = $(e.target)
        ,   prev;

        if(parseInt(inp.val()) === 0){
            prev = 0;
            plus = 0;
            $('.score label.check input:not(.reset)').prop('checked', false);
            $('.addAmount p').addClass('empty').html('내 차를 자랑하면, 견적 금액이 올라가요.');
        }else{
            (inp.prop('checked')) ? plus += parseInt(inp.val()) : plus = plus - parseInt(inp.val());
            $('.score label.check input.reset').prop('checked', false);
            if(plus > 0){
                prev = (prev =! NaN) ? parseInt($('.amount').attr('data-total')) : 0;
                $('.addAmount p').removeClass('empty').html(`<span class="amount" data-total="${plus}">${prev}</span>만원`);
                $('.amount').prop('Counter', prev).stop().animate({
                    Counter: plus
                }, {
                    duration: 500,
                    step : (now) => {
                        $('.amount').text(Math.ceil(now));
                    }
                });
                prev = prev
                plus = plus;
            }else{            	
                $('.addAmount p').addClass('empty').html('내 차를 자랑하면, 견적 금액이 올라가요.');
            }	
        }
    });
}

// # 옵션 선택
function optDetph(){
    $('.parent').each(function(){
        if($(this).siblings('.child').length){
            var par = $(this)
            ,   chi = $(this).siblings('.child');

            par.find('label').on('change', function(e){
                var idx = $(this).index()
                ,   txt = $(this).find('input').val()
                ,   elm = chi.find('.depth2');
                
                $(elm).hide();
                if($(elm[0]).find('.btnDelete').length){
                    $(elm[0]).find('.btnDelete').trigger('click')
                }else{
                    $(elm).find('input').prop('checked', false)
                }
                if($(elm[idx]).length){
                    $(elm[idx]).fadeIn(400);
                }
            })   
        }
    });
};

// # 로딩 숨김
function hideLoading(){
    $('.loadingWrap').fadeOut(400, function(){
        $(this).remove();
    });
}

// # 로딩 노출
function showLoading(target, durTime){
    var dur = (typeof durTime === 'number' && durTime > 0) ? durTime : 1;

    if(!$('.loadingWrap').length){
        var mHtml = `<div class="loadingWrap">
                        <div class="loadingInner">
                            <div class="loadingCircle">
                                <svg id="circle" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;">
                                    <linearGradient id="gradient">
                                        <stop offset="20%" stop-color="#eee" />
                                        <stop offset="20%" stop-color="#ddd" />
                                        <stop offset="60%" stop-color="#bbb" />
                                    </linearGradient>
                                    <path fill="url(#gradient)" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                                        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="${dur}s" repeatCount="indefinite"/>
                                    </path>
                                </svg>
                            </div>
                            <p>차량 소유주 정보를 확인중입니다.<br>잠시만 기다려주세요.</p>
                        </div>
                    </div>`; 

        $(target).append(mHtml);
    }
    setTimeout(() => hideLoading(), 3000);
}

// # 파일 첨부
function FileAttch(obj, opt){
    if($(obj).length){
        var fileWrap = $(obj)
        ,   upBtn = fileWrap.find(opt.uploadEl)
        ,   deBtn = fileWrap.find(opt.deleteEl)
        ,   realInp = fileWrap.find(opt.realInput)
        ,   fakeInp = fileWrap.find(opt.fakeInput);
        
        upBtn.on('click', function(e){
            e.preventDefault;
            realInp.trigger('click');
        });

        deBtn.on('click', function(e){
            e.preventDefault();
            realInp.val('');
            fakeInp.removeClass('add').val('');
            deBtn.removeClass('active');
            console.log('파일삭제');
        });

        realInp.on('change', function(e){
            e.preventDefault();
            if(e.target.files[0] != undefined){
                var name = e.target.files[0].name
                ,   type = (e.target.files[0].type.indexOf('/')) ? e.target.files[0].type.split('/')[1] : '';

                if(type != undefined && type === 'jpg' || type === 'jpeg' || type === 'png' || type === 'pdf'){
                    fakeInp.val('');
                    if(name.length > 0){
                        fakeInp.addClass('add').val(name);
                        deBtn.addClass('active');
                    }else{
                        fakeInp.removeClass('add');
                        deBtn.removeClass('active');
                    }
                    console.log('파일첨부 : ', realInp.val());
                }else{
                    alert('jpg, png, pdf 파일만 등록 가능');
                }
            }
        });
    }
}

// # 이미지 미리보기
function preview(path, img){
    var mHtml = `<li>
                    <div class="thumb" style="background-image: url('${path}${img}')">
                        <button class="picDel btnDelete active" title="삭제" onclick="delPic(this);"></button>
                    </div>
                </li>`;
    return mHtml;
};

// # 이미지 미리보기 삭제
function delPic(obj){
    var idx = $(obj).parents('li').index();

    imagesArr.splice(idx, 1);
    $(obj).parents('li').remove();
    console.log('미리보기파일삭제 : ', imagesArr);
}

// # 이미지 업로드
function PreviewFileAttch(obj, opt){
    if($(obj).length){
        var fileWrap = $(obj)
        ,   upBtn = fileWrap.find('.btnUpload')
        ,   realInp = fileWrap.find('.fileReal')
        ,   pasteEl = fileWrap.find(opt.paste.elm);

        realInp.change(function(e){
            var fileArr = e.target.files;

            if(fileArr != null && fileArr.length > 0 && fileArr.length <= opt.max){
                for(var i = 0; i < fileArr.length; i++){
                    var tyChk = (fileArr[i].type.indexOf('/')) ? e.target.files[0].type.split('/')[1] : '';
                    
                    if(tyChk != undefined && tyChk === 'jpg' || tyChk === 'jpeg,' || tyChk === 'png'){
                        imagesArr.unshift(fileArr[i]);
                        pasteEl.prepend(preview(opt.paste.path, fileArr[i].name));
                        console.log('미리보기파일첨부 : ', imagesArr);
                    }else{
                        alert('jpg, png 파일만 등록 가능');
                    }
                }
            }else{
                alert('최소 10장에서 최대 20장까지 등록할 수 있습니다.');
            }
        });

        upBtn.on('click', function(e){
            e.preventDefault;
            realInp.trigger('click');
        });                
    }
}

// # 차량 정보 확인 효과
function actionInfo(obj, delay){
    var target = $(obj)
    ,   delay = (typeof delay === 'number' && delay > 0) ? delay : 1000;
    setTimeout(function(){
        for(var i = 0; i < target.length; i++){
            $(target[i]).attr('style', 'transition-delay :' + (i + 1 ) * .4 + 's').addClass('show');
        }
    }, delay);
}

// # 화면
function actionStep(){
    if($('.apEasySell.step').length){
        var section = $('.apEasySell.step').find('.section')
        ,	progressEl = '<div class="progressBar" tabindex="-1"><div class="bar"><span class="now"></span></div><span class="percent">0%</span></div>';
        
        section.first().fadeIn(400);
        section.find('.btnWrap .btn').on('click', function(){
            if($(this).hasClass('view')){
                var btnType = ($(this).hasClass('prev')) ? 'prev' : 'next'
                ,   wrap = $(this).parents('.section') 
                
                switch (btnType){
                    case 'prev' :
                        if(wrap.prev('.section').length){
                            wrap.removeClass('active').hide()
                            wrap.prev('.section').addClass('active').fadeIn(400);
                        }
                        break;
                    default :
                        if(wrap.next('.section').length){
                            wrap.removeClass('active').hide()
                            wrap.next('.section').addClass('active').fadeIn(400);
                            if(wrap.next().hasClass('load')){
                                showLoading('.carInfo', .6);
                                actionInfo(wrap.next('.load').find('.txt p'), 1200);
                            }
                            if(wrap.next().hasClass('write')){
                                if(!$('.apEasySell.step .pageTitle').find('.progressBar').length){
                                    $('.apEasySell.step .pageTitle').append(progressEl);
                                }else{
                                    $('.apEasySell.step .pageTitle').find('.progressBar').show();
                                }
                            }else{
                                $('.apEasySell.step .pageTitle').find('.progressBar').hide();
                            }
                        }
                        break;
                }
            }else{
                var wrap = $(this).parents('.fContWrap');
                if(wrap.next('.fContWrap').length){
                    wrap.next('.fContWrap').show();
                    $(this).parents('.section.write').stop().animate({
                        scrollTop : wrap.next('.fContWrap')[0].offsetTop - ($('.apEasySell.step').outerHeight() - $(this).parents('.section.write.active').outerHeight())
                    }, 800, 'swing', function() { 
                        console.log('end');
                    });
                }
            }
        });
    }
}

// # 진행상황
function stepCheck(obj){
    var item = obj.attr('name')
    ,   optNum = item.split('userOpt')[1]
    ,   percent = (100 / 8) * optNum;

    if(obj.val() != '' && !obj.parents('.child').length){
        if(!$('.progressBar .now').hasClass('act')){
            setTimeout(() => $('.progressBar .now').addClass('act'), 500);
        }
        if(parseInt(optNum) === 8){
            $('.progressBar .now').addClass('last');
        }else{
            setTimeout(() => $('.progressBar .now').removeClass('last'), 500);
        }
        $('.progressBar .now').css('width', percent + '%');
        $('.progressBar .percent').text(parseInt(percent) + '%');
    }
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

                if(winScroll > objTop - ($(window).height() * .5)){
                    if(obj.hasClass('action')) return false;
                    if(type === 'counter'){
                        obj.prop('Counter', 0).stop().animate({
                            Counter: parseInt(obj.data('num'))
                        }, {
                            duration: duration * 1000,
                            step : (now) => {
                                obj.text(Math.ceil(now));
                            }
                        });
                    }else{
                        obj.css({
                            'transition-duration' : duration + 's',
                            'transition-delay' : delay + 's',
                            'transform' : objSet,
                            'opacity' : '1'
                        });
                    }
                    obj.addClass('action');
                }
            }).trigger('scroll');
        });
    }
}

$(function(){
    console.log('Step By Step');


});