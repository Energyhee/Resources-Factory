let successCount = 0;
let tryCount = 0;
let failCount = 0;
let currentSuccessRate = 0; // 내가 시도한 횟수 대비 성공한 확률
let resultText = '';

//                    2강  3강  4강  5강  6강  7강  8강
const successRates = [1.0, 0.9, 0.7, 0.5, 0.3, 0.18, 0.07]; // 각 단계별 강화 확률

function reinforce() {
    const selectedStage = document.getElementById('stageSelect').value;
    const currentStage = parseInt(selectedStage);
    const randomChance = Math.random();

    let success = false;
    if (randomChance <= successRates[currentStage - 1]) {
        success = true;
        successCount++; // 강화 성공 횟수 업데이트
        resultText = `<strong>${currentStage + 1}</strong> 강화에 성공하셨습니다.`;
    } else {
        failCount++; // 강화 실패 횟수 업데이트
        // 강화 실패 시 현재 단계보다 작은 수 중 랜덤으로 등급하락
        if (currentStage > 1) {
            const revertedStage = Math.floor(Math.random() * (currentStage - 1)) + 1;
            resultText = `<strong>${currentStage}</strong> 강화에 실패하여 <strong>${revertedStage}</strong> 강으로 복구됐습니다.`;
        } else {
            resultText = `강화에 실패하여 <strong>1</strong> 강으로 떨어졌습니다.`;
        }
    }
    tryCount++; // 강화 시도 횟수 업데이트
    currentSuccessRate = ((successCount / tryCount) * 100).toFixed(2) + '%';

    updateStats();
}

function reset() {
    currentSuccessRate = 0;
    tryCount = 0;
    successCount = 0;
    failCount = 0;
    resultText = '';
    updateStats();
}

function updateStats() {
    document.getElementById('result').innerHTML = resultText;
    document.getElementById('currentSuccessRate').innerText = currentSuccessRate;
    document.getElementById('tryCount').innerText = tryCount;
    document.getElementById('successCount').innerText = successCount;
    document.getElementById('failCount').innerText = failCount;
}

// 초기 화면 확률 노출
function init() {
    baseStageCount(); // 초기화 시 1단계의 확률로 업데이트
}

// 선택된 강화 단계의 확률 노출
function baseStageCount() {
    const selectedStage = document.getElementById('stageSelect').value;
    const successRate = (successRates[parseInt(selectedStage) - 1] * 100).toFixed(2) + '%';
    document.getElementById('successRate').innerText = successRate;
}

// 단계 변경 시 초기화
document.getElementById('stageSelect').addEventListener('change', function() {
    baseStageCount();
    reset();
});