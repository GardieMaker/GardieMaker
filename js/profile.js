const URL_SRC = "https://www.eldarya.com/assets/img/", URL_PJ = "https://www.eldarya.com/assets/img/npc/mood/web/";
const URL_CLOTHES = "item/player/", URL_SKIN = "player/skin/", URL_MOUTH = "player/mouth/", URL_EYES = "player/eyes/", URL_HAIR = "player/hair/";
const URL_ICON = "icon/", URL_FULL ="web_full/", URL_HD = "web_hd/", URL_PORTRAIT = "web_portrait/";
var REMOTE = "https://gardiemaker.github.io";

var groupInfo, groupList, groupPet, groupFriend;
var str, portraitMin = false;
var imgurl, galor;

//================================================================

$(document).ready(function () {
    $.get("https://raw.githubusercontent.com/GardieMaker/data/master/status/activities", function(estado, success, xhr) {
        document.getElementsByClassName("news-latest")[0].innerHTML = estado;
    });

    const requestInfo = new XMLHttpRequest(); requestInfo.open("GET", REMOTE + "/data/groupInfo.json");
    requestInfo.responseType = "json"; requestInfo.send(); requestInfo.onload = function() {

        const requestList = new XMLHttpRequest(); requestList.open("GET", REMOTE + "/data/groupList.json");
        requestList.responseType = "json"; requestList.send(); requestList.onload = function() {

            const requestPet = new XMLHttpRequest(); requestPet.open("GET", REMOTE + "/data/groupPet.json");
            requestPet.responseType = "json"; requestPet.send(); requestPet.onload = function() {

                const requestFriend = new XMLHttpRequest(); requestFriend.open("GET", REMOTE + "/data/groupFriend.json");
                requestFriend.responseType = "json"; requestFriend.send(); requestFriend.onload = function() {
                    
                    groupInfo = requestInfo.response;
                    groupList = requestList.response;
                    groupPet = requestPet.response;
                    groupFriend = requestFriend.response;

                    getCustom(); optPet(); optFriend();
                };
            };
        };
    };
});

function getCustom() {
	str = window.location.search;

	if (str != "") {
		str = str.slice(3);
		customArray = str.split("&");
		
		if (customArray.length == 1) {
            document.getElementById("player-display-draggable").style.display = "none";
            $("#player-actions-tab li").eq(1).hide();
        }
        cargarCanvas(0);

        $("#footer-links").html(customArray.length + " items en uso.");

        document.getElementById("edit-code").setAttribute("href","wardrobe" + window.location.search);

	} else {

        $("#footer-links").html("Ningún item en uso.");
        document.getElementById("player-display-draggable").style.display = "none";
        $("#player-actions-tab li").eq(1).hide();
    };

    dragGardienne('player-display-draggable');
    dragGardienne('friend-display-draggable');

    dragPet("player-display-pet");
    dragPet("friend-display-pet");

};

function cargarCanvas(n = 0) {

    var error = "";

    try {
    	var getLista = groupList.filter(function(v){return v.itemId == customArray[n]});
        (getLista.length == 0)?(error = "Código incorrecto"):("");
    	var getInfo = groupInfo.filter(function(v){return v.groupId == getLista[0].groupId});
    	
    } catch {

        if (error != "") {
            alert("El código introducido no es correcto o está corrupto.");
            document.getElementById("player-display-draggable").style.display = "none";
            $("#player-actions-tab li").eq(1).hide();

        } else {
            alert("Se ha producido un error, la página se actualizará.");
            location.reload();
        }
        
    };

    var newimg;

	switch (getInfo[0].category) {
		case "Fondos": newimg = URL_SRC + URL_CLOTHES + URL_FULL + getLista[0].itemURL; break;
		case "Pieles": newimg = URL_SRC + URL_SKIN + URL_FULL + getLista[0].itemURL; break;
		case "Bocas": newimg = URL_SRC + URL_MOUTH + URL_FULL + getLista[0].itemURL; break;
		case "Ojos": newimg = URL_SRC + URL_EYES + URL_FULL + getLista[0].itemURL; break;
		case "Cabello": newimg = URL_SRC + URL_HAIR + URL_FULL + getLista[0].itemURL; break;
		default: newimg = URL_SRC + URL_CLOTHES + URL_FULL + getLista[0].itemURL;
	};

	if (getInfo[0].category == "Fondos") {
		var fondo = document.getElementsByClassName("player-element background-element")[0];

		fondo.style.background = "url('" + newimg + "')";

	} else {
	//*------------------
		var canvas = document.getElementsByTagName("canvas")[0];
		var ctx = canvas.getContext("2d");
		var img = new Image();

    	img.onload = function() {
			ctx.drawImage(img, 0, 0);
		};

        img.src = newimg;
	};

	if (n < customArray.length - 1) {
		n++; cargarCanvas(n);
	};
};

