let log = console.log;

const _Fn = {
    setClass : (scope, name, type) => {
        try{
            let target = (typeof scope == 'string') ? document.querySelectorAll(scope)[0] : scope;
            switch (type) {
                case 'add' : 
                    if(target.classList.contains(name) != true) target.classList.add(name);
                    break;
                case 'remove' : 
                    if(target.classList.contains(name) === true) target.classList.remove(name);
                    break;
                default : 
                    (target.classList.contains(name) != true) ? target.classList.add(name) : target.classList.remove(name);
                    break;
            }
        }catch(error){
            console.log('※ _Fn.setClass Error \n\n', error);
        }
    },
    chkDevice : () => {
        try{
            if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
                return 'mobile';
            }else{
                return 'desktop';
            }    
        }catch(error){
            console.log('※ _Fn.chkDevice Error \n\n', error);
        }
    }
}

/* **************
** @ name : HCH
** @ work : Modern
*************** */
class MakeModern {
    constructor (target, opt){
        this.view = document.getElementById(target);
        this.state = opt.state;
        this.setIdx = (opt.setIdx + 1 < 1) ? 0 : opt.setIdx;
        this.timing = (!opt.timing) ? 'ease-in-out-quad' : opt.timing;
        this.duration = (!opt.duration) ? '1' : opt.duration;
        this.direction = opt.direction;
        this.pagination = opt.pagination;
        this.button = opt.button;
        this.onEvent = opt.onEvent;
        this.typeState = (opt.direction === 'vertical') ? true : false;

        this.pageType = (opt.pagination.type) ? opt.pagination.type : null;
        this.pageElm = (opt.pagination.page) ? this.view.querySelector(opt.pagination.page) : null;
        this.pageSta = (this.pageElm != null) ? true : false;

        this.prevBtn = (opt.button.prevEl) ? this.view.querySelector(opt.button.prevEl) : null;
        this.nextBtn = (opt.button.nextEl) ? this.view.querySelector(opt.button.nextEl) : null;
        this.btnSta = (this.prevBtn != null && this.nextBtn != null) ? true : false;

        this.nav = document.querySelectorAll(opt.nav);

        this.eventWrap = this.view.querySelector('.modern-container');
        this.wrap = this.view.querySelector('.modern-list');
        this.item = this.view.querySelectorAll('.modern-item');

        this.total = this.item.length - 1;
        this.num = (this.setIdx > -1 && this.setIdx <= this.total) ? this.setIdx : 0;

    }
    getIndex(sta){
        if(sta === 'prev' && this.num > 0){
            this.num = this.num - 1;
        }else if(sta === 'next' && this.num < this.total){
            this.num = this.num + 1;
        }else{
            // log('End Modern');
        }
        return this.num;
    }
    paginationMake(){
        let mHtml = '';

        if(this.pageType === 'progress'){
            this.pageElm.classList.add('progress');
            mHtml += `<span class="progress" style="height: ${(100 / (this.total + 1)) * (1)}%; transition: var(--${this.timing}) ${this.duration}s;"</span>`;
        }else{
            for(let i = 0; i <= this.total; i++) mHtml += `<span class="pagin ${(i === this.num) ? 'active' : ''}"></span>`;
        }

        return mHtml;
    }
    modernWheeling(o, n, m){
        let wheeling;

        if (!wheeling) {
            // log('Start Wheeling!');
            this.wrap.classList.add('wheeling');
        }

        clearTimeout(wheeling);
        
        wheeling = setTimeout(() => {
            // log('End Wheeling!');
            this.wrap.classList.remove('wheeling');
            o.classList.remove('active');
            if(n === m) o.classList.add('active');
            wheeling = undefined;
        }, this.duration * 1000);
    }
    modernAction(idx, render){
        this.wrap.setAttribute('style', `transform: translate${this.typeState ? 'Y' : 'X'}(-${idx * 100}%); transition-duration: ${this.duration}s; transition-timing-function: var(--${this.timing});`);
        this.item.forEach((elm, i) => {
            if(render) if(i === idx) elm.classList.add('active');
            if(this.onEvent.end){
                this.modernWheeling(elm, i, idx);
            }else{
                elm.classList.remove('active');
                if(i === idx) elm.classList.add('active');
            }
        });

        if(this.pageSta){
            if(this.pageType === 'progress'){
                this.pageElm.querySelector('span').setAttribute('style', `height: ${(100 / (this.total + 1)) * (idx + 1)}%; transition: var(--${this.timing}) ${this.duration}s;`);
            }else{
                this.view.querySelector(this.pagination.page).querySelectorAll('span').forEach((elm, i) => {
                    elm.classList.remove('active');
                    if(i === idx) elm.classList.add('active');
                });
            }
        }

        if(this.btnSta){
            (idx === 0) ? this.prevBtn.classList.add('none') : this.prevBtn.classList.remove('none');
            (idx === this.total) ? this.nextBtn.classList.add('none') : this.nextBtn.classList.remove('none');
        }

        if(this.nav){
            this.nav.forEach((li, i) => {
                li.classList.remove('active');
                if(i === idx) li.classList.add('active');
            });
        }
        this.num = idx;
    }
    modernTouch(start, end){
        if(start < end){
            this.modernAction(this.getIndex('prev'));
        }else if(start > end){
            this.modernAction(this.getIndex('next'));
        }
    }
    startModern(){
        if(this.state){
            if(this.typeState) this.view.classList.add('vertical');
            if(this.wrap){
                let baseEvent
                ,   toutStart = 0
                ,   toutEnd = 0;
        
                if(_Fn.chkDevice() === 'desktop'){
                    baseEvent = 'mouse';
                    this.eventWrap.addEventListener(`${baseEvent}down`, (e) => {
                        e.preventDefault();
                        toutStart = this.typeState ? e.pageY : e.pageX;
                    });
                    this.eventWrap.addEventListener(`${baseEvent}up`, (e) => {
                        e.preventDefault();
                        toutEnd = this.typeState ? e.pageY : e.pageX;
                        this.modernTouch(toutStart, toutEnd);
                    });
                    this.eventWrap.addEventListener('wheel', (e) => {
                        if(Math.sign(e.deltaY) > 0){ 
                            this.modernAction(this.getIndex('next'));
                        }else{
                            this.modernAction(this.getIndex('prev'));
                        }
                    }, {passive: true});
                }else{
                    baseEvent = 'touch';
                    this.eventWrap.addEventListener(`${baseEvent}start`, (e) => {
                        toutStart = this.typeState ? e.changedTouches[0].clientY : e.changedTouches[0].clientX;
                    }, {passive: true});
                    this.eventWrap.addEventListener(`${baseEvent}end`, (e) => {
                        toutEnd = this.typeState ? e.changedTouches[0].clientY : e.changedTouches[0].clientX;
                        this.modernTouch(toutStart, toutEnd);
                    }, {passive: true});
                }
            }
            if(this.pageSta){
                if(this.pagination.disp){
                    this.pageElm.style.display = 'none';
                }
                this.pageElm.innerHTML = this.paginationMake(1);
        
                if(this.pageType != 'progress'){
                    this.pageElm.querySelectorAll('span').forEach((el, num) => {
                        el.addEventListener('click', (e) => {
                            e.preventDefault();
                            let idx = num;
                            this.modernAction(idx);
                        });
                    });
                }
            }
            if(this.btnSta){
                if(this.button.disp){
                    this.prevBtn.style.display = 'none';
                    this.nextBtn.style.display = 'none';
                }
                this.prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    let idx = this.getIndex('prev');
                    this.modernAction(idx);
                });
                this.nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    let idx = this.getIndex('next');
                    this.modernAction(idx);
                });
            }
            this.modernAction(this.num, true);
        }else{
            this.view.style.display = 'none';
        }
        
        if(this.nav){
            const li = this.nav;
            li.forEach((elm, idx, els) => {
                if(idx === this.num) elm.classList.add('active');
                elm.addEventListener('click', (e) => {
                    e.preventDefault();
                    els.forEach((eld) => {
                        if(eld !== e.currentTarget){
                            eld.classList.remove('active');
                            this.modernAction(idx, true);
                        }else{
                            eld.classList.add('active');
                        } 
                    }, e.currentTarget);
                });
            });
        }
    }
}

