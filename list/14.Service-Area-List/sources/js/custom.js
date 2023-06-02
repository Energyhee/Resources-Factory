// const log = console.log;
// const _Fn = {
//     setClass : (scope, name, type) => {
//         try{
//             let target = (typeof scope == 'string') ? document.querySelectorAll(scope)[0] : scope;
//             switch (type) {
//                 default : 
//                     (target.classList.contains(name) != true) ? target.classList.add(name) : target.classList.remove(name);
//                     break;
//                 case 'add' : 
//                     if(target.classList.contains(name) != true) target.classList.add(name);
//                     break;
//                 case 'remove' : 
//                     if(target.classList.contains(name) === true) target.classList.remove(name);
//                     break;
//             }
//         }catch(error){
//             log('※ _Fn.setClass Error \n\n', error);
//         }
//     },
// };

const _fn = {
    list : [
        {
            name : '서울특별시',
            possible : ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
            impossible : []
        },
        {
            name : '인천광역시',
            possible : ['계양구', '남동구', '동구', '미추홀구', '부평구', '서구', '연수구', '중구'],
            impossible : ['강화군', '옹진군']
        },
        {
            name : '부산광역시',
            possible : ['강서구', '금정구', '기장군', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구'],
            impossible : []
        },
        {
            name : '대구광역시',
            possible : ['남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구'],
            impossible : []
        },
        {
            name : '대전광역시',
            possible : ['대덕구', '동구', '서구', '유성구', '중구'],
            impossible : []
        },
        {
            name : '광주광역시',
            possible : ['광산구', '남구', '동구', '북구', '서구'],
            impossible : []
        },
        {
            name : '울산광역시',
            possible : ['남구', '동구', '북구', '울주군', '중구'],
            impossible : []
        },
        {
            name : '경기도',
            possible : ['고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', '남양주시', '부천시', '성남시', '수원시', '시흥시', '안산시', '안성시', '안양시', '양주시', '오산시', '용인시', '의왕시', '의정부시', '파주시', '평택시', '하남시', '화성시'],
            impossible : ['가평군', '대부도', '동두천시', '양평군', '여주시', '연천군', '이천시', '포천시']
        },
        {
            name : '경상남도',
            possible : ['거제시', '거창군', '고성군', '김해시', '남해군', '밀양시', '사천시', '산청군', '양산시', '의령군', '진주시', '창녕군', '창원시', '통영시', '하동군', '함안군', '함양군', '합천군'],
            impossible : []
        },
        {
            name : '경상북도',
            possible : ['경산시', '구미시', '영천시', '칠곡군', '포항시'],
            impossible : ['경주시', '고령군', '군위군', '김천시', '문경시', '봉화군', '상주시', '성주군', '안동시', '영덕군', '영양군', '영주시', '예천군', '울릉군', '울진군', '의성군', '청도군', '청송군']
        },
        {
            name : '충청남도',
            possible : ['공주시', '당진시', '서산시', '아산시', '예산군', '천안시', '홍성군'],
            impossible : ['계룡시', '금산군', '논산시', '보령시', '부여군', '서천군', '청양군', '태안군']
        },
        {
            name : '충청북도',
            possible : ['괴산군', '보은군', '음성군', '증평군', '진천군', '청주시', '충주시'],
            impossible : ['단양군', '영동군', '옥천군', '제천시'],
        },
        {
            name : '전라남도',
            possible : ['곡성군', '광양시', '나주시', '담양군', '목포시', '무안군', '보성군', '순천시', '여수시', '영광군', '영암군', '장성군', '함평군', '화순군'],
            impossible : ['강진군', '고흥군', '구례군', '신안군', '완도군', '장흥군', '진도군', '해남군']
        },
        {
            name : '전라북도',
            possible : ['고창군', '군산시', '김제시', '남원시', '부안군', '순창군', '익산시', '임실군', '전주시', '정읍시'],
            impossible : ['무주군', '완주군', '장수군', '진안군']
        },
        {
            name : '강원도',
            possible : [],
            impossible : ['강릉시', '고성군', '동해시', '삼척시', '속초시', '양구군', '양양군', '영월군', '원주시', '인제군', '정선군', '철원군', '춘천시', '태백시', '평창군', '홍천군', '화천군', '횡성군']
        },
        {
            name : '제주특별<br>자치도',
            possible : ['서귀포시', '제주시'],
            impossible : ['우도', '마라도']
        }
    ],
    makeHtml : (obj, type) => {
        try{
            let mHtml = '';
            obj.forEach((item, idx) => {
                mHtml += `${type === 'name' 
                            ? idx === 0
                                ? `<li class="btn all"><p>전체보기</p></li>\n<li class="btn"><p>${item.name}</p></li>\n`
                                : `<li class="btn"><p>${item.name}</p></li>\n`
                            : `<li>
                                <strong class="area-tit">${item.name}</strong>
                                <div class="box">
                                    <div class="row ${!item.possible.length > 0 ? 'empty' : 'pos'}">
                                        <div class="col tit">방문가능</div>
                                        <div class="col cont">${item.possible}</div>
                                    </div>
                                    <div class="row ${!item.impossible.length > 0 ? 'empty' : 'impos'}">
                                        <div class="col tit">방문불가</div>
                                        <div class="col cont">${item.impossible}</div>
                                    </div>
                                </div>
                            </li>`
                        }`;
            });
            return mHtml;	
        }catch(error){
            console.log('※ _fn.makeHtml Error \n\n', error);
        }
    },
    getIndex : (obj, el) => {
        try{
            let target = (typeof obj == 'string') ? document.querySelectorAll(obj)[0] : obj
            ,	parent = target.parentNode
            ,	child = parent.querySelectorAll(`${obj.tagName}`)
            ,	index;

            child.forEach((elm, idx) => {
                if(target === elm){
                    index = idx;
                }
            })                    

            return index;
        }catch(error){
            console.log('※ _fn.getIndex Error \n\n', error);	
        }
    },
    serviceArea : () => {
        try{
            let wrapper = document.querySelector('.area-list-wrapper')
            ,	reset = wrapper.querySelector('#seviceReset')
            ,	btnWrap = wrapper.querySelector('.area-btn')
            ,	listWrap = wrapper.querySelector('.area-list')
            // , 	fixHead = document.querySelector('.common-fixed-search')
            ,	num = 0;
            
            btnWrap.innerHTML = _fn.makeHtml(_fn.list, 'name');
            listWrap.innerHTML = _fn.makeHtml(_fn.list);
            
            btnWrap.addEventListener('click', (e) => {
                if(e.target.classList.contains('btn')){
                    var btn = e.target;
                    if(btn.classList.contains('all')){
                        if(btn.classList.contains('active')){
                            btnWrap.querySelectorAll('li').forEach((elm, idx) => {
                                elm.classList.remove('active');
                                if(listWrap.querySelectorAll('li')[idx] != undefined) listWrap.querySelectorAll('li')[idx].classList.remove('show');
                            });	
                        }else{
                            btnWrap.querySelectorAll('li').forEach((elm, idx) => {
                                elm.classList.add('active');
                                if(listWrap.querySelectorAll('li')[idx] != undefined) listWrap.querySelectorAll('li')[idx].classList.add('show');
                            });	
                        }
                    }else{
                        if (btn.classList.contains('active')){
                            btn.classList.remove('active');
                            listWrap.querySelectorAll('li')[_fn.getIndex(btn) - 1].classList.remove('show');
                        }else{
                            let cont = listWrap.querySelectorAll('li')[_fn.getIndex(btn) - 1];
                            btn.classList.add('active');
                            cont.classList.add('show');
                            window.scrollTo({ 
                                top : cont.offsetTop, // - fixHead.offsetHeight,
                                behavior : 'smooth' 
                            });
                        }
                        if(listWrap.querySelectorAll('.show').length < 16){
                            btnWrap.querySelector('.all').classList.remove('active');
                        }else{
                            btnWrap.querySelector('.all').classList.add('active');
                        }
                    }
                    num = listWrap.querySelectorAll('.show').length;
                    if(num >= 1){
                        reset.style.display = 'block'
                    }else{
                        reset.style.display = 'none'
                    }
                }
            });
            reset.addEventListener('click', (e) => {
                reset.style.display = 'none';
                btnWrap.querySelectorAll('li').forEach((elm, idx) => {
                    elm.classList.remove('active');
                    if(listWrap.querySelectorAll('li')[idx - 1] != undefined) listWrap.querySelectorAll('li')[idx - 1].classList.remove('show');
                });
                window.scrollTo({ 
                    top : wrapper.offsetTop, // - fixHead.offsetHeight - 40,
                    behavior : 'smooth' 
                });
            });
        }catch(error){
            console.log('※ _fn.serviceArea Error \n\n', error);
        };
    }
};

document.addEventListener('DOMContentLoaded', function(){
    console.log('Step By Content');

    _fn.serviceArea();
});