function optPet() {

    for (s = 0; s < 2; s++) {

        var selP;
        (s == 0)?(selP = document.getElementById("select-player-pet")):(selP = document.getElementById("select-friend-pet"));
        
        var option = document.createElement("option");
        option.text = "Ninguno";
        selP.add(option);

        for (p = 0; p < groupPet.length; p++) {
            option = document.createElement("option");
            option.text = groupPet[p][0];
            selP.add(option);
        };
    };
};

function optFriend() {
    var selF = document.getElementById("select-friend");
    
    var option = document.createElement("option");
    option.text = "Ninguno";
    selF.add(option);

    for (f = 0; f < groupFriend.length; f++) {
        option = document.createElement("option");
        option.text = groupFriend[f].name;
        selF.add(option);
    };

    option = document.createElement("option");
    option.text = "Otro...";
    selF.add(option);
};

function cargarPortrait(n = 0) {

    var getLista = groupList.filter(function(v){return v.itemId == customArray[n]});
    var getInfo = groupInfo.filter(function(v){return v.groupId == getLista[0].groupId});
    var newimg;

    if (portraitMin == false) {

        switch (getInfo[0].category) {
            case "Fondos": newimg = URL_SRC + URL_CLOTHES + URL_HD + getLista[0].itemURL; break;
            case "Pieles": newimg = URL_SRC + URL_SKIN + URL_HD + getLista[0].itemURL; break;
            case "Bocas": newimg = URL_SRC + URL_MOUTH + URL_HD + getLista[0].itemURL; break;
            case "Ojos": newimg = URL_SRC + URL_EYES + URL_HD + getLista[0].itemURL; break;
            case "Cabello": newimg = URL_SRC + URL_HAIR + URL_HD + getLista[0].itemURL; break;
            default: newimg = URL_SRC + URL_CLOTHES + URL_HD + getLista[0].itemURL;
        };

    } else {

        switch (getInfo[0].category) {
            case "Fondos": newimg = URL_SRC + URL_CLOTHES + URL_FULL + getLista[0].itemURL; break;
            case "Pieles": newimg = URL_SRC + URL_SKIN + URL_FULL + getLista[0].itemURL; break;
            case "Bocas": newimg = URL_SRC + URL_MOUTH + URL_FULL + getLista[0].itemURL; break;
            case "Ojos": newimg = URL_SRC + URL_EYES + URL_FULL + getLista[0].itemURL; break;
            case "Cabello": newimg = URL_SRC + URL_HAIR + URL_FULL + getLista[0].itemURL; break;
            default: newimg = URL_SRC + URL_CLOTHES + URL_FULL + getLista[0].itemURL;
        };

    }

    if (getInfo[0].category == "Fondos") {
    } else {
    //*------------------
        var canvas = document.getElementById("portrait");
        var ctx = canvas.getContext("2d");
        var img = new Image();

        //img.crossOrigin = "";
    
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
        };
        
        img.src = newimg;
    };

    if (n < customArray.length - 1) {
        n++;
        cargarPortrait(n);
    };
};

function cargarPopUp() {

    var div = document.createElement("div");
    div.setAttribute("id","portraitbg");
    document.getElementsByTagName("body")[0].appendChild(div);

    div = document.createElement("div");
    div.setAttribute("id","portraitcontainer");
    document.getElementById("portraitbg").appendChild(div);

    // botón cierra portrait
    div = document.createElement("div");
    div.setAttribute("id", "buttonClose");
    div.setAttribute("onclick", "cierraPopUp()");
    document.getElementById("portraitcontainer").appendChild(div);

    // boton recargar
    div = document.createElement("div");
    div.setAttribute("id", "portrait-buttons");
    document.getElementById("portraitcontainer").appendChild(div);

    div = document.createElement("div");
    div.setAttribute("class", "button");
    div.setAttribute("id", "max-size");
    div.setAttribute("onclick", "maxSize()");
    //(portraitMin == false)?(div.innerHTML = "Volver a cargar"):(div.innerHTML = "Ver. 800x1132");
    (portraitMin == false)?(div.innerHTML = "Volver a cargar"):(div.innerHTML = "Ver. 630x891");
    document.getElementById("portrait-buttons").appendChild(div);

    div = document.createElement("div");
    div.setAttribute("class", "button");
    div.setAttribute("id", "min-size");
    div.setAttribute("onclick", "minSize()");
    (portraitMin == true)?(div.innerHTML = "Volver a cargar"):(div.innerHTML = "Ver. 420x594");
    document.getElementById("portrait-buttons").appendChild(div);

    document.getElementsByTagName("body")[0].setAttribute("style", "overflow:hidden");
};

