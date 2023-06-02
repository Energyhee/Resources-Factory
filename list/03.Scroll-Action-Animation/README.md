# ✍️ 직접 만들어본 스크롤 애니메이션

<br />

* 스크롤 할때에 따른 애니메이션 예시 _**구현**_

    1. 해당 기능이 목적은 유지보수의 용이성을 높이기 위해 작업
    2. script를 모르거나 또는 Plugin, API 문서를 찾아보고 할 필요없이 간편하게 사용가능하게 하기 위해
    3. 1차 목표 : html 상에서 직접 수정이 가능해야 한다
    4. 2차 목표 : 애니메이션를 주고자 하는 영역(tag, element)에 줄 수 있게 끔
    5. 3차 목표 : 애니메이션의 종류와 시간, 딜레이까지 설정이 가능하게 끔
    
        > data-section : 애니메이션을 주고자 하는 영역  
        > data-motion : 애니메이션 명
        
            slide-up
            slide-down
            slide-left
            slide-right
            text-up
            text-down
            scale-up
            scale-down

        > data-duration : 애니메이션의 지속시간
        > data-delay : 애니메이션의 딜레이

            0 및 소수점, 자연수
            0 ~ 0.1 ~ 10......


    6. 위와 같이 설정이 가능

<br />