/* **************
** @ name : HCH
** @ work : Animation
*************** */
function AnimationSet (opt){
    const {
        state,
        type,
        target
    } = opt;

    if(state){
        const obj = document.querySelectorAll(`[data-${target}-motion]`);

        const scrollChk = (elm) => {
            let obTop = elm.offsetTop;
            let srTop = window.scrollY;
            let chkState = false;
        
            (srTop > obTop - (window.innerHeight * .6)) ? chkState = true : chkState = false;
            
            return chkState
        }

        const typoAct = (e, obj, speed) => {
            let win = window.innerWidth
            ,   pos = (e.pageX / (win / 2)) - 1
            ,   spd = (speed * 100) * pos;

            obj.forEach((el) => {
                el.style.transform = `translateX(${spd}px)`;
            });
        }

        obj.forEach((elm) => {
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
                    let overStyle = `<p>${overText}<span class="cover ${overSkew ? 'skew' : ''}" style="animation-duration: ${duration ? `${duration}`: '.6'}s; animation-delay: ${delay ? `${delay}`: '0'}s; animation-timing-function: ${timing ? `${timing}` : 'var(--ease-in-out-quad)'}; animation-fill-mode: forwards;">${overText}</span></p>`;

                    elm.innerHTML = overStyle;
                    break;
                case 'typography':
                    if(_Fn.chkDevice() === 'desktop'){
                        let typoText = elm.dataset.actionText;
                        let typoHtml;

                        typoHtml = `<div class="left"><div class="box"><div class="moving"><p class="txt">${typoText}</p></div></div></div>
                                    <div class="right"><div class="box"><div class="moving"><p class="txt">${typoText}</p></div></div></div>`;

                        elm.innerHTML = typoHtml;

                        let typoBox = elm.querySelectorAll('.moving');
                        window.addEventListener('mousemove', (e) => typoAct(e, typoBox, duration));
                    }
                    break;
                default :
                    set = 'none';
                    break;
            }

            if(type === 'base'){ 
                // log('Animation Scroll');
                window.addEventListener('scroll', (e) => {
                    e.preventDefault();

                    if(scrollChk(elm)){
                        if(elm.querySelector('.cover')){
                            // elm.querySelector('.cover').classList.add('overlay');
                            _Fn.setClass(elm.querySelector('.cover'), 'overlay', 'add');
                        }else{
                            elm.setAttribute('style', `transform: ${set}; transition-duration: ${duration ? `${duration}`: '.4'}s; transition-delay: ${delay ? `${delay}`: '0'}s; opacity: 1;`);
                        }
                    }else{
                        if(elm.querySelector('.cover')){
                            // elm.querySelector('.cover').classList.remove('overlay');
                            _Fn.setClass(elm.querySelector('.cover'), 'overlay', 'remove');
                        }else{
                            elm.setAttribute('style', `transition-duration: ${duration ? `${duration}`: '.4'}s;; transition-delay: 0s; opacity: 0;`);
                        }
                    }
                });
            }else{
                // log('Animation Modern');
                // log(motion, elm.closest('.modern-item').classList.contains('active'));
            }
        });
    }
}

