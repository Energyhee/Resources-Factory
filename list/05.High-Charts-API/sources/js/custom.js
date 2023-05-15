// 날짜설정 (현재, 한달전)
function dateCalc(type){
    var nDate = new Date()
    ,	year = nDate.getFullYear()
    ,	month = (type === 'prev') ? nDate.getMonth() - 1 : nDate.getMonth()
    ,	day = (type === 'prev') ? nDate.getDate() + 1 : nDate.getDate();

    return Date.UTC(year, month, day);
}

// 차트 생성 함수
function loadMakeCharts(opt){
    if( $('#' + opt.target).length ){
        if ( opt.type === 'pie' ){
            var pieOpt = {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                }
        }

        Highcharts.chart(opt.target, {
            chart: {
                pieOpt,
                type: opt.type
            },
            title: {
                text: opt.title.text,
                align: opt.title.align
            },
            accessibility: {
                point: {
                    valueSuffix: opt.acc.pt.val
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '{point.percentage:.1f} %',
                        distance: -50,
                        filter: {
                            property: 'percentage',
                            operator: '>',
                            value: 4
                        }
                    }
                }
            },
            series: opt.dataList
        });
    }
};

// 원형 그래프 생성
function makeCharts(opt){
    Highcharts.chart(opt.target, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: opt.title.text,
            align: opt.title.align
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{point.percentage:.1f} %',
                    distance: -50,
                    filter: {
                        property: 'percentage',
                        operator: '>',
                        value: 4
                    }
                }
            }
        },
        series: opt.series
    });
}

$(function(){
    console.log('High Chart API');

    // 콤마
    Highcharts.setOptions({
        lang: {
            thousandsSep: ','
        }
    });

    // 테스트 그래프 생성
    var test = new loadMakeCharts({
        target : 'test',
        type : 'pie',
        title: {
            text: 'test',
            align: 'center'
        },
        acc: {
            pt: {
                vs: '%'
            }
        },
        dataList: [{
            name: '비율',
            data: [
                {
                    name: '가솔린',
                    // color: 'rgb(221,217,195)',
                    y: 45
                },
                {
                    name: '디젤',
                    // color: 'rgb(192,80,77)',
                    y: 25
                },
                {
                    name: 'LPG',
                    // color: 'rgb(155,186,88)',
                    y: 30
                }
            ]
        }]
    });

    var test2 = new loadMakeCharts({
        target : 'test2',
        type: 'scatter',
        title: {
            text: 'testtest',
            align: 'center'
        },
        xAxis: [{
            categories: ['1월', '2월', '3월', '4월', '5월', '6월','7월', '8월', '9월', '10월', '11월', '12월'],
            crosshair: true
        }],
        tooltip: {
            shared: true
        },
        acc: {
            pt: {
                vs: '개'
            }
        },
        yAxis: [
            {
                min: 0,
                title: {
                    text: null,
                },
                labels: {
                    format: '{value:,.0f}',
                },
                opposite: true
            },
            {
                min: 0,
                title: {
                    text: null,
                },
                labels: {
                    format: '{value:,.0f}',
                }
            }
        ],
        dataList: [{
            data: [
                {
                    name: '가솔린',
                    // color: 'rgb(221,217,195)',
                    x: 25,
                    y: 45
                },
                {
                    name: '디젤',
                    // color: 'rgb(192,80,77)',
                    x: 5,
                    y: 25
                },
                {
                    name: 'LPG',
                    // color: 'rgb(155,186,88)',
                    x: 10,
                    y: 30
                }
            ]
        }]
    });


    // 입/낙찰 현황
    Highcharts.chart('bar-type01', {
        chart: {
            
        },
        title: {
            text: '입/낙찰 현황',
            align: 'center'
        },
        xAxis: [{
            categories: ['1월', '2월', '3월', '4월', '5월', '6월','7월', '8월', '9월', '10월', '11월', '12월'],
            crosshair: true
        }],
        tooltip: {
            shared: true
        },
        yAxis: [
            {
                min: 0,
                title: {
                    text: null,
                },
                labels: {
                    format: '{value:,.0f}',
                },
                opposite: true
            },
            {
                min: 0,
                title: {
                    text: null,
                },
                labels: {
                    format: '{value:,.0f}',
                }
            }
        ],
        series: [
            {
                name: '낙찰',
                type: 'column',
                yAxis: 1,
                data: [3, 5, 7, 5, 12, 8, 10, 6, 8, 7, 16, 9],
                tooltip: {
                    valueSuffix: ' 대'
                }
            }, 
            {
                name: '입찰',
                type: 'line',
                data: [54, 27, 82, 68, 102, 87, 95, 77, 86, 55, 99, 73],
                tooltip: {
                    valueSuffix: ' 대'
                }
            }
        ]
    });

    // 입찰비율(차종)
    var chart01 = new makeCharts({
        target : 'circle-type01',
        title: {
            text: '입찰비율(차종)',
            align: 'center'
        },
        series: [
            {
                name: '비율',
                data: [
                    {
                        name: '승용',
                        color: 'rgb(221,217,195)',
                        y: 50
                    },
                    {
                        name: 'SUV',
                        color: 'rgb(192,80,77)',
                        y: 30
                    },
                    {
                        name: '외제',
                        color: 'rgb(155,186,88)',
                        y: 20
                    }
                ]
            }
        ]
    });

    // 낙찰비율(차종)
    var chart02 = new makeCharts({
        target : 'circle-type02',
        title: {
            text: '낙찰비율(차종)',
            align: 'center'
        },
        series: [
            {
                name: '비율',
                data: [
                    {
                        name: '승용',
                        color: 'rgb(221,217,195)',
                        y: 45
                    },
                    {
                        name: 'SUV',
                        color: 'rgb(192,80,77)',
                        y: 25
                    },
                    {
                        name: '외제',
                        color: 'rgb(155,186,88)',
                        y: 30
                    }
                ]
            }
        ]
    });

    // 입찰비율(유종)
    var chart03 = new makeCharts({
        target : 'circle-type03',
        title: {
            text: '입찰비율(유종)',
            align: 'center'
        },
        series: [
            {
                name: '비율',
                data: [
                    {
                        name: '가솔린',
                        color: 'rgb(221,217,195)',
                        y: 50
                    },
                    {
                        name: '디젤',
                        color: 'rgb(192,80,77)',
                        y: 30
                    },
                    {
                        name: 'LPG',
                        color: 'rgb(155,186,88)',
                        y: 20
                    }
                ]
            }
        ]
    });

    // 낙찰비율(유종)
    var chart04 = new makeCharts({
        target : 'circle-type04',
        title: {
            text: '낙찰비율(유종)',
            align: 'center'
        },
        series: [
            {
                name: '비율',
                data: [
                    {
                        name: '가솔린',
                        color: 'rgb(221,217,195)',
                        y: 45
                    },
                    {
                        name: '디젤',
                        color: 'rgb(192,80,77)',
                        y: 25
                    },
                    {
                        name: 'LPG',
                        color: 'rgb(155,186,88)',
                        y: 30
                    }
                ]
            }
        ]
    });

    // 낙찰차량 분포
    Highcharts.chart('dot-type01', {
        chart: {
            type: 'scatter'
        },
        title: {
            text: '낙찰차량 분포',
            align: 'center'
        },
        xAxis: {
            title: {
                text: '주행거리',
            },
            min: 0,
            gridLineWidth: 1,
            labels: {
                format: '{value:,.0f}'
            },
        },
        yAxis: {
            title: {
                text: null,
            },
            min: 0,
            gridLineWidth: 1,
            labels: {
                format: '{value:,.0f}'
            }
        },
        tooltip: {
            pointFormat: '차량가격: {point.y:,.0f} 원<br/> 주행거리: {point.x:,.0f} km'
        },
        series: [{
            name : '차량정보',
            marker: {
                radius: 5,
                symbol: 'circle',
            },
            data: [
                {
                    y: 32000000,
                    x: 18000,
                },
                {
                    y: 25000000,
                    x: 51200
                },
                {
                    y: 18210000,
                    x: 64000
                },
                {
                    y: 13500000,
                    x: 70210
                },
                {
                    y: 14200000,
                    x: 88911
                },
                {
                    y: 9280000,
                    x: 112002
                },
                {
                    y: 18500000,
                    x: 124820
                },
                {
                    y: 7050000,
                    x: 185000
                }
            ],
        }]
    });

    // 평균 입,낙찰 금액
    Highcharts.chart('bar-type02', {
        title: {
            text: '평균 입/낙찰 금액',
            align: 'center'
        },
        xAxis: [{
            categories: ['1월', '2월', '3월', '4월', '5월', '6월','7월', '8월', '9월', '10월', '11월', '12월'],
            crosshair: true
        }],
        tooltip: {
            shared: true
        },
        yAxis: [
            {
                min: 0,
                title: {
                    text: null
                },
                labels: {
                    format: '{value:,.0f}',
                },
            }
        ],
        series: [
            {
                name: '입찰',
                type: 'column',
                color: 'rgb(124,181,236)',
                data: [1124, 895, 954, 1120, 1321, 992, 1010, 887, 1325, 869, 926, 1054],
                tooltip: {
                    valueSuffix: ' 만원'
                }
            },
            {
                name: '낙찰',
                type: 'column',
                color: 'rgb(192,80,77)',
                data: [984, 1051, 967, 654, 859, 1564, 1425, 1210, 935, 1294, 1021, 947],
                tooltip: {
                    valueSuffix: ' 만원'
                }
            },
            {
                name: '구간의 이동 평균(입찰)',
                dashStyle: 'ShortDot',
                color: 'rgb(124,181,236)',
                data: [1124, 895, 954, 1120, 1321, 992, 1010, 887, 1325, 869, 926, 1054],
                tooltip: {
                    valueSuffix: ' 만원'
                }
            },
            {
                name: '구간의 이동 평균(낙찰)',
                dashStyle: 'ShortDot',
                color: 'rgb(192,80,77)',
                data: [984, 1051, 967, 654, 859, 1564, 1425, 1210, 935, 1294, 1021, 947],
                tooltip: {
                    valueSuffix: ' 만원'
                }
            }
        ]
    });

    // 최근 한달간 시세 추이
    var chart02 = Highcharts.chart('line-type01', {
        chart: {
            type: 'scatter'
        },
        title: {
            text: '최근 한달간 시세 추이',
            align: 'left'
        },
        xAxis: {
            type: 'datetime',
            labels: {
                format: '{value:%Y-%m-%d}',
            },
            gridLineWidth: 1,
            min: dateCalc('prev'),
            max: dateCalc(),
            tickInterval : 24 * 3600 * 1000 * 3,
        },
        yAxis: {
            title: {
                text: null
            },
            gridLineWidth: 1,
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    symbol: 'circle',
                }
            },
            series:  {
                pointStart: dateCalc('prev'),
                pointInterval: 24 * 3600 * 1000 * 3,
                states: {
                    inactive: {
                        opacity: 1
                    },
                    hover: {
                        enabled: false
                    }
                },
            }
        },
        tooltip: {
            headerFormat: '<b>{point.x:%Y.%m.%d}</b><br>',
            pointFormat: '매물 : {point.y:,.0f} 만원'
        },
        series: [
            {
                name: '동일 등급 시세',
                color: 'rgb(78, 129, 189)',
                data: [2502, 2514, 2500, 2522, 2499, 2584, 2654, 2445, 2511, 2552]
            },
            {
                name: '동일 등급 시세2',
                color: 'rgb(78, 129, 189)',
                data: [2451, 2452, 2521, 2521, 2390, 2541, 2412, 2445, 2441, 2488]
            },
            {
                name: '평균 값',
                marker: {
                    symbol: 'square'
                },
                color: 'rgb(255, 0, 0)',
                data: [2396, 2437, 2429, 2443, 2325, 2470, 2421, 2395, 2318, 2471]
            }
        ]
    });

    // 최근 한달간 매물 추이
    var chart03 = Highcharts.chart('line-type02', {
        title: {
            text: '최근 한 달간 매물 추이',
            align: 'left'
        },
        xAxis: {
            type: 'datetime',
            labels: {
                format: '{value:%Y-%m-%d}',
            },
            min: dateCalc('prev'),
            max: dateCalc(),
            tickInterval : 24 * 3600 * 1000 * 3
        },
        yAxis: {
            title: {
                text: null
            },
            gridLineWidth: 1,
        },
        tooltip: {
            headerFormat: '<b>{point.x:%Y.%m.%d}</b><br>',
            pointFormat: '매물 : {point.y:,.0f} 대'
        },
        plotOptions: {
            series: {
                pointStart: dateCalc('prev'),
                pointInterval: 24 * 3600 * 1000,
            },
            line: {
                dataLabels: {
                    enabled: true,
                    format: '{y} 대'
                }
            },
        },
        series: [
            {
                name: '대',
                color: 'rgb(192,80,77)',
                data: [
                    163, 160, 159, 159, 139, 153, 161, 
                    155, 154, 161, 149, 154, 158, 160, 
                    158, 137, 147, 142, 150, 158, 153, 
                    152, 152, 161, 150, 155, 147, 145, 
                    155, 151
                ]
            }
        ],
    });
});