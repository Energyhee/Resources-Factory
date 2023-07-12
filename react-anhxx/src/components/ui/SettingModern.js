import React, {useRef, useEffect} from 'react';

function SettingModern({cName}){
    // console.log('on setting modern');
    
    const modernElm = useRef(null);
    const isDevice = () => {
        if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
            return 'mobile';
        }else{
            return 'desktop';
        }
    }

    useEffect(() => {
        class MakeModern {
            constructor (target, opt){
                this.view = target;
                this.state = opt.state;
                this.setIdx = (opt.setIdx + 1 < 1) ? 0 : opt.setIdx;
                this.timing = (!opt.timing) ? 'ease-in-out-quad' : opt.timing;
                this.duration = (!opt.duration) ? '1' : opt.duration;
                this.direction = opt.direction;
                this.pagination = opt.pagination;
                this.button = opt.button;
                this.onEvent = opt.onEvent;
                this.typeState = (this.direction === 'vertical') ? true : false;
        
                this.pageType = (this.pagination.type) ? this.pagination.type : null;
                this.pageElm = (this.pagination.page) ? this.view.children[3] : null;
                this.pageSta = (this.pageElm !== null) ? true : false;
                this.prevBtn = (this.button) ? this.view.children[1] : null;
                this.nextBtn = (this.button) ? this.view.children[2] : null;
                this.btnSta = (this.prevBtn !== null && this.nextBtn !== null) ? true : false;
        
                this.eventWrap = this.view.children[0];
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
                    console.log('End Modern');
                }
                return this.num;
            }
            paginationMake(){
                let mHtml = '';
        
                if(this.pageType === 'progress'){
                    this.pageElm.classList.add('progress');
                    mHtml += `<span className="progress" style="height: ${(100 / (this.total + 1)) * (1)}%; transition: var(--${this.timing}) ${this.duration}s;"</span>`;
                }else{
                    for(var i = 0; i <= this.total; i++) mHtml += `<span className="pagin ${(i === this.num) ? 'active' : ''}"></span>`;
                }
        
                return mHtml;
            }
            modernAction(idx, render){
                this.wrap.setAttribute('style', `transform: translate${this.typeState ? 'Y' : 'X'}(-${idx * 100}%); transition-duration: ${this.duration}s; transition-timing-function: var(--${this.timing});`);
                this.item.forEach((elm, i) => {
                    if(render){
                        if(i === idx) elm.classList.add('active');
                    }
                    if(this.onEvent.end){
                        setTimeout(function(){
                            elm.classList.remove('active');
                            if(i === idx) elm.classList.add('active');
                        }, this.duration * 1000);
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
                
                        if(isDevice() === 'desktop'){
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
                            });
                        }else{
                            baseEvent = 'touch';
                            this.eventWrap.addEventListener(`${baseEvent}start`, (e) => {
                                e.preventDefault();
                                toutStart = this.typeState ? e.changedTouches[0].clientY : e.changedTouches[0].clientX;
                            });
                            this.eventWrap.addEventListener(`${baseEvent}end`, (e) => {
                                e.preventDefault();
                                toutEnd = this.typeState ? e.changedTouches[0].clientY : e.changedTouches[0].clientX;
                                this.modernTouch(toutStart, toutEnd);
                            });
                        }
                    }
                    if(this.pageSta){
                        if(this.pagination.disp){
                            this.pageElm.style.display = 'none';
                        }
                        this.pageElm.innerHTML = this.paginationMake();
                
                        if(this.pageType !== 'progress'){
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
            }
        }
        const modern = new MakeModern(modernElm.current, {
            state : true,
            setIdx : 0,
            timing: 'ease-in-out-quad',
            direction: 'vertical',
            duration: 1,
            pagination: {
                page: '.modern-pagination',
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
        modern.startModern();
    }, []);

    /*
    document.querySelectorAll('.nav-wrap li').forEach((elm, idx) => {
        elm.addEventListener('click', (e) => {
            e.preventDefault();
            modern.modernAction(idx, true); 
        });
    });
    */
    return (
        <>
            <div ref={modernElm} className={cName}>
                <div className="modern-container">
                    <div className="modern-list">
                        <div className="modern-item">
                            <section className="inner">
                                <div className="title">
                                    <div className="test" data-action-motion="overlay-txt" data-action-text="HELLO" data-action-skew="skew" data-action-duration="1.5" data-action-delay="0"></div>
                                    <div className="test" data-action-motion="overlay-txt" data-action-text="MY WORLD!" data-action-skew="skew" data-action-duration="1.5" data-action-delay="0"></div>
                                </div>
                                <div className="img-cover" data-action-motion="fade-in" data-action-duration="1.5" data-action-delay="0"><img src="./images/style/img_my_pic01.jpg" alt="영종도와 무의도 사이 그 어딘가" /></div>
                            </section>
                        </div>
                        <div className="modern-item">
                            <section className="inner">
                                <div className="title">
                                    <div className="test" data-action-motion="overlay-txt" data-action-text="STEP 1. SCALE" data-action-duration="1.5" data-action-delay="0"></div>
                                    <div className="test" data-action-motion="typography-txt" data-action-text="CHANGHEE" data-action-duration="1" data-action-delay="0"></div>
                                </div>
                                <div className="thumbnail" data-action-motion="scale-up" data-action-duration="1.5" data-action-delay="0"></div>
                                <div className="thumbnail" data-action-motion="scale-down" data-action-duration="1.5" data-action-delay="0"></div>
                            </section>
                        </div>
                        <div className="modern-item">
                            <div className="inner">
                                <div className="title">
                                    <div className="test" data-action-motion="overlay-txt" data-action-text="STEP 2. SLIDE" data-action-skew="skew" data-action-duration="1.5" data-action-delay="0"></div>
                                </div>
                                <div className="thumbnail" data-action-motion="slide-up" data-action-duration="1.5" data-action-delay="0"></div>
                                <div className="thumbnail" data-action-motion="slide-down" data-action-duration="1.5" data-action-delay="0"></div>
                            </div>
                        </div>
                        <div className="modern-item">
                            <div className="inner">
                                <div className="title">
                                    <div className="test" data-action-motion="overlay-txt" data-action-text="STEP 3. SLIDE" data-action-skew="skew" data-action-duration="1.5" data-action-delay="0"></div>
                                </div>
                                <div className="thumbnail" data-action-motion="slide-left" data-action-duration="1.5" data-action-delay="0"></div>
                                <div className="thumbnail" data-action-motion="slide-right" data-action-duration="1.5" data-action-delay="0"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="modern-button prev"></button>
                <button className="modern-button next"></button>
                <div className="modern-pagination"></div>
            </div>
        </>
    );
}

export default SettingModern;
