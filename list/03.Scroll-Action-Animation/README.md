# ✍️ 직접 만들어본 스크롤 애니메이션

<br />

* 스크롤 할때에 따른 애니메이션 예시 _**구현**_

    1. 해당 기능이 목적은 유지보수의 용이성을 높이기 위해 작업      
    2. script를 모르거나 또는 Plugin, API 문서를 찾아보고 할 필요없이 간편하게 사용가능하게 하기 위해
    3. 1차 목표 : html 상에서 직접 수정이 가능해야 한다
    4. 2차 목표 : 애니메이션를 주고자 하는 영역(tag, element)에 직접 설정할 수 있게 끔
    5. 3차 목표 : 또한 직접 종류와 시간, 딜레이까지 설정이 가능하게 끔
    6. 설명

        > data-motion : 애니메이션 명

            slide-up (↑)
            slide-down (↓)
            slide-left (→)
            slide-right (←)
            text-up ()
            text-down
            scale-up
            scale-down

        <br />

        > data-duration : 애니메이션의 지속시간

            0 및 소수점, 자연수
            0 ~ 0.1 ~ 10......
        
        <br />

        > data-delay : 애니메이션의 딜레이

            0 및 소수점, 자연수
            0 ~ 0.1 ~ 10......

        <br />

    6. 예시

            <div class="tit" data-motion="text-up" data-duration="1" data-delay=".4">

<br />


