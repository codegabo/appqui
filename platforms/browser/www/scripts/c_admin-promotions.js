var urlServices = CONFIG.WS_URL;
var urlServices2 = CONFIG.WS_URL_MASK;
var token = CONFIG.TOKEN;
var imageB64;
var endPromoDate;

$(document).on('ready', onReady);

function onReady() {
    $('#btnEntrar').on('click', btnEntrar);
    $('#btnCerrar').on('click', btnCerrar);
    load();
    loadSesion();
}

function loadSesion() {
    if (active == 'true') {
        var profilePic = window.localStorage.getItem('profilePic');
        $("#profilePic").attr('src', 'data:image/png;base64,' + profilePic);
    }
}

function load() {
    var loading_time = 1500;
    $(".modalLoading").show();
    $('#lstPromo').empty();
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate());
    var formatTomorrow = tomorrow.toLocaleDateString("zh-Hans-CN");
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: urlServices + 'Promociones',
        data: 'token=' + token,
        success: function(datos) {
            alert(formatTomorrow); alert(moment(formatTomorrow, 'YYYY/MM/DD',true).isValid()); //false
            $.each(datos, function(i, promo) {
                endPromoDate = promo.fecfin_pro; alert(endPromoDate);
                if (promo.foto != null) {
                    imageB64 = "data:image/jpeg;base64," + promo.foto;
                } else {
                    imageB64 = "img/img-producto.png";
                }
                $("#lstPromo").append('<li class="mb-10"> \
                                    <div class="row vertical-align">\
                                        <div class="col-xs-3 "><img src="' + imageB64 + '" alt="" class="img-responsive imgPromo"></div>\
                                        <div class="col-xs-7 no-padding ">\
                                            <h1 class="text-azul-claro">' + promo.establ_pro + '</h1>\
                                            <h2>' + promo.caract_pro + '\
                                            </h2>\
                                         </div>\
                                        <div class="col-xs-2 no-padding">\
                                            <div class="porcentaje">' + promo.porcen_pro + ' %</div>\
                                             <ul class="boton">\
                                                <li onclick="addPromocion();"><div><span class="glyphicon glyphicon-plus form-control-feedback-search" aria-hidden="true"></span></div></li>\
                                                <li onclick="editPromocion();"><div><span class="glyphicon glyphicon-pencil form-control-feedback-search" aria-hidden="true"></span></div></li>\
                                                <li><div><span class="glyphicon glyphicon-trash form-control-feedback-search" aria-hidden="true"></span></div></li>\
                                            </ul>\
                                        </div>\
                                    </div>\
                                   </li>');
            });
            setTimeout(function() {
                $(".modalLoading").hide();
            }, loading_time);
        },
        error: function(msg, url, line) {
            setTimeout(function() {
                $(".modalLoading").hide();
            }, loading_time);
            alert(line);
        }
    });
}


function addPromocion(){
    window.location = 'admin-promociones-edit.html';
}

function editPromocion(){
    window.location = 'admin-promociones-edit.html';
}

function btnEntrar() {
    window.location = 'login.html';
}

function btnCerrar() {
    window.localStorage.setItem('IdRol', null);
    window.localStorage.setItem('active', false);
    window.localStorage.setItem('profilePic', null);
    window.location = 'inicio.html';
}

function goBack() {
    window.history.back();
}
