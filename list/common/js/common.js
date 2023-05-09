function winChk(){
    var _size;
    
    if( screen.width < 768 ){
        _size = 'mobile';
    }else {
        _size = 'pc';
    }
        
    return  _size;
}

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

function userBrowserChk(){
    var _agent = navigator.userAgent.toLowerCase();

    if ( _agent.indexOf('msie') != -1 ) return 'ie';
    if ( _agent.indexOf('chrome') != -1 ) return 'chrome';
    if ( _agent.indexOf('opera') != -1 ) return 'opera';
    if ( _agent.indexOf('firefox') != -1 ) return 'firefox';
    if ( _agent.indexOf('safari') != -1 ) return 'safari';
}

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