$(function(){
    console.log('Google Chart API');

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawBarChart01); // 입,낙찰 현황
    google.charts.setOnLoadCallback(drawCircleChart01); // 입찰비율(차종)
    google.charts.setOnLoadCallback(drawCircleChart02); // 낙찰비율(차종)
    google.charts.setOnLoadCallback(drawCircleChart03); // 입찰비율(유종)
    google.charts.setOnLoadCallback(drawCircleChart04); // 낙찰비율(유종)
    google.charts.setOnLoadCallback(drawDottedChart01); // 낙찰차량 분포
    google.charts.setOnLoadCallback(drawBarChart02); // 입,낙찰 현황

    // 입,낙찰 현황
    function drawBarChart01() {
        var data = google.visualization.arrayToDataTable([
            ['Month', '낙찰', '입찰'],
            ['1월',  10, 60],
            ['2월',  5, 30],
            ['3월',  15, 70],
            ['4월',  12, 50],
            ['5월',  17, 85],
            ['6월',  18, 75],
            ['7월',  20, 80],
            ['8월',  16, 60],
            ['9월',  13, 65],
            ['10월',  12, 40],
            ['11월',  17, 70],
            ['12월',  13, 65]
        ]);

        var option = {
            title : '입/낙찰 현황',
            series: {
                0: { type: 'bars', axis: 'aLeft', minValue: 0, maxValue: 20},
                1: { type: 'line', axis: 'aRight', minValue: 0, maxValue: 120},
            },
            axes: {
                x: {
                    aLeft: {label: 'first'}, // Bottom x-axis.
                    aRight: {side: 'top', label: 'second'} // Top x-axis.
                }
            }
        };

        var chart = new google.visualization.ComboChart(document.getElementById('bar-type01'));
        chart.draw(data, option);
    }

    // 입찰비율(차종)
    function drawCircleChart01() {
        var data = google.visualization.arrayToDataTable([
            ['TYPE', '개수'],
            ['승용',     50],
            ['SUV',      30],
            ['수입',    20]
        ]);

        var options = {
            title: '입찰비율(차종)'
        };

        var chart = new google.visualization.PieChart(document.getElementById('circle-type01'));
        chart.draw(data, options);
    }

    // 낙찰비율(차종)
    function drawCircleChart02() {
        var data = google.visualization.arrayToDataTable([
            ['TYPE', '개수'],
            ['승용',     45],
            ['SUV',      25],
            ['수입',    30]
        ]);

        var options = {
            title: '낙찰비율(차종)'
        };

        var chart = new google.visualization.PieChart(document.getElementById('circle-type02'));
        chart.draw(data, options);
    }

    // 입찰비율(유종)
    function drawCircleChart03() {
        var data = google.visualization.arrayToDataTable([
            ['TYPE', '개수'],
            ['가솔린',     50],
            ['디젤',      30],
            ['LPG',    20]
        ]);

        var options = {
            title: '입찰비율(유종)'
        };

        var chart = new google.visualization.PieChart(document.getElementById('circle-type03'));
        chart.draw(data, options);
    }

    // 낙찰비율(유종)
    function drawCircleChart04() {
        var data = google.visualization.arrayToDataTable([
            ['TYPE', '개수'],
            ['가솔린',     45],
            ['디젤',      25],
            ['LPG',    30]
        ]);

        var options = {
            title: '낙찰비율(유종)'
        };

        var chart = new google.visualization.PieChart(document.getElementById('circle-type04'));
        chart.draw(data, options);
    }

    // 낙찰차량 분포
    function drawDottedChart01 () {
        var data = new google.visualization.DataTable();

        data.addColumn('number');
        data.addColumn('number');

        data.addRows([
            [18000, 32000000],
            [51200, 25000000],
            [64000, 18210000],
            [72100, 13500000],
            [88912, 14200000],
            [112002, 9280000],
            [124820, 18500000],
            [185000, 7050000],
        ]);

        var options = {
            width: '100%',
            height: 300,
            title: '낙찰차량 분포',
            hAxis: {title: '가격', minValue: 0, maxValue: 200000},
            vAxis: {title: '주행거리', minValue: 0, maxValue: 40000000},
        };

        var chart = new google.visualization.ScatterChart(document.getElementById('dot-type01'));
        chart.draw(data, options);
    }

    // 평균 입,낙찰 금액
    function drawBarChart02() {
        var data = google.visualization.arrayToDataTable([
            ['Month', '입찰', '낙찰', '이동 평균(입찰)', '이동 평균(낙찰)'],
            ['1월',  1124, 984, 0, 0],
            ['2월',  895, 1051,  895, 1051],
            ['3월',  954, 967,  954, 967],
            ['4월',  1120, 654,  1120, 654],
            ['5월',  1321, 859,  1321, 859],
            ['6월',  992, 1564,  992, 1564],
            ['7월',  1010, 1425,  1010, 1425],
            ['8월',  887, 1210,  887, 1210],
            ['9월',  1325, 935,  1325, 935],
            ['10월',  869, 1294,  869, 1294],
            ['11월',  926, 1021,  926, 1021],
            ['12월',  1054, 947,  1054, 947]
        ]);

        var option = {
            title : '평균 입/낙찰 금액',
            series: {
                0: { type: 'bars', minValue: 0, maxValue: 2000},
                1: { type: 'bars', minValue: 0, maxValue: 2000},
                2: { type: 'line', minValue: 0, maxValue: 2000},
                3: { type: 'line', minValue: 0, maxValue: 2000},
            },
        };

        var chart = new google.visualization.ComboChart(document.getElementById('bar-type02'));
        chart.draw(data, option);
    }
});