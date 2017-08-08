var urlServices = CONFIG.WS_URL;
var urlServices2 = CONFIG.WS_URL_MASK;
var token = CONFIG.TOKEN;
var idUsu = 1;
$(document).on('ready', onReady);
function onReady() {
    loadGraph();
}

function loadGraph() {
    var loading_time = 1500;
    $(".modalLoading").show();
    $.ajax({
        type: "GET",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlServices2 + '/GetSexo',
        data: 'token=' + token,
        success: function (datos) {
            var chart = AmCharts.makeChart("chartdiv", {
                "theme": "light",
                "type": "serial",
                "precision": 1,
                "dataProvider": datos,
                "valueAxes": [{
                    "unit": "",
                    "position": "left",
                    "title": "Cantidad"
                }],
                "startDuration": 1,
                "graphs": [{
                    "balloonText": "[[category]] : <b>[[value]]</b>",
                    "fillAlphas": 0.9,
                    "lineAlpha": 0.2,
                    "title": "",
                    "type": "column",
                    "valueField": "cnt"
                }],
                "plotAreaFillAlphas": 0.1,
                "categoryField": "genero_usu",
                "categoryAxis": {
                    "gridPosition": "start"
                },
                "export": {
                    "enabled": false
                }

            });
            $.each(datos, function (i, favorites) {
                // alert(favorites.nombre_est);
            });
            setTimeout(function () {
                $(".modalLoading").hide();
            }, loading_time);
        },
        error: function (msg, url, line) {
            alert(line);
            setTimeout(function () {
                $(".modalLoading").hide();
            }, loading_time);
        }
    });
}

function goBack() {
    window.history.back();
}