function generateNumbers() {
    const minNumber = 1;
    const maxNumber = 45;
    const numberOfNumbers = 7;
    let numbers = [];

    // 1부터 45까지의 숫자 배열 생성
    for (let i = minNumber; i <= maxNumber; i++) {
        numbers.push(i);
    }

    let selectedNumbers = [];

    // 중복이 없는 7개의 숫자 뽑기
    for (let i = 0; i < numberOfNumbers; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        const selectedNumber = numbers[randomIndex];
        selectedNumbers.push(selectedNumber);
        numbers.splice(randomIndex, 1);
    }

    // 보너스 번호 선택
    const bonusIndex = Math.floor(Math.random() * selectedNumbers.length);
    const bonusNumber = selectedNumbers[bonusIndex];
    selectedNumbers.splice(bonusIndex, 1); // 보너스 번호를 선택된 숫자에서 제거

    // 선택된 숫자들을 오름차순으로 정렬
    selectedNumbers.sort((a, b) => a - b);

    // 보너스 번호를 선택된 숫자들 중 가장 큰 수로 배치
    selectedNumbers.push(bonusNumber);

    // 결과를 화면에 출력
    const resultElement = document.getElementById("result");
    resultElement.textContent = "Lucky Numbers: " + selectedNumbers.join(", ");
    resultElement.innerHTML += "<br> Bonus Number: <span style='color:red'>" + bonusNumber + "</span>";
}