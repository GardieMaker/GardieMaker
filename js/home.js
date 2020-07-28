$(document).ready(function iniciaTodo() {
    $.get("https://raw.githubusercontent.com/GardieMaker/data/master/status/activities", function(estado, success, xhr) {
        document.getElementsByClassName("news-latest")[0].innerHTML = estado;
    });

    $.get("https://raw.githubusercontent.com/GardieMaker/data/master/status/news", function(noticias, success, xhr) {
        document.getElementById("news-list").innerHTML = noticias;
    });

    $.get("https://raw.githubusercontent.com/GardieMaker/data/master/status/affiliates", function(afiliados, success, xhr) {
        document.getElementById("footer-links").innerHTML = afiliados;
    });

});

$(function() { 
    $("#load-code").click(function() { 
        window.location.href = "profile?s=" + $("#input-code").val();
    })
});
