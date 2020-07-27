const URL_SRC = "https://www.eldarya.es/assets/img/"; 

const URL_CLOTHES = "item/player/";
const URL_SKIN = "player/skin/";
const URL_MOUTH = "player/mouth/";
const URL_EYES = "player/eyes/";
const URL_HAIR = "player/hair/";

const URL_ICON = "icon/";
const URL_FULL ="web_full/";
const URL_PORTRAIT = "web_portrait/";
var imgurl;

var groupInfo, groupList, groupPet;
var i = 0;
var str;
var galor;
//================================================================

$(document).ready(function iniciaTodo() {
    $.get("https://raw.githubusercontent.com/GardieMaker/data/master/status/ativities", function(estado, success, xhr) {
        document.getElementsByClassName("news-latest")[0].innerHTML = estado;
    });

	$.get("https://raw.githubusercontent.com/GardieMaker/data/master/groupInfo.json", function(dataInfo, success, xhr) {
		groupInfo = JSON.parse(dataInfo);
	});

	$.get("https://raw.githubusercontent.com/GardieMaker/data/master/groupList.json", function(dataList, success, xhr) {
		groupList = JSON.parse(dataList);
		getCustom();
	});

    $.get("https://raw.githubusercontent.com/GardieMaker/data/master/groupPet.json", function(dataPet, success, xhr) {
        groupPet = JSON.parse(dataPet);
        optPet();
    });
});

function getCustom() {
	str = window.location.search;
	if (str != "") {
		str = str.slice(3);
		customArray = str.split("&");
		
		cargarCanvas(customArray[0]);

        $("#footer-links").html(customArray.length + " items en uso.");

        document.getElementById("backC").setAttribute("href","wardrobe" + window.location.search);

		dragGardienne();
		dragPet();

	} else {
        $("#footer-links").html("Ningún item en uso.");
    };
};