function cierraPopUp() {
    $("div").remove("#portraitcontainer");
    $("div").remove("#portraitbg");
    document.getElementsByTagName("body")[0].removeAttribute("style");
};

function maxSize() {

    portraitMin = false;
    $("#max-size").text("Volver a cargar");
    $("#min-size").text("Ver. 420x594");

    $("canvas").remove("#portrait");
    var portrait = document.createElement("canvas");
    portrait.setAttribute("id","portrait");
    portrait.setAttribute("width", "630");
    portrait.setAttribute("height", "891");
    document.getElementById("portraitcontainer").appendChild(portrait);

    cargarPortrait(0);
};

function minSize() {

    portraitMin = true;
    $("#max-size").text("Ver. 630x891");
    $("#min-size").text("Volver a cargar");

    $("canvas").remove("#portrait");
    var portrait = document.createElement("canvas");
    portrait.setAttribute("id","portrait");
    portrait.setAttribute("width", "420");
    portrait.setAttribute("height", "594");
    document.getElementById("portraitcontainer").appendChild(portrait);

    cargarPortrait(0);
};

function cargarPet(select, check, owner) {

    var imagep;
    (owner == "player")?(imagep = document.getElementById("img-player-pet")):(imagep = document.getElementById("img-friend-pet"));

    var imgPet;

    if (select == "Ninguno") {
        if (owner == "player") {
            $("#check-player-span").hide();
        } else {
            $("#check-friend-span").hide();
        }

        imagep.src = "";

    } else {
        var fPet = groupPet.filter(function(v){return v[0] == select});

        if (fPet[0][1] === "none" || fPet[0][2] === "none") {
            
            if (owner == "player") {
                $("#check-player-span").hide();
            } else {
                $("#check-friend-span").hide();
            }

            (fPet[0][1] === "none")?(imgPet = fPet[0][2]):(imgPet = fPet[0][1]);

        } else {
            
            if (owner == "player") {
                $("#check-player-span").show();
            } else {
                $("#check-friend-span").show();
            }

            (check === false)?(imgPet = fPet[0][1]):(imgPet = fPet[0][2]);
        };

        imagep.src = "";
        imagep.src = "https://www.eldarya.com/assets/img/pet/mood/profile/" + imgPet;
        
        if (select == "Galorze") {
            imagep.style.margin = "-300px 0 -200px -100px";
            galor = true;
        } else {
            
            imagep.style.margin = "0";

            if (galor == true) {
                var asda;
                (owner == "player")?(asda = document.getElementById("player-display-pet")):(asda = document.getElementById("friend-display-pet"));
                
                asda.setAttribute("style","position: absolute; inset: 100px auto auto 100px; width: auto; height: auto");
                galor = false;
            };   
        }  
    };
};

function cargarFriend(nombre, i) {

    var img = document.getElementById("img-friend");

    if(i != "url") {

        var filtro = groupFriend.filter(function(v){return v.name == nombre});        
        img.setAttribute("src", URL_PJ + filtro[0].version[i - 1]);
        img.style.height = filtro[0].altura;

        alert("Un momento...");

        var cuenta = ((210 - img.clientWidth)/2);
        img.style.marginLeft = cuenta + "px";

    } else {

        img.setAttribute("src", nombre);
        img.style.height = $("#input-height").val() + "px";

        alert("Un momento...");

        var cuenta = ((210 - img.clientWidth)/2);
        img.style.marginLeft = cuenta + "px";

    };
};

