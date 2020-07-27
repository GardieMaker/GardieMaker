$(document).ready(function iniciaTodo() {
    $.get("https://raw.githubusercontent.com/GardieMaker/data/status/ativities", function(estado, success, xhr) {
        document.getElementsByClassName("news-latest")[0].innerHTML = estado;
    });

});

$(function() { 
    $("#load-code").click(function() { 
        window.location.href = "profile?s=" + $("#input-code").val();
    })
});