/* **************
** @ name : HCH
** @ work : Effect Show Animation
************** */
function SnowMaker(opt){
    const {
        state,
        target
    } = opt;

    if(state){
        const elm = document.querySelector(target);
        const dur = elm.dataset.snowDuration; 
        const cor = elm.dataset.snowColor;
        const min = Number.parseInt(elm.dataset.snowMin);
        const max = Number.parseInt(elm.dataset.snowMax);
        const len = elm.dataset.snowLength;
        
        let sha = [];

        for(let i = 0; i < len; i++){
            sha.push(` ${Number.parseInt(Math.random() * (max - min) + min)}px ${Number.parseInt(Math.random() * (max - min) + min)}px var(${cor})`);
        }

        elm.setAttribute('style', `animation-duration: ${dur}s; box-shadow: ${sha}`);
    }
}

function modernSlide(target, opt){
    const {state, setIdx, timing, direction, duration, pagination, button, onEvent, nav} = opt;

    console.log(state);
}

document.addEventListener('DOMContentLoaded', () => {
    /* test */
    const test = new modernSlide('modernType', {
        state: true,
        setIdx: 0,
        timing: 'ease-in-out-quad',
        direction: 'vertical',
        duration: 1,
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
        },
        nav: '.nav-wrap li'
    });

    const modern = new MakeModern('modernType', {
        state: true,
        setIdx: 0,
        timing: 'ease-in-out-quad',
        direction: 'vertical',
        duration: 1,
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
        },
        nav: '.nav-wrap li'
    });
    modern.startModern();

    const animation = new AnimationSet({
        state: true,
        type: 'modern',
        target: 'action'
    });

    const snow01 = new SnowMaker({
        state: true,
        target: '.snow01'
    });

    const snow02 = new SnowMaker({
        state: true,
        target: '.snow02'
    });

    const snow03 = new SnowMaker({
        state: true,
        target: '.snow03'
    });
});