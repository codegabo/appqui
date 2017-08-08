$(document).on('ready', onReady);
var url;

function onReady() {
	$('#back').on('click',goBack);
}


function goBack() {
    window.history.back();
}