const URL_SRC = "https://www.eldarya.com/assets/img/"; 
const URL_CLOTHES = "item/player/", URL_SKIN = "player/skin/", URL_MOUTH = "player/mouth/", URL_EYES = "player/eyes/", URL_HAIR = "player/hair/";
const URL_ICON = "icon/", URL_FULL ="web_full/", URL_PORTRAIT = "web_portrait/";
var imgurl;

var groupInfo, groupList, dbCount = 0;
var filterGroup = [];
var selectedPage = 1;
var paginas, resto;

// Variables para cargar items
var primerItem, ultimoItem, itemLooper, item, filtro, getCodigo, getGrupo, getNombre, getCategoria, getRareza, getEspecial, getNota;
//Variables para filtros
var fGrupos, fCategorias, fEspecial, fRareza, fOrden, fName;
// Variables para fijar items
var customArray = [], selectedCode, selectedGroup, unset, hijo;
var catEs, tipo, seReemplaza = [], posicionReemplazo = "none";
// Determina si el submenu está abierto o no
var submenu = false;
var getGroupId, mainPage, mainPageI, itemsxpag = 7;
var REMOTE = "https://gardiemaker.github.io";
//----------------------------------------------

$(document).ready(function iniciaTodo() {

	$.get("https://raw.githubusercontent.com/GardieMaker/data/master/status/activities", function(estado, success, xhr) {
		document.getElementsByClassName("news-latest")[0].innerHTML = estado;
	});

	const requestInfo = new XMLHttpRequest();
	requestInfo.open("GET", REMOTE + "/data/groupInfo.json");
	requestInfo.responseType = "json";
	requestInfo.send();
	requestInfo.onload = function() {tempDB = requestInfo.response;countDB(tempDB, "info");}

	const requestList = new XMLHttpRequest();
	requestList.open("GET", REMOTE + "/data/groupList.json");
	requestList.responseType = "json";
	requestList.send();
	requestList.onload = function() {tempDB = requestList.response;countDB(tempDB, "list");}
});

function countDB(db, name) {
    
    switch (name) {
        case "info":groupInfo = db;dbCount++;break;
        case "list":groupList = db;dbCount++;
    };

    if (dbCount == 2) {getCustom();/*updateFilters();*/};
};

function getCustom() {
	var str = window.location.search;

	if (str != "") {
		if (str.includes("?s=") && (str != "?s=")) {

			str = str.slice(3);
			customArray = str.split("&");
			cargarArray(0);
		} else {
			window.location.href = "wardrobe";
		};
	};
};

function cargarArray(i) {
	var img, img2;
		var buscaMain = [];

		//Es necesario saber si hay un fondo 
		if (i != posicionReemplazo) {
			buscaMain = groupList.filter(function(v){return v.itemId == customArray[i]});
		} else {
			buscaMain = groupList.filter(function(v){return v.itemId == selectedCode});
		};
		
		var filtro = groupInfo.filter(function(v){return v.groupId == buscaMain[0].groupId});

		switch (filtro[0].category) {
			case "Fondos": img = URL_SRC + URL_CLOTHES + URL_FULL + buscaMain[0].itemURL; break;
			case "Pieles": img = URL_SRC + URL_SKIN + URL_FULL + buscaMain[0].itemURL; break;
			case "Bocas": img = URL_SRC + URL_MOUTH + URL_FULL + buscaMain[0].itemURL; break;
			case "Ojos": img = URL_SRC + URL_EYES + URL_FULL + buscaMain[0].itemURL; break;
			case "Cabello": img = URL_SRC + URL_HAIR + URL_FULL + buscaMain[0].itemURL; break;
			default: img = URL_SRC + URL_CLOTHES + URL_FULL + buscaMain[0].itemURL;
		};

		if (filtro[0].category == "Fondos") {
			document.getElementById("marketplace-avatar-background-preview").style.backgroundImage = "url('" + img + "')";
		} else {

			var canvas = document.createElement("canvas");
			canvas.setAttribute("width", "420");
			canvas.setAttribute("height", "594");
			if (i == posicionReemplazo) {
				canvas.setAttribute("id",selectedCode);
			} 
			document.getElementById("marketplace-avatar-preview").appendChild(canvas);

			canvas = document.getElementsByTagName("canvas");
			var ctx = canvas[i].getContext("2d");

			img2 = new Image();
			img2.onload = function() {
				ctx.drawImage(img2, 0, 0);
			};

			img2.src = img;

		};

	if (i < customArray.length - 1) {
		i++
		cargarArray(i);
	};
};
