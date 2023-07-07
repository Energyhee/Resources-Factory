let log = console.log;

const isDevice = () => {
    if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
        return 'mobile';
    }else{
        return 'desktop';
    }
}

function ModernView(target, opt){
    const view = document.getElementById(target);
    const { 
        state, 
        setIdx, 
        timing, 
        duration, 
        direction,
        pagination, 
        button,
        onEvent
    } = opt;

    let typeState = false;

    if(direction === 'vertical'){
        typeState = true;
        view.classList.add('vertical');
    }

    if(view && state){
        const pageType = (pagination.type) ? pagination.type : null;
        const pageElm = (pagination.page) ? view.querySelector(pagination.page) : null;
        const pageSta = (pageElm != null) ? true : false;
        const prevBtn = (button) ? view.querySelector(button.prevEl) : null;
        const nextBtn = (button) ? view.querySelector(button.nextEl) : null;
        const btnSta = (prevBtn != null && nextBtn != null) ? true : false;

        const eventWrap = view.querySelector('.modern-container');
        const wrap = view.querySelector('.modern-list');
        const item = view.querySelectorAll('.modern-item');
        const total = item.length - 1;

        let num = (setIdx > -1 && setIdx <= total) ? setIdx : 0;

        function getIndex(sta){
            if(sta === 'prev' && num > 0){
                num = num - 1;
            }else if(sta === 'next' && num < total){
                num = num + 1;
            }else{
                log('End Modern');
            }
            return num;
        }

        function paginationMake(){
            let mHtml = '';

            if(pageType === 'progress'){
                pageElm.classList.add('progress');
                mHtml += `<span class="progress" style="height: ${(100 / (total + 1)) * (1)}%; transition: var(--${timing}) ${duration}s;"</span>`;
            }else{
                for(var i = 0; i <= total; i++) mHtml += `<span class="pagin ${(i === num) ? 'active' : ''}"></span>`;
            }

            return mHtml;
        }

        function modernAction(idx, render){
            wrap.setAttribute('style', `transform: translate${typeState ? 'Y' : 'X'}(-${idx * 100}%); transition-duration: ${duration}s; transition-timing-function: var(--${timing});`);
            item.forEach((elm, i) => {
                if(render){
                    if(i === idx) elm.classList.add('active');
                }
                if(onEvent.end){
                    setTimeout(function(){
                        elm.classList.remove('active');
                        if(i === idx) elm.classList.add('active');
                    }, duration * 1000);
                }else{
                    elm.classList.remove('active');
                    if(i === idx) elm.classList.add('active');
                }
            });

            if(pageSta){
                if(pageType === 'progress'){
                    pageElm.querySelector('span').setAttribute('style', `height: ${(100 / (total + 1)) * (idx + 1)}%; transition: var(--${timing}) ${duration}s;`);
                }else{
                    view.querySelector(pagination.page).querySelectorAll('span').forEach((elm, i) => {
                        elm.classList.remove('active');
                        if(i === idx) elm.classList.add('active');
                    });
                }
            }

            if(btnSta){
                (idx === 0) ? prevBtn.classList.add('none') : prevBtn.classList.remove('none');
                (idx === total) ? nextBtn.classList.add('none') : nextBtn.classList.remove('none');
            }
            num = idx;
        }

        function modernTouch(start, end){
            if(start < end){
                // log('touch prev');
                modernAction(getIndex('prev'));
            }else if(start > end){
                // log('touch next');
                modernAction(getIndex('next'));
            }
        }

        if(wrap){
            let baseEvent
            ,   toutStart = 0
            ,   toutEnd = 0;

            if(isDevice() === 'desktop'){
                baseEvent = 'mouse';
                eventWrap.addEventListener(`${baseEvent}down`, (e) => {
                    e.preventDefault();
                    toutStart = typeState ? e.pageY : e.pageX;
                    // log('mouse down');
                });
                eventWrap.addEventListener(`${baseEvent}up`, (e) => {
                    e.preventDefault();
                    toutEnd = typeState ? e.pageY : e.pageX;
                    modernTouch(toutStart, toutEnd);
                    // log('mouse up');
                });
            }else{
                baseEvent = 'touch';
                eventWrap.addEventListener(`${baseEvent}start`, (e) => {
                    e.preventDefault();
                    toutStart = typeState ? e.changedTouches[0].clientY : e.changedTouches[0].clientX;
                    // log('touch start');
                });
                eventWrap.addEventListener(`${baseEvent}end`, (e) => {
                    e.preventDefault();
                    toutEnd = typeState ? e.changedTouches[0].clientY : e.changedTouches[0].clientX;
                    modernTouch(toutStart, toutEnd);
                    // log('touch end');
                });
            }
        }

        if(pageSta){
            if(pagination.disp){
                pageElm.style.display = 'none';
            }
            pageElm.innerHTML = paginationMake();

            if(pageType != 'progress'){
                pageElm.querySelectorAll('span').forEach((el, num) => {
                    el.addEventListener('click', (e) => {
                        e.preventDefault();
                        let idx = num;
                        modernAction(idx);
                    });
                });
            }
        }

        if(btnSta){
            if(button.disp){
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
            }
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                let idx = getIndex('prev');
                modernAction(idx);
            });
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                let idx = getIndex('next');
                modernAction(idx);
            });
        }

        modernAction(num, true);
    }else{
        view.style.display = 'none';
    }
}

function AnimationSet(opt){
    const {
        state,
        type,
        target
    } = opt;

    if(state){
        const obj = document.querySelectorAll(`[data-${target}-motion]`);

        function scrollChk(elm){
            let obTop = elm.offsetTop;
            let srTop = window.scrollY;
            let chkState = false;
        
            (srTop > obTop - (window.innerHeight * .7)) ? chkState = true : chkState = false;
            
            return chkState
        }

        function typeAct(e, obj, speed){
            let win = window.innerWidth
            ,   pos = (e.pageX / (win / 2)) - 1
            ,   spd = (speed * 100) * pos;

            obj.forEach((el) => {
                el.style.transform = `translateX(${spd}px)`;
            });
        }

        obj.forEach((elm, idx) => {
            const motion = elm.dataset.actionMotion.split('-')[0];
            const timing = elm.dataset.actionTiming;
            const duration = elm.dataset.actionDuration;
            const delay = elm.dataset.actionDelay;
            let set;

            switch (motion){
                case 'slide':
                    set = 'translate(0, 0)';
                    break;
                case 'scale':
                    set = 'scale(1)';
                    break;
                case 'overlay':
                    let overText = elm.dataset.actionText;
                    let overSkew = elm.dataset.actionSkew;
                    let overStyle = `<p>${overText}<span class="cover ${overSkew ? 'skew' : ''}" style="animation-duration: ${duration ? `${duration}`: '.6'}s; ${delay ? `animation-delay: ${delay}s;`: ''} animation-timing-function: ${timing ? `${timing}` : 'var(--ease-in-out-quad)'}; animation-fill-mode: forwards;">${overText}</span></p>`;

                    elm.innerHTML = overStyle;
                    break;
                case 'typography':
                    if(isDevice() === 'desktop'){
                        let typoText = elm.dataset.actionText;
                        let typoHtml;

                        typoHtml = `<div class="left"><div class="box"><div class="moving"><p class="txt">${typoText}</p></div></div></div>
                                    <div class="right"><div class="box"><div class="moving"><p class="txt">${typoText}</p></div></div></div>`;
                        elm.innerHTML = typoHtml;

                        let typoBox = elm.querySelectorAll('.moving');
                        window.addEventListener('mousemove', (e) => typeAct(e, typoBox, duration));
                    }
                    break;
                default :
                    set = '';
                    break;
            }

            if(type === 'base'){
                log('Animation Scroll');
                window.addEventListener('scroll', (e) => {
                    e.preventDefault();
                    
                    if(scrollChk(elm)){
                        if(elm.querySelector('.cover')){
                            elm.querySelector('.cover').classList.add('overlay');
                        }else{
                            elm.setAttribute('style', `transform: ${set}; transition-duration: ${duration ? `${duration}`: '.4'}s; transition-delay: ${delay ? `${delay}`: '0'}s; opacity: 1;`);
                        }
                    }else{
                        if(elm.querySelector('.cover')){
                            elm.querySelector('.cover').classList.remove('overlay');
                        }else{
                            elm.setAttribute('style', `transition-duration: ${duration}s; transition-delay: 0s;`);
                        }
                    }
                });
            }else{
                log('Animation Modern');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function(){
    const modern = new ModernView('modernType', {
        state : true,
        setIdx : 0,
        timing: 'ease-in-out-quad',
        duration: 1,
        direction: 'vertical',
        pagination: {
            page: '.modern-pagination', 
            type: 'progress',
            disp: false
        },
        button: {
            prevEl: '.modern-button.prev',
            nextEl: '.modern-button.next',
            disp: true
        },
        onEvent: {
            end: true
        }
    });

    const animation = new AnimationSet({
        state : true,
        type : 'modern',
        target : 'action'
    });
});