let currentPage = 1;

function nextPage(nextPageNumber) {
    const currentInput = $(`#page${currentPage} .input-field`).val();

    if (currentInput !== "") {
        $(`#page${currentPage}`).hide();
        currentPage = nextPageNumber;
        $(`#page${currentPage}`).show();
    } else {
        alert("입력란을 채워주세요.");
    }
}

function submitForm() {
    const addressInput = $("#page3 .input-field").val();

    if (addressInput !== "") {
        alert("유저 정보가 성공적으로 제출되었습니다!");
    } else {
        alert("주소를 입력해주세요.");
    }
}