function cargarCanvas(n) {

    try {
    	var getLista = groupList.filter(function(v){return v.itemId == n});
    	var getInfo = groupInfo.filter(function(v){return v.groupId == getLista[0].groupId});
    	
    } catch {
        alert("Se ha producido un error, la página se actualizará.");
        location.reload();
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
		//
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

	if (i < customArray.length - 1) {
		i++;
		cargarCanvas(customArray[i]);
	};
};

function optPet() {
    var selP = document.getElementById("selectPet");
    
    var option = document.createElement("option");
    option.text = "Ninguno";
    selP.add(option);

    for (p = 0; p < groupPet.length; p++) {
        option = document.createElement("option");
        option.text = groupPet[p][0];
        selP.add(option);
    };
};

function cargarPortrait(n) {

    var getLista = groupList.filter(function(v){return v.itemId == n});
    var getInfo = groupInfo.filter(function(v){return v.groupId == getLista[0].groupId});
    var newimg;

    switch (getInfo[0].category) {
        case "Fondos": newimg = URL_SRC + URL_CLOTHES + URL_PORTRAIT + getLista[0].itemURL; break;
        case "Pieles": newimg = URL_SRC + URL_SKIN + URL_PORTRAIT + getLista[0].itemURL; break;
        case "Bocas": newimg = URL_SRC + URL_MOUTH + URL_PORTRAIT + getLista[0].itemURL; break;
        case "Ojos": newimg = URL_SRC + URL_EYES + URL_PORTRAIT + getLista[0].itemURL; break;
        case "Cabello": newimg = URL_SRC + URL_HAIR + URL_PORTRAIT + getLista[0].itemURL; break;
        default: newimg = URL_SRC + URL_CLOTHES + URL_PORTRAIT + getLista[0].itemURL;
    };

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

    if (i < customArray.length - 1) {
        i++;
        cargarPortrait(customArray[i]);
    };
};

function cargarPopUp() {
    document.getElementById("player-display-draggable").style.display = "none";
    document.getElementById("player-display-pet").style.display = "none";

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
    div.setAttribute("class", "button");
    div.setAttribute("style", "display: block;position: absolute;z-index: 3;top: 17px;margin-left: 355px");
    div.setAttribute("onclick", "reLoadPortrait()");
    div.innerHTML = "Volver a cargar";
    document.getElementById("portraitcontainer").appendChild(div);

    document.getElementsByTagName("body")[0].setAttribute("style", "overflow:hidden");

}

function cierraPopUp() {
    $("div").remove("#portraitcontainer");
    $("div").remove("#portraitbg");
    document.getElementById("player-display-draggable").style.display = "block";
    document.getElementById("player-display-pet").style.display = "block";
    document.getElementsByTagName("body")[0].removeAttribute("style");
}

function reLoadPortrait() {
    $("canvas").remove("#portrait");

    var portrait = document.createElement("canvas");
    portrait.setAttribute("id","portrait");
    portrait.setAttribute("width", "800");
    portrait.setAttribute("height", "1132");
    document.getElementById("portraitcontainer").appendChild(portrait);

    i = 0;
    cargarPortrait(customArray[i]);
}


function cargarPet(select, check) {

    var imagep = document.getElementsByTagName("img")[1];
    var imgPet;

    if (select == "Ninguno") {
        $(".chkVb").hide();
        imagep.src = "";

    } else {
        var fPet = groupPet.filter(function(v){return v[0] == select});

        if (fPet[0][1] === "none" || fPet[0][2] === "none") {
            $(".chkVb").hide();
            (fPet[0][1] === "none")?(imgPet = fPet[0][2]):(imgPet = fPet[0][1]);

        } else {
            $(".chkVb").show();
            (check === false)?(imgPet = fPet[0][1]):(imgPet = fPet[0][2]);
        };

        imagep.src = "";
        imagep.src = "https://www.eldarya.es/assets/img/pet/mood/profile/" + imgPet;
        
        if (select == "Galorze") {
            imagep.style.margin = "-300px 0 -200px -100px";
            galor = true;
        } else {
            
            imagep.style.margin = "0";

            if (galor == true) {
                var asda = document.getElementById("player-display-pet");
                asda.setAttribute("style","position: absolute; inset: 100px auto auto 100px; width: auto; height: auto");
                galor = false;
            };   
        }  
    };
};

// ------------------------------------

function dragGardienne() {
    var elmnt = document.getElementById("player-display-draggable");
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

function dragPet() {
	var pet = document.getElementById("player-display-pet");
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
    $("#reLoad").click(function() { 

        var child = document.getElementsByTagName("canvas")[0];
        var parent = document.getElementsByClassName("playerProfileAvatar")[0];

        parent.removeChild(child);

        var canvas =document.createElement("canvas");
        canvas.width = 420;
        canvas.height = 594;
        parent.appendChild(canvas);

        i = 0;
        cargarCanvas(customArray[i]);
    });

    $("#borderRad").click(function() {
        var esquina = document.getElementById("player-display");

        if (esquina.getAttribute("style") == "border-radius: 0px") {
            esquina.setAttribute("style","border-radius: 10px");
        } else {
            esquina.setAttribute("style","border-radius: 0px");
        };
    });

    $("#getPortrait").click(function() {
        cargarPopUp();
        var portrait = document.createElement("canvas");
        portrait.setAttribute("id","portrait");
        portrait.setAttribute("width", "800");
        portrait.setAttribute("height", "1132");
        document.getElementById("portraitcontainer").appendChild(portrait);
        i = 0;
        cargarPortrait(customArray[i]);
    });

    $("#getCode").click(function() {
        var aux = document.createElement("input");
        aux.setAttribute("value",str);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);

        alert("Se ha copiado el código.");
    });

    $("#selectPet").change(function() {
        var a = $("#selectPet :selected").text();
        var b = $("#chkPet").prop('checked');
        cargarPet(a,b);
    });
    $("#chkPet").change(function() {
        var a = $("#selectPet :selected").text();
        var b = $("#chkPet").prop('checked');
        cargarPet(a,b);
    });

    $("#loadCode").click(function() {
        var inCode = $("#inputCode").val();
        window.location.search = "?s=" + inCode;
        
    });

});


// ------------------------------------------------------

function key() {

    var input = document.getElementById("inputCode");

    input.addEventListener("keypress", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("loadCode").click();
        };
    });

};
