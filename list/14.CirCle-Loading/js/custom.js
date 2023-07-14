function hideLoading(){
    $('.loadingWrap').fadeOut(400, function(){
        $(this).remove();
    });
}

function showLoading(target, durTime, loadMsg){
    var dur = (typeof durTime === 'number' && durTime > 0) ? durTime : 1;

    if($('.loadingWrap').length == 0){
        var mHtml = `<div class="loadingWrap"><div class="loadingInner">
                        <div class="loadingCircle">
                            <svg id="circle" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;">
                                <linearGradient id="gradient">
                                    <stop offset="20%" stop-color="#eee" />
                                    <stop offset="20%" stop-color="#ddd" />
                                    <stop offset="60%" stop-color="#bbb" />
                                </linearGradient>
                                <path fill="url(#gradient)" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                                    <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="${dur}s" repeatCount="indefinite"/>
                                </path>
                            </svg>
                        </div>
                        <p>${loadMsg}</p>
                    </div></div>`; 

        $(target).append(mHtml);
    }
}

$(function(){
    console.log('Circle Counter');

    showLoading('#container', .6, '잠시만 기다려 주세요.');
    // setTimeout(hideLoading(), 5000);
});