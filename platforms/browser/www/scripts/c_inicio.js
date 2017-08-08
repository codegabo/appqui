$(document).on('ready', onReady);

function onReady() {
    $('#btnSearch').on('click', btnSearch);
    loadSesion();
}


function loadSesion() {
    if (active == 'true') {
        $('#promociones').show();
        // $('#perfil').show();

        var profilePic = window.localStorage.getItem('profilePic');
        $("#profilePic").attr('src', 'data:image/png;base64,' + profilePic);
    } else {
        $('#promociones').hide();
        // $('#perfil').hide();
    }
}


function btnSearch() {
    var text = $('#txtSearch').val();
    var category = $('#cboCategories  option:selected').val();
    var municipio = $('#cboMunicipio  option:selected').val();

    if (text != '' || category != 'Categoria' || municipio != 0) {
        window.localStorage.setItem('keyword', text);
        window.localStorage.setItem('category', category);
        window.localStorage.setItem('municipio', municipio);
        window.location = 'resultado-busqueda.html';
    } else {
        bootbox.alert({
            title: "Ups!",
            message: "Debes seleccionar al menos un criterio de busqueda!",
            callback: function() {
                setTimeout(function() {
                    $('#txtSearch').focus();
                }, 150);
            }
        });
        return false;
    }
}


