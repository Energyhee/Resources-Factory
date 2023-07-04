let log = console.log;

function ModernView(target, opt){
    const view = document.getElementById(target);
    const { 
            state, 
            setIdx, 
            timing, 
            duration, 
            direction,
            pagination, 
            button
        } = opt;

    let typeState = false;
    
    if(direction === 'vertical'){
        typeState = true;
        view.classList.add('vertical');
    }

    if(view && state){
        const pageType = (pagination.type) ? pagination.type : '';
        const pageElm = (pagination.page) ? view.querySelector(pagination.page) : '';
        const prevBtn = (button) ? view.querySelector(button.prevEl) : '';
        const nextBtn = (button) ? view.querySelector(button.nextEl) : '';

        const wrap = view.querySelector('.modern-list');
        const item = view.querySelectorAll('.modern-item');
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

            if(pageType === 'progress'){
                pageElm.classList.add('progress');
                mHtml += `<span class="progress" style="height: ${(100 / (total + 1)) * (1)}%; transition-duration: ${duration}s; transition-timing-function: var(--${timing});"></span>`;
            }else{
                for(var i = 0; i <= total; i++) mHtml += `<span class="pagin ${(i === num) ? 'active' : ''}"></span>`;
            }

            return mHtml;
        }

        function modernAction(idx){
            wrap.setAttribute('style', `transform:translate${typeState ? 'Y' : 'X'}(-${idx * 100}%); transition-duration: ${duration}s; transition-timing-function: var(--${timing});`);
            item.forEach((elm, i) => {
                elm.classList.remove('active');
                if(i === idx) elm.classList.add('active');
            });

            if(pageType === 'progress'){
                pageElm.querySelector('span').setAttribute('style', `height: ${(100 / (total + 1)) * (idx + 1)}%; transition-duration: ${duration}s; transition-timing-function: var(--${timing});`);
            }else{
                view.querySelector(pagination.page).querySelectorAll('span').forEach((elm, i) => {
                    elm.classList.remove('active');
                    if(i === idx) elm.classList.add('active');
                });
            }

            if(button){
                (idx === 0) ? prevBtn.classList.add('none') : prevBtn.classList.remove('none');
                (idx === total) ? nextBtn.classList.add('none') : nextBtn.classList.remove('none');
            }
            num = idx;
        }

        function modernTouch(start, end){
            if(start <= end){
                log('touch prev');
                modernAction(getIndex('prev'));
            }else if(start >= end){
                log('touch next');
                modernAction(getIndex('next'));
            }
        }

        if(wrap){
            wrap.addEventListener('touchstart', (e) => {
                e.preventDefault();
                toutStart = typeState ? e.changedTouches[0].clientY : e.changedTouches[0].clientX;
                log('touch start');
            });
            wrap.addEventListener('touchend', (e) => {
                e.preventDefault();
                toutEnd = typeState ? e.changedTouches[0].clientY : e.changedTouches[0].clientX;
                modernTouch(toutStart, toutEnd);
                log('touch end');
            });
        }

        if(pageElm){
            pageElm.innerHTML = paginationMake();

            if(pageType === 'progress') return false;
            pageElm.querySelectorAll('span').forEach((el, num) => {
                el.addEventListener('click', (e) => {
                    e.preventDefault();
                    let idx = num;
                    modernAction(idx);
                });
            });
        }

        if(button){
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

        modernAction(num);
    }else{
        view.style.display = 'none';
    }
}

function overlayText(){
    const obj = document.querySelectorAll('.overlay-txt');

    obj.forEach(elm => {
        const text = elm.dataset.text;
        const duration = elm.dataset.duration;
        const delay = elm.dataset.delay;

        elm.innerHTML = `<p>${text}<span class="cover" style="animation: overlay ${duration}s ${delay}s var(--ease-in-out-quad) forwards;">${text}</span></p>`;
    });
}

document.addEventListener('DOMContentLoaded', function(){
    overlayText();

    let modern = new ModernView('modernType', {
        state : true,
        setIdx : 0,
        timing: 'ease-in-out-quad',
        duration: 2,
        direction: 'vertical',
        pagination: {
            page: '.modern-pagination', 
            type: 'progress'  
        },
        // button: {
        //     prevEl: '.modern-button.prev',
        //     nextEl: '.modern-button.next',
        // }
    });
});