function rellenaSelectPosicion() {

    var pet1 = $("#select-player-pet :selected").text();
    var friend = $("#select-friend :selected").text();
    var pet2 = $("#select-friend-pet :selected").text();

    var select = document.getElementById("position-player");
    var gardie = document.getElementById("player-display-draggable");
    $('#position-player option').remove();

    if (gardie.style.display != "none") {
        var option = document.createElement("option");
        option.text = "Gardienne";
        select.add(option);
    };

    if (pet1 != "Ninguno") {
        var option = document.createElement("option");
        option.text = "Familiar 1";
        select.add(option);
    };

    if (friend != "Ninguno") {
        var option = document.createElement("option");
        option.text = "Compañero";
        select.add(option);
    };

    if (pet2 != "Ninguno") {
        var option = document.createElement("option");
        option.text = "Familiar 2";
        select.add(option);
    };

    
    if (select.length > 1) {
        document.getElementsByClassName("bonus-container")[2].style.display = "revert";
    } else {
        document.getElementsByClassName("bonus-container")[2].style.display = "none";
    };
};

function muevePosicion(mov) {
    var select = document.getElementById("position-player");
    var elmnt, z, uno, dos, tres, cuatro;
    var opcion = $("#position-player :selected").text();

    // Obtiene elemento que cambia de posición
    if (opcion == "Gardienne") {
        elmnt = document.getElementById("player-display-draggable");
    } else if (opcion == "Familiar 1") {
        elmnt = document.getElementById("player-display-pet");
    } else if (opcion == "Compañero") {
        elmnt = document.getElementById("friend-display-draggable");
    } else if (opcion == "Familiar 2") {
        elmnt = document.getElementById("friend-display-pet");
    };

    z = elmnt.style.zIndex;

    // Obtiene todos los elementos para obtener posicion
    uno = document.getElementById("player-display-draggable");
    dos = document.getElementById("player-display-pet");
    tres = document.getElementById("friend-display-draggable");
    cuatro = document.getElementById("friend-display-draggable");

    var zUno = uno.style.zIndex;
    var zDos = dos.style.zIndex;
    var zTres = tres.style.zIndex;
    var zCuatro = cuatro.style.zIndex;

    // Fija nueva ubicación
    (mov == "sube")?(z++):(z--);

    // Busca elemento con misma posición de z
    if (mov == "sube") {
        if (z < 5) {
            (zUno == z)?(zUno--):(zDos == z)?(zDos--):(zTres == z)?(zTres--):(zCuatro--);
        };
    } else {
        if (z > 0) {
            (zUno == z)?(zUno++):(zDos == z)?(zDos++):(zTres == z)?(zTres++):(zCuatro++);
        };
    };

    // Fija nuevos posiciones finales
    uno.style.zIndex = zUno;
    dos.style.zIndex = zDos;
    tres.style.zIndex = zTres;
    cuatro.style.zIndex = zCuatro;

    // Solo cambia el valor si z se encuentra dentro del rango
    if (z < 5 && z > 0) {
        elmnt.style.zIndex = z;
    }
}

// ------------------------------------

function dragGardienne(pj) {
    //var elmnt = document.getElementById("player-display-draggable");
    var elmnt = document.getElementById(pj);
    var pos1 = 0, pos3 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    };

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    };

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos3 = e.clientX;
        // set the element's new position:
        var val = elmnt.offsetLeft - pos1;

        if (val >= 0 && val <= 590) {
        	elmnt.style.left = (val) + "px";
        } else {
        	(val < 0)?(val = 0):(val = 590);
        	elmnt.style.left = (val) + "px";
        };
    };

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    };
};

function dragPet(id) {
	var pet = document.getElementById(id);
	//var petContainer = document.getElementById("player-pet-containment");
	var pp1 = 0, pp2 = 0, pp3 = 0, pp4 = 0;
	if (document.getElementById(pet.id + "header")) {
		/* if present, the header is where you move the DIV from:*/
		document.getElementById(pet.id + "header").onmousedown = dragMouseDown;
	} else {
		/* otherwise, move the DIV from anywhere inside the DIV:*/
		pet.onmousedown = dragMouseDown;
  	};

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pp3 = e.clientX;
		pp4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	 };

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pp1 = pp3 - e.clientX;
        pp2 = pp4 - e.clientY;
        pp3 = e.clientX;
        pp4 = e.clientY;
        // set the element's new position:

        var vTop = pet.offsetTop - pp2;
        var vLeft = pet.offsetLeft - pp1;

        var petHeight = $("#player-display-pet").height();
        var petWidth = $("#player-display-pet").width();

        if (vLeft >= -182.4 && vLeft <= (982.4 - petWidth)) {
        	pet.style.left = (vLeft) + "px";
        } else {
        	(vLeft < -182.4)?(vLeft = -182.4):(vLeft = (982.4 - petWidth));
        	pet.style.left = (vLeft) + "px";
        };

        if (vTop >= -132 && vTop <= (732 - petHeight)) {
        	pet.style.top = (vTop) + "px";
        } else {
        	(vTop < -132)?(vTop = -132):(vTop = (732 - petHeight));
        	pet.style.top = (vTop) + "px";
        };
    };

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    };
};

// ------------------------------------

$(function() { 
    $("#reload").click(function() { 

        var child = document.getElementsByTagName("canvas")[0];
        var parent = document.getElementsByClassName("playerProfileAvatar")[0];

        parent.removeChild(child);

        var canvas =document.createElement("canvas");
        canvas.width = 420;
        canvas.height = 594;
        parent.appendChild(canvas);

        cargarCanvas(0);
    });

    $("#border-rad").click(function() {
        var esquina = document.getElementById("player-display");

        if (esquina.getAttribute("style") == "border-radius: 0px") {
            esquina.setAttribute("style","border-radius: 10px");
        } else {
            esquina.setAttribute("style","border-radius: 0px");
        };
    });

    $("#get-portrait").click(function() {
        cargarPopUp();

        if (portraitMin == false) {
            maxSize();
        } else {
            minSize();
        }
    });

    $("#get-code").click(function() {
        var aux = document.createElement("input");
        aux.setAttribute("value",str);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);

        alert("Se ha copiado el código.");
    });

    $("#select-player-pet").change(function() {
        var a = $("#select-player-pet :selected").text();
        var b = $("#check-player-pet").prop('checked');
        var c = "player";
        cargarPet(a,b,c);
        rellenaSelectPosicion();
    });
    $("#check-player-pet").change(function() {
        var a = $("#select-player-pet :selected").text();
        var b = $("#check-player-pet").prop('checked');
        var c = "player";
        cargarPet(a,b,c);
    });

    $("#select-friend-pet").change(function() {
        var a = $("#select-friend-pet :selected").text();
        var b = $("#check-friend-pet").prop('checked');
        var c = "friend";
        cargarPet(a,b,c);
        rellenaSelectPosicion();
    });
    $("#check-friend-pet").change(function() {
        var a = $("#select-friend-pet :selected").text();
        var b = $("#check-friend-pet").prop('checked');
        var c = "friend";
        cargarPet(a,b,c);
    });

    $("#select-friend").change(function() {

        document.getElementById("img-friend").setAttribute("src","");
        $('#select-version option').remove();
        var a = $("#select-friend :selected").text();
        var selV = document.getElementById("select-version");
        document.getElementById("otro-container").style.display = "none";

        if(a != "Ninguno"){
            document.getElementById("button-centrar").style.display = "revert";
        } else {
            document.getElementById("button-centrar").style.display = "none";
        };

        if(a != "Ninguno" && a != "Otro...") {
            document.getElementById("friend-display-draggable").style.display = "block";
            var filtro = groupFriend.filter(function(v){return v.name == a});

            for (f = 1; f <= filtro[0].version.length; f++) {
                option = document.createElement("option");
                option.text = f;
                selV.add(option);
            };

            selV.style.display = "revert";
            var b = $("#select-version :selected").text();

            cargarFriend(a,b);

        } else if (a == "Otro...") {

            selV.style.display = "none";
            document.getElementById("friend-display-draggable").style.display = "none";
            document.getElementById("otro-container").style.display = "block";

        } else {
            document.getElementById("friend-display-draggable").style.display = "none";
            selV.style.display = "none";
        };

        rellenaSelectPosicion();
    });
    $("#select-version").change(function() {
        document.getElementById("img-friend").setAttribute("src","");
        var a = $("#select-friend :selected").text();
        var b = $("#select-version :selected").text();
        cargarFriend(a,b);
    });

    $("#button-centrar").click(function() {
        var img = document.getElementById("img-friend");
        var cuenta = ((210 - img.clientWidth)/2);
        img.style.marginLeft = cuenta + "px";
    });

    $("#load-url").click(function() {
        document.getElementById("friend-display-draggable").style.display = "block";
        var url = $("#input-url").val();
        cargarFriend(url, "url");
        rellenaSelectPosicion();
    });
    
    $("#position-bajar").click(function() {
        muevePosicion("baja");
    });
    $("#position-subir").click(function() {
        muevePosicion("sube");
    });

    $("#load-code").click(function() {
        var inCode = $("#input-code").val();
        window.location.search = "?s=" + inCode;
        
    });

});

