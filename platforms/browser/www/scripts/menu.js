var rol = window.localStorage.getItem('IdRol');
var active = window.localStorage.getItem('active');

$(document).on('ready', onReady);

function onReady() {
	$('#btnLogOut').on('click', btnLogOut);
	$('#btnMenu').on('click', btnMenu);
    $('.overlay').on('click', overlayClose);
    loadMenu();
}

function loadMenu() {
    if (active == 'true') {
        $('.menuInactive').css("display", "none");
        $('.menuActive').css("display", "block");
    } else {
        $('.menuInactive').css("display", "block");
        $('.menuActive').css("display", "none");
    }
}

function btnMenu() {
    $('#wrapper').toggleClass('toggled');
    $('.overlay').show();
}

function overlayClose(){
    $('#wrapper').toggleClass('toggled');
    $('.overlay').hide();
}

function btnLogOut() {
    window.localStorage.setItem('IdRol', null);
    window.localStorage.setItem('active', false);
    window.localStorage.setItem('profilePic', null);
    window.location = 'inicio.html';
}