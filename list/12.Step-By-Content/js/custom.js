const log = console.log;

function ModernView(target, opt){
    const { 
            state, 
            setIdx, 
            timing, 
            duration, 
            pagination, 
            button 
        } = opt;

    if($(target).length > 0 && state){
        const wrap = $(target).find('.modern-list');
        const item = wrap.find('.modern-item');
        const total = item.length - 1;

        let num = (setIdx > -1 && setIdx <= total) ? setIdx : 0
        ,   toutStart = 0
        ,   toutEnd = 0;

        function getIndex(sta){
            if(sta === 'prev' && num > 0){
                num = num - 1;
            }else if(sta === 'next' && num < total){
                num = num + 1;
            }else{
                log('End Modern', num);
            }
            return num;
        }

        function paginationMake(){
            let mHtml = '';
            for(var i = 0; i <= total; i++){
                mHtml += `<span class="pagin ${(i === num) ? 'active' : ''}"></span>`
            }
            $(pagination).html(mHtml);
        }

        function modernAction(idx){
            wrap.attr('style', `transform:translateX(-${idx * 100}%); transition-duration: ${duration}s; transition-timing-function: var(--${timing});`);
            item.removeClass('active').eq(idx).addClass('active');
            $(pagination).find('span').removeClass('active').eq(idx).addClass('active');

            if(button != undefined){
                (idx === 0) ? $(button.prevEl).addClass('none') : $(button.prevEl).removeClass('none');
                (idx === total) ? $(button.nextEl).addClass('none') : $(button.nextEl).removeClass('none');
            }
            num = idx;
        }

        function modernTouch(start, end){
            if(start <= end){
                log('prev touch');
                modernAction(getIndex('prev'));
            }else if(start >= end){
                log('next touch');
                modernAction(getIndex('next'));
            }
        }

        modernAction(num);

        if($(wrap) != undefined){
            $(wrap).on('touchstart', function(e){
                e.preventDefault();
                toutStart = e.originalEvent.changedTouches[0].clientX;
                log('touch start');
            });
            $(wrap).on('touchend', function(e){
                e.preventDefault();
                toutEnd = e.originalEvent.changedTouches[0].clientX;
                modernTouch(toutStart, toutEnd);
                log('touch end');
            });
        }

        if(pagination != undefined){
            paginationMake();
            $(pagination).find('span').on('click', function(e){
                e.preventDefault();
                let idx = $(this).index();
                modernAction(idx);
            });
        }

        if(button != undefined){
            $(button.prevEl).on('click', function(e){
                e.preventDefault();
                let idx = getIndex('prev');
                modernAction(idx);
            });
            $(button.nextEl).on('click', function(e){
                e.preventDefault();
                let idx = getIndex('next');
                modernAction(idx);
            });
        }
    }else{
        $(target).hide();
    }
}

document.addEventListener('DOMContentLoaded', function(){
    log('Step By Content');

    let modern = new ModernView('#modernType', {
        state : true,
        setIdx : 0,
        timing: 'ease-in-out-quad',
        duration: .4,
        pagination: '.modern-pagination',
        button: {
            prevEl: '.modern-button.prev',
            nextEl: '.modern-button.next',
        }
    });
});