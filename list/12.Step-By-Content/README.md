# ✍️ MODERN VIEW 

<br />

* _**swiper slide**_ 를 불필요한 곳에서도 사용하는 것을 보고, 이것을 대응하기 위한 나만의 소스
    1. 기본적으로 swiper slide 와 기능 자체는 비슷하나, 좀 더 basic 하고 가볍게 제작
    2. 기능 구현

        * 터치 기능     
        * 이전, 다음으로 넘길 수 있는 버튼      
        * 페이지네이션 사용 설정 시 자동 추가 및 클릭 시 해당 index 이동    
        * 컨트롤러(버튼 및 페이지네이션) 미사용 가능

        <br />

        > 사용 설정

            state : true,

        <br />

        > 초기 노출 index 설정 가능     

            setIdx : 0,

        <br />

        > 넘어가는 효과 설정 가능     

            ease-in-out-quad ...  

        <br />

        > 시간 설정

            duration: .4,

        <br />

        > 페이지네이션 선택자 지정

            pagination: '.modern-pagination',

        <br />

        > 버튼 선택자 지정
 
            button: {
                prevEl: '.modern-button.prev',
                nextEl: '.modern-button.next',
            }

        <br />

    3. 예시

        > html

            <div id="modernType" class="modern-wrapper">
                <div class="modern-container">
                    <div class="modern-list">
                        <div class="modern-item">1</div>
                        <div class="modern-item">2</div>
                        <div class="modern-item">3</div>
                        <div class="modern-item">4</div>
                    </div>
                </div>
                <button class="modern-button prev"></button>
                <button class="modern-button next"></button>
                <div class="modern-pagination"></div>
            </div>

        > js

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

        <br />

    4. 활용가치

        * 유지 보수 용이    
        * 커스텀이 쉬움     
        * tab 형식 컨텐츠 노출 또는 하나의 페이지에서 여러 화면 구현 등 

<br />


