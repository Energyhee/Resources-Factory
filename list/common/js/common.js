// Window Width Check
function winChk(){
    var _size;
    
    if( screen.width < 768 ){
        _size = 'mobile';
    }else {
        _size = 'pc';
    }
        
    return  _size;
}

// Element Height Check
function heightChk(obj){
    var _obj = $(obj)
    ,   _arr = [];
        

    if( _obj.length > 0 ){
        for( var i = 0; i < _obj.length; i++){
            _arr.push($(_obj[i]).outerHeight());
        }
    }
    return Math.max.apply(null, _arr);
}

// Browser Check
function userBrowserChk(){
    var _agent = navigator.userAgent.toLowerCase();

    if ( _agent.indexOf('msie') != -1 ) return 'ie';
    if ( _agent.indexOf('chrome') != -1 ) return 'chrome';
    if ( _agent.indexOf('opera') != -1 ) return 'opera';
    if ( _agent.indexOf('firefox') != -1 ) return 'firefox';
    if ( _agent.indexOf('safari') != -1 ) return 'safari';
}


// Element View Section Slide
function screenSw(){
    var _wrap = $('.flowWrap')
    ,   _time = .6;
    
    // 
    _wrap.find('.sel_box select').change(function() {
        var _selName = $(this).find('option:selected').text();
        $(this).siblings('.lbl').text(_selName);
    });

    _wrap.find('.flow').attr('style', '-webkit-transition-duration: ' + _time + 's; transition-duration: ' + _time + 's;');
    $('.com, .btn_prev').on('click', function(){
        var _btn = $(this)
        ,   _act = _wrap.find('.flow.active')
        ,   _idx = _act.index();

        if( _btn.hasClass('com') ){
            if( _act.next().length ){
                if( _act.hasClass('active') ){
                    _act.addClass('left').removeClass('active');
                }
                _act.next().addClass('active');
            }else{
                alert('완료');
            }
        }else if( _btn.hasClass('btn_prev') ){
            if( _act.prev().length ){
                if( _act.hasClass('active') ){
                    _act.removeClass('active');
                }
                _act.prev().removeClass('left').addClass('active');
            }else{
                alert('처음');
            }
        }
        $('.webLink').addClass('evNone');
        setTimeout(function(){
            $('.webLink').removeClass('evNone');
        }, _time * 1000);
    });
}

// Quick Top
function moveScroll(){
    if( $('.quickMoveTop').length > 0 ){
        var _btn = $('.quickMoveTop')
        ,   _target = $('#wrap')
        ,   _targetTop = _target.offset().top;

        function even(){
            if( !$('#wrap').hasClass('noneEvent') ){
                _btn.on('click', function(){
                    $('#wrap').addClass('noneEvent');
                    $('html, body').stop().animate({
                        scrollTop: _target.offset().top,
                    }, 800, function(){
                        $('#wrap').removeClass('noneEvent');
                    });
                });
            }else{
                $('html, body').stop();
                $('#wrap').removeClass('noneEvent');
            }
        }

        even();

        if( $('#sec1').length > 0 ){
            $(window).on({
                scroll : function() {
                    var winPos = $(window).scrollTop();
                    if( winPos >= $('#sec1').offset().top + $('#sec1').outerHeight() ){
                        _btn.addClass('active');
                    }else{
                        _btn.removeClass('active');
                    }
                },
                mousewheel : function() {
                    even();
                },
            });
        }else{
            _btn.addClass('active');
        }
    }
}

// Element Fixed Action
function elementFix(opt){
    try{
        if( opt.state && $(opt.obj).length > 0 ){
            var _state
            ,   _scWd = screen.width
            ,   _hd = $(opt.obj)
            ,   _hdTop = _hd.offset().top
            ,   _winTop = $(window).scrollTop();

            ( $(opt.subObj).length > 0 && _scWd > 768 ) ? _state = true : _state = false;
    
            if( _state ){
                var _sub = $(opt.subObj),
                    _subTop = _sub.offset().top;

                if ( !$('.sub_thumb').length ) _sub.before('<div class="sub_thumb" style="height: 0;"></div>'); 
            }
    
            $(window).scroll(function(){
                var _winPos = $(window).scrollTop() || window.pageYOffset;

                if( _winPos > 0 || _winPos > _hdTop ){
                    _hd.addClass('fixed');
                    if( opt.toggle && userBrowserChk() != 'ie' ){
                        if( _winPos > _winTop ){
                            _hd.css({
                                'transform' : '-webkit-translateY(-' + _hd.outerHeight() + 'px)',
                                'transform' : 'translateY(-' + _hd.outerHeight() + 'px)'
                            });
                        }else{
                            _hd.css({
                                'transform' : '-webkit-translateY(0)',
                                'transform' : 'translateY(0)'
                            });
                        }
					}
                    if( _state && _sub.length > 0 && _winPos >= _subTop - _hd.outerHeight() ){
                        $('.sub_thumb').css('height', _sub.outerHeight());
                        _sub.addClass('fixed').css('top', _hd.outerHeight() + 'px');
                    }else{
                        $('.sub_thumb').css('height', 0);
                        _sub.removeClass('fixed').css('top', 0);
                    }
                }else{
                    _hd.removeClass('fixed');
                }
                _winTop = _winPos;
            }).trigger('scroll');
        }
    }catch(e){
        console.log("%c[ERROR]%c function elementFix.", "bold; color: red;", "color: beige");
    }
}

// Element Fixed Action 2
function elementFix2(opt){
    if( $(opt.obj).length > 0 ){
        var _header = $(opt.obj)
        ,   _hdTop = _header.offset().top
        ,   _winTop = 0
        ,   _elSubOpt;

        if( winSize() === 'pc' ){
            $('.allMenuWrap').on({
                mouseenter : function() {
                    _header.addClass('mouse_on').find('.innerWrap').css('height', 100 + heightChk('.subDep'));
                },
                mouseleave : function() {
                    _header.removeClass('mouse_on').find('.innerWrap').attr('style', '');
                }
            });
        }else{
            $('.allMenuWrap .dep a').each(function(){
                if( $(this).hasClass('on') ){
                    $(this).parent().siblings('.subDep').show();
                }
            });
            $('.allMenuWrap .dep a').on('click', function(){
                var _this = $(this)
                ,   _sub = _this.parent().siblings('.subDep');

                if( _this.hasClass('on') ){
                    _this.removeClass('on');
                    _sub.slideUp();
                }else{
                    $('.allMenuWrap .dep a').not(_this).removeClass('on');
                    $('.allMenuWrap .subDep').not(_sub).slideUp();
                    _this.addClass('on');
                    _sub.slideDown();
                }
            });
        }
        
        function elMoving(el, state, now, pre){
            var target = $(el)
            ,   css = ({
                    top : ( target.attr('id') === 'header' ) ? '0px' : _header.outerHeight() + 'px', 
                    bottom : ( target.attr('id') === 'header' ) ? '-' + _header.outerHeight() + 'px' : '0px',
                });
            
            if( now >  pre ){
                target.css('top', css.bottom)
            }else if( now < pre ){
                target.css('top', css.top)
            }
            //( state ) ? target.css('top', css.bottom) : target.css('top', css.top);
        };
        
        function elSub(el){
            var target = $(el);

            if( !target.length > 0 ) return false;
            if( !$('.fix_dummy').length ) target.before('<div class="fix_dummy" style="height: 0px; overflow: hidden;"></div>');

            _elSubOpt = ({
                obj : $(target),
                height : $(target).height(),
                dummy : $('.fix_dummy'),
                dumTop : $('.fix_dummy').offset().top,
                state : true
            });

            return _elSubOpt;
        }
        
        if( $(opt.subObj).length > 0 ){
            elSub(opt.subObj);
        }

        if( winSize() === 'mobile' && _elSubOpt != undefined){
            setTimeout(function(){
                _elSubOpt.height = $(opt.subObj).height();
            }, 100);
        }

        $(window).scroll(function(){
            var _winPos = $(window).scrollTop();
            if( _winPos > 0 || _winPos > _hdTop ){
                _header.addClass('fixed');

                if( $(opt.subObj).length > 0 ){
                    if ( _elSubOpt.state ) 
                    var _obj = _elSubOpt.obj
                    ,   _sTop = _elSubOpt.dumTop
                    ,   _dum = $(_elSubOpt.dummy);
                    
                    if( _winPos > _sTop ){
                        _obj.addClass('fixed')
                        _dum.css('height', _elSubOpt.height);
                    }else if( _winPos < _sTop - _header.outerHeight() ){
                        _obj.removeClass('fixed').css('top', '0');
                        _dum.css('height', '0');
                    }
                }
                if( opt.moving ){
                    elMoving(
                        _header,
                        _winPos > _winTop,
                        _winPos, _winTop
                    );
                    elMoving(
                        '.navPath', 
                        _winPos > _winTop, 
                        _winPos, _winTop
                    );
                    elMoving(
                        _obj, 
                        _winPos > _winTop,
                        _winPos, _winTop
                    );
                }
            }else{
                _header.removeClass('fixed');
            }
            _winTop = _winPos;
        }).trigger("scroll");
    }
}