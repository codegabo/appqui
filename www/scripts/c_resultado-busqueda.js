var urlServices = CONFIG.WS_URL;
var urlServices2 = CONFIG.WS_URL_MASK;
var token = CONFIG.TOKEN;

$(document).bind('keypress', function(e){
    if(e.which === 13) { // return
        $('#btnSearch').trigger('click');
    }
});

$(document).on('ready', onReady);

function onReady() {
    $('#btnSearch').on('click', btnSearch);
    $('#btnMapa').on('click', btnMapa);

    /*Carga de datos*/
    loadSesion();
    loadNegocios();
}

function loadSesion() {
    if (active == 'true') {
        var profilePic = window.localStorage.getItem('profilePic');
        $("#profilePic").attr('src', 'data:image/png;base64,' + profilePic);
    }
}

function btnSearch() {
    var keyword = $('#txtSearch').val();
    var category = $('#cboCategories  option:selected').val();
    var municipio = $('#cboMunicipio  option:selected').val();

    window.localStorage.setItem('keyword', keyword);
    window.localStorage.setItem('category', category);
    window.localStorage.setItem('municipio', municipio);

    loadData(keyword, category, municipio);
}

function btnMapa() {
    window.location = 'resultado-busqueda-mapa.html';
}

function loadNegocios() {
;
    var keyword = window.localStorage.getItem('keyword');
    var category = window.localStorage.getItem('category');
    var municipio = window.localStorage.getItem('municipio');

    /* Asiganacion de combos */

    $('#txtSearch').val(keyword);
    if (category == 'Categoria') {
        category = '';
    } else {
        $("#cboCategories option[value='" + category + "']").prop('selected', true);
    }

    if (municipio == 0) {
        municipio = '';
    } else {
        $("#cboMunicipio option[value='" + municipio + "']").prop('selected', true);
    }

    loadData(keyword, category, municipio);
}

function loadData(keyword, category, municipio) {

    var loading_time = 2000;
    $(".modalLoading").show();
    // setTimeout(function () {
    //     $(".modalLoading").hide();
    // }, loading_time);

    if (category == 'Categoria') {
        category = '';
    }

    if (municipio == 0) {
        municipio = 0;
    }

    /* Consulta del servicio y llenado de resultados*/
    var establecimientos = '';
    var noData = '';

    $.ajax({
        type: "GET",
        crossDomain: true,
        url: urlServices + '/SearchEstablecimiento',
        data: 'token=' + token + '&keyWord=' + keyword + '&category=' + category + '&codigoNun=' + municipio,
        success: function(datos) {
            if (datos.CodigoResultado != '0003') {
                /* en caso de encontrar*/
                $.each(datos, function(i, item) {
                    establecimientos += '<li> ' +
                        '<a href="info-local.html?id=' + item.codigo_est + '"> ' +
                        '<div class="imagen">' +
                        '<img class="img-responsive" src="data:image/jpeg;base64,' + item.foto + '" alt="">' +
                        '<div class="pin-map"></div>' +
                        '</div>' +
                        '<div class="descripcion">' +
                        '<div class="row">' +
                        '<div class="col-xs-6 col-xs-offset-3">' +
                        '</div>' +
                        '</div>' +
                        '<h1 class="text-gris-claro">' + item.nombre_est + '</h1>' +
                        '<hr>' +
                        '<ul class="calificacion">' +
                        '<li style="margin-right: 4px;"><div class=" btn-excelente">' + item.Exelente + '</div></li>' +
                        '<li style="margin-right: 4px;"><div class=" btn-bueno">' + item.Bueno + '</div></li>' +
                        '<li style="margin-right: 4px;"><div class=" btn-regular">' + item.Regular + '</div></li>' +
                        '<li style="margin-right: 4px;"><div class=" btn-malo">' + item.Malo + '</div></li>' +
                        '<li style="margin-right: 4px;"><div class=" btn-corazon">' + item.Favorito + '</div></li>' +
                        '</ul>' +
                        '<hr>' +
                        '<p>' + item.descri_est + '</p>' +
                        '</div>' +
                        '</a>' +
                        '</li>';
                });
                $("#resultados").html(establecimientos);
                $(".modalLoading").hide();
            } else {
                $("#resultados").html('');
                noData +=   '<h1 class="text-center"> No encontramos resultados para tu búsqueda' +
                            '</h1>';
                $("#resultados").html(noData);
                setTimeout(function() {
                    $(".modalLoading").hide();
                }, loading_time);
                // bootbox.alert({
                //     message: "No hay resultados",
                //     callback: function() {
                //         setTimeout(function() {
                //             $('#txtSearch').focus();
                //             $("#resultados").html('');
                //             $(".modalLoading").hide();
                //         }, 150);
                //     }
                // });
                return false;
            }
        },
        error: function(msg, url, line) {
            alert(line);
        }
    });
}

function getHour(hour) {
    var hm;
    var hora;
    var h;

    hm = hour.split(':')[1].replace('00', '').replace('30', '');
    hora = hour.split(':')[0];

    if (hm == 'am') {
        h = parseInt(hora);
    } else if (hm == 'pm') {
        h = parseInt(hora) + 12;
    }
    return h;
}

function goBack() {
    window.history.back();
}
