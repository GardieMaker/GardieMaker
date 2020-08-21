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
//----------------------------------------------

$(document).ready(function iniciaTodo() {

	$.get("https://raw.githubusercontent.com/GardieMaker/data/master/status/activities", function(estado, success, xhr) {
		document.getElementsByClassName("news-latest")[0].innerHTML = estado;
	});

	const requestInfo = new XMLHttpRequest();
	requestInfo.open("GET", "/data/groupInfo.json");
	requestInfo.responseType = "json";
	requestInfo.send();
	requestInfo.onload = function() {tempDB = requestInfo.response;countDB(tempDB, "info");}

	const requestList = new XMLHttpRequest();
	requestList.open("GET", "/data/groupList.json");
	requestList.responseType = "json";
	requestList.send();
	requestList.onload = function() {tempDB = requestList.response;countDB(tempDB, "list");}

});

function countDB(db, name) {
    
    switch (name) {
        case "info":groupInfo = db;dbCount++;break;
        case "list":groupList = db;dbCount++;
    };

    if (dbCount == 2) {updateFilters();getCustom();};
};


function getCustom() {
	var str = window.location.search;

	if (str != "") {
		if (str.includes("?s=") && (str != "?s=")) {

			str = str.slice(3);
			customArray = str.split("&");
			limpiarCanvas();

		} else {
			window.location.href = "wardrobe";
		};
	};

};

function unselectAll() {
	var lista = document.getElementsByClassName("marketplace-abstract marketplace-search-item selected");
	if (lista.length == 1) {
		lista[0].setAttribute("class","marketplace-abstract marketplace-search-item");
	}
	
	posicionReemplazo = "none";
	limpiarCanvas();
	document.getElementById("marketplace-itemDetail").setAttribute("style","display:none");
	selectedCode = "";
};

function searchtoSelect(code) {

	// Comprobar si es piel, cabello, ojos, boca, ropa interior, fondo
	var catSelect = groupInfo.filter(function(v){return v.groupId == selectedGroup});
	tipo = catSelect[0].category; // necesario para cargar canvas
	var infoReem = [];
	posicionReemplazo = "none";

	switch (catSelect[0].category) {
		case "Pieles":catEs = "Pieles";break;
		case "Cabello":catEs = "Cabello";break;
		case "Ojos":catEs = "Ojos";break;
		case "Bocas":catEs = "Bocas";break;
		case "Fondos":catEs = "Fondos";break;
		case "Ropa interior":catEs = "Ropa interior";break;
		default:catEs = "none";
	};

	if (catEs != "none") {
		// Buscar si existe categorias "unicas"
		for (c = 0; c < customArray.length; c++) {
			seReemplaza = groupList.filter(function(v){return v.itemId == customArray[c]});
			infoReem = groupInfo.filter(function(v){return v.groupId == seReemplaza[0].groupId});
			if (infoReem.length > 0) {
				if (infoReem[0].category == catEs) {
					if (selectedCode == customArray[c]) {
						posicionReemplazo = c;
						hijo = posicionReemplazo;
						// Misma prenda
						$(".button.marketplace-itemDetail-set").text("QUITAR");
						break;
					} else {
						posicionReemplazo = c;
						hijo = posicionReemplazo;
						// Reemplaza catEs
						$(".button.marketplace-itemDetail-set").text("REEMPLAZAR");
						break;
					};
				};
			};
		};
	} else {
		// Busca si es variocolor
		for (c = 0; c < customArray.length; c++) {
			seReemplaza = groupList.filter(function(v){return v.itemId == customArray[c]});
			if (seReemplaza[0].groupId == selectedGroup) {
				if (selectedCode == customArray[c]) {
					posicionReemplazo = c;
					hijo = posicionReemplazo;
					// Misma prenda
					$(".button.marketplace-itemDetail-set").text("QUITAR");
					break;
				} else {
					posicionReemplazo = c;
					hijo = posicionReemplazo;
					// Cambia color
					$(".button.marketplace-itemDetail-set").text("REEMPLAZAR");
					break;
				};
			}
		};
	};

	if (posicionReemplazo == "none") {
		// Prenda nueva
		$(".button.marketplace-itemDetail-set").text("FIJAR");
		nuevoCanvas();
	} else {
		limpiarCanvas();
	};

	document.getElementById("marketplace-itemDetail").setAttribute("style","dislpay:block");
};

function nuevoCanvas() {

	var temp = groupList.filter(function(v){return v.itemId == selectedCode});
	var img;

	switch (tipo) {
		case "Pieles": img = URL_SRC + URL_SKIN + URL_FULL + temp[0].itemURL; break;
		case "Bocas": img = URL_SRC + URL_MOUTH + URL_FULL + temp[0].itemURL; break;
		case "Ojos": img = URL_SRC + URL_EYES + URL_FULL + temp[0].itemURL; break;
		case "Cabello": img = URL_SRC + URL_HAIR + URL_FULL + temp[0].itemURL; break;
		default: img = URL_SRC + URL_CLOTHES + URL_FULL + temp[0].itemURL;
	};
	
	var newimg = img;
	//var tipo = document.getElementsByClassName("abstract-type")[n].innerHTML;

	if (tipo == "Fondos") {
		document.getElementById("marketplace-avatar-background-preview").style.backgroundImage = "url('" + newimg + "')";
		//
	} else {
	//*------------------
		var canvas = document.createElement("canvas");
		canvas.setAttribute("id", selectedCode);
		canvas.setAttribute("width", "420");
		canvas.setAttribute("height", "594");
		document.getElementById("marketplace-avatar-preview").appendChild(canvas);
	//-----------------*/
		var canvas = document.getElementsByTagName("canvas");
		var ctx = canvas[canvas.length-1].getContext("2d");

		img = new Image();

		img.onload = function() {
			ctx.drawImage(img, 0, 0);
		};

		img.src = newimg;
	};

	var cont = document.getElementsByTagName("canvas");
	for (z = 0; z < cont.length; z++) {
		if (cont[z].getAttribute("id") == selectedCode) {
			hijo = z;
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

function limpiarCanvas(){

	document.getElementById("marketplace-avatar-background-preview").removeAttribute("style");
	var child = document.getElementsByTagName("canvas");
	var parent = document.getElementById("marketplace-avatar-preview");

	for (i = child.length-1; i >= 0; i--) {
		parent.removeChild(child[i]);
	};

	// Si hay algo fijado en array, cargarlo
	if (customArray.length != 0) {
		cargarArray(0);
	};		
};

//////////////////////////////////////////////////////////////

function doMove(place) {
	var nodo = document.getElementById(selectedCode);
	var padre = document.getElementById("marketplace-avatar-preview");
	var cont = document.getElementsByTagName("canvas");

	if (place == "prev") {
		if (hijo > 0) {
			nodo.parentNode.removeChild(nodo);
			hijo--;
			padre.insertBefore(nodo, cont[hijo]);
		}
	} else if (place == "next") {
		nodo.parentNode.removeChild(nodo);
		hijo++;
		padre.insertBefore(nodo, cont[hijo]);
	};
};

function doSet(code) {

	setunset = document.getElementsByClassName("button marketplace-itemDetail-set")[0].innerHTML;

	if (setunset == "FIJAR") {

		if (code != "undefined") {

			if (filtro[0].category != "Fondos") {
				customArray.splice(hijo,0, selectedCode);
			} else {
				customArray.push(selectedCode);
			};
			
			var str = "?s=";

			for (i = 0; i < customArray.length; i++) {
				(i == 0)? (str = str + customArray[i]):(str = str + "&" + customArray[i]);
			};

			history.pushState(null, "", str);

			limpiarCanvas();

		} else {
			alert("No se puede fijar un artículo sin código.");
		};

	} else if (setunset == "QUITAR") {
		var b;

		for (i = 0; i < customArray.length; i++) {
			if (code == customArray[i]) {b = i;break;};
		};

		var str;

		customArray.splice(b,1);
		if (customArray.length == 0) {
			window.location.search = "";
		} else {
			str = "?s=";
		};

		for (i = 0; i < customArray.length; i++) {
			(i == 0)? (str = str + customArray[i]):(str = str + "&" + customArray[i]);
		};
		
		history.pushState(null, "", str);

		limpiarCanvas();

	} else if (setunset == "REEMPLAZAR") {
		
		customArray.splice(posicionReemplazo,1);

		var srt = window.location.search;
		if (srt.includes("&" + selectedCode)) {
			customArray.splice(hijo,0, "&" + selectedCode); //Nueva ubicación
		} else {
			customArray.splice(hijo,0, selectedCode); //Nueva ubicación
		};

		str = "?s=";
		for (i = 0; i < customArray.length; i++) {
			(i == 0)? (str = str + customArray[i]):(str = str + "&" + customArray[i]);
		};
		
		history.pushState(null, "", str);
		limpiarCanvas();

	};

	unselectAll();

};

function genPerfil() {
	var str = window.location.search;
	
	window.location.href = "./profile" + str;
}

//////////////////////////////////////////////////////////////

function crearPagination() {

	// Borra pagination
	$("div").remove(".page");
	$("span").remove(".truncation");

	if (itemsxpag == 7) {
		$("div").remove("#marketplace-search-title");
		$("div").remove(".marketplace-abstract.marketplace-search-back");
	}
		
	// Cada página tiene 7 elementos)
	
	if (filterGroup.length <= itemsxpag) {

		paginas = 0;
		resto = filterGroup.length;

	} else if (filterGroup.length > itemsxpag) {

		paginas = filterGroup.length / itemsxpag
		resto = filterGroup.length % itemsxpag;

		// Comprobar si hay páginas incompletas
		if (resto != 0) {
			paginas = Math.ceil(paginas);
		};

	};

		// --------------------------------------------------
		// ---------------- Crea pagination -----------------
		// --------------------------------------------------

		// Debe ejecutarse cada vez que se cambie de página.
	limpiaElementos();

	if (paginas <= 12) {
		var indice = 0;
			
		for (i = 1; i <= paginas; i++) {
			// Crear elementos
			var page = document.createElement("div");
			page.innerHTML = i;
			page.setAttribute("class", "page");
			page.setAttribute("onclick", "selectPage(" + indice + ")");
			document.getElementsByClassName("pagination")[0].appendChild(page);
			indice++;
		};

		// Cargar items
		cargaItems(selectedPage - 1);

	} else if (paginas > 12) {

		hacerTruncation();
		cargaItems(selectedPage - 1);

	};

	var att = document.getElementsByClassName("marketplace-abstract marketplace-search-item")[0].getAttribute("style");

	if (att != null) {
		if (att == "display: none;") {
			var e = document.createElement("span");
			e.setAttribute("id", "empty");
			e.innerHTML = "No hay ningún objeto disponible en esta categoría.";
			document.getElementById("marketplace-search-items").appendChild(e);
		};
	};

	var pregunta;
	var divPages = document.getElementsByClassName("page").length;
	if (divPages != 0) {
		for (i = 0; i <= divPages; i++) {
			if (i == divPages) {
				document.getElementsByClassName("page")[i - 1].setAttribute("class", "page selected");
				break;

			} else {

				pregunta = document.getElementsByClassName("page")[i].innerHTML;

				if ((Number(pregunta) - 1) == Number(selectedPage)) {

					if (i == 0) {

						document.getElementsByClassName("page")[i].setAttribute("class", "page selected");
						break;

					} else {

						document.getElementsByClassName("page")[i - 1].setAttribute("class", "page selected");
						break;

					};
				};
			};
		};
	};
};

function searchBack() {
	selectedPage = mainPage;
	submenu = false;
	itemsxpag = 7;
	unselectAll();
	document.getElementById("filter-orderOptions").style.display = "inline-block";
	updateFilters();

}
	
function limpiaElementos() {
	var itemsVisibles = document.getElementsByClassName("marketplace-abstract marketplace-search-item");
	for (i = 0; i < 7; i++) {
		itemsVisibles[i].innerHTML = "";
		itemsVisibles[i].removeAttribute("style");
		//itemsVisibles[i].style.display = "none";

		if (itemsVisibles[i].style.display == "none") {
				itemsVisibles[i].removeAttribute("style");
			};
	};

	if (itemsxpag == 6) {
		itemsVisibles[6].style.display = "none";
	}
};

function selectPage(n) {

	unselectAll();

	selectedPage = document.getElementsByClassName("page")[n].innerHTML;
	if (submenu == false) {
		mainPageI = n;
		updateFilters();
		
	} else {
		crearPagination();
	}
	
};

function hacerTruncation() {
	// Verificar truncation

	if (selectedPage < 8) {
		// Inicio  ->  x 2 3 4 5 6 7 8 9 ... last-1 last
		var indice = 0;
		for (i = 1; i <= paginas; i++) {
			if (i < 10 || i > (paginas - 2)) {
				var page = document.createElement("div");
				page.innerHTML = i;
				page.setAttribute("class", "page");
				page.setAttribute("onclick", "selectPage(" + indice + ")");
				document.getElementsByClassName("pagination")[0].appendChild(page);

				indice++;
			} else if (i == 10) {
				var truncation = document.createElement("span");
				truncation.innerHTML = "...";
				truncation.setAttribute("class", "truncation");
				document.getElementsByClassName("pagination")[0].appendChild(truncation);
				i = (paginas - 2);
			};
		};

	} else if (selectedPage > (paginas - 7)) {
		// Final  ->  1 2 ... last-8 last-7 last-6 last-5 last-4 last-3 last-2 last-1 last
		var indice = 0;
		for (i = 1; i <= paginas; i++) {
			if ((i <= 2) || (i > (paginas - 10))) {
				var page = document.createElement("div");
				page.innerHTML = i;
				page.setAttribute("class", "page");
				page.setAttribute("onclick", "selectPage(" + indice + ")");
				document.getElementsByClassName("pagination")[0].appendChild(page);

				indice++;

			} else {
				var truncation = document.createElement("span");
				truncation.innerHTML = "...";
				truncation.setAttribute("class", "truncation");
				document.getElementsByClassName("pagination")[0].appendChild(truncation);
				i = (paginas - 9);
			};
		};

	} else {
		// Medio  ->  1 2 ... x1 x2 3 x4 x5 .. last-1 last-2
		var indice = 0;
		for (i = 1; i <= paginas; i++) {
			if (i <= 2 || i >= (paginas- 2) || (i-3 <= selectedPage && i+3 >= selectedPage)) {
				var page = document.createElement("div");
				page.innerHTML = i;
				page.setAttribute("class", "page");
				page.setAttribute("onclick", "selectPage(" + indice + ")");
				document.getElementsByClassName("pagination")[0].appendChild(page);

				indice++;

			} else if (i == 3 || i < paginas -2) {

				var truncation = document.createElement("span");
				truncation.innerHTML = "...";
				truncation.setAttribute("class", "truncation");
				document.getElementsByClassName("pagination")[0].appendChild(truncation);

				i == 3 ? (i = selectedPage - 4):(i = paginas - 2);

			};
		};

	};

};

function cargaItems(pagsel) {

	unselectAll();
	if (pagsel + 1 == paginas) {

		primerItem = pagsel * itemsxpag;
		ultimoItem = filterGroup.length;
		itemLooper = 0;
		for (item = primerItem; item < ultimoItem; item++) {
			
			getInfo();
			getItems();
			itemLooper++;

		};

		for (item = itemLooper; item < 7; item++) {
			document.getElementsByClassName("marketplace-abstract marketplace-search-item")[item].innerHTML = "";
			document.getElementsByClassName("marketplace-abstract marketplace-search-item")[item].style.display = "none";
		};
	} else if (paginas == 0) {
		primerItem = 0;
		ultimoItem = resto;
		itemLooper = 0;
		for (item = primerItem; item < ultimoItem; item++) {
			getInfo();
			getItems();
			itemLooper++;
		};

		for (item = itemLooper; item < 7; item++) {
			document.getElementsByClassName("marketplace-abstract marketplace-search-item")[item].innerHTML = "";
			document.getElementsByClassName("marketplace-abstract marketplace-search-item")[item].style.display = "none";
		};

	} else {
		primerItem = pagsel * itemsxpag;
		ultimoItem = primerItem + itemsxpag;
		itemLooper = 0;
		for (item = primerItem; item < ultimoItem; item++) {
			if (document.getElementsByClassName("marketplace-abstract marketplace-search-item")[itemLooper].style.display == "none") {
				document.getElementsByClassName("marketplace-abstract marketplace-search-item")[itemLooper].removeAttribute("style");
			};
			getInfo();
			getItems();
			itemLooper++;

		};

	};

};

function getItems() {
	// Imagen
	var itemIMGc = document.createElement("div");
	itemIMGc.setAttribute("class", "img-container");
	document.getElementsByClassName("marketplace-abstract marketplace-search-item")[itemLooper].appendChild(itemIMGc);

	var itemIMG = document.createElement("img");
	itemIMG.setAttribute("class", "abstract-icon");
	itemIMG.setAttribute("src", imgurl);
	document.getElementsByClassName("img-container")[itemLooper].appendChild(itemIMG);

	// Rareza
	var itemRarity = document.createElement("div");

	if (getNota.includes("Premio del mes")) {
		itemRarity.setAttribute("class", "anim-marker");
	} else {
		switch (getRareza) {
			case "Común":
				itemRarity.setAttribute("class", "rarity-marker-common");
				break;
			case "Raro":
				itemRarity.setAttribute("class", "rarity-marker-rare");
				break;
			case "Épico":
				itemRarity.setAttribute("class", "rarity-marker-epic");
				break;
			case "Legendario":
				itemRarity.setAttribute("class", "rarity-marker-legendary");
				break;
			case "Evento":
				itemRarity.setAttribute("class", "rarity-marker-event");
				break;
		};
	};

	document.getElementsByClassName("img-container")[itemLooper].appendChild(itemRarity);

	// Guardia
	if (getEspecial != undefined) {

		var itemEspecial = document.createElement("div");
		switch (getEspecial) {
			case "Brillante":
				itemEspecial.setAttribute("class", "tooltip guard-gem guard-1");
				break;
			case "Obsidiana":
				itemEspecial.setAttribute("class", "tooltip guard-gem guard-2");
				break;
			case "Absenta":
				itemEspecial.setAttribute("class", "tooltip guard-gem guard-3");
				break;
			case "Sombra":
				itemEspecial.setAttribute("class", "tooltip guard-gem guard-4");
				break;
			default:
			break;
		};
		document.getElementsByClassName("img-container")[itemLooper].appendChild(itemEspecial);
	};

	// Contenedor
	var itemContainer = document.createElement("div");
	itemContainer.setAttribute("class", "abstract-container");
	document.getElementsByClassName("marketplace-abstract marketplace-search-item")[itemLooper].appendChild(itemContainer);

	// Nombre
	var itemName = document.createElement("div");
	itemName.setAttribute("class", "abstract-name");
	document.getElementsByClassName("abstract-container")[itemLooper].appendChild(itemName);
	document.getElementsByClassName("abstract-name")[itemLooper].innerHTML = getNombre;

	var itemContent = document.createElement("div");
	itemContent.setAttribute("class", "abstract-content");
	document.getElementsByClassName("abstract-container")[itemLooper].appendChild(itemContent);

	// Categoría
	var itemCategory = document.createElement("div");
	itemCategory.setAttribute("class", "abstract-type");
	document.getElementsByClassName("abstract-content")[itemLooper].appendChild(itemCategory);
	document.getElementsByClassName("abstract-type")[itemLooper].innerHTML = getCategoria;

	var itemCodeCont = document.createElement("div");
	itemCodeCont.setAttribute("class", "abstract-code");
	document.getElementsByClassName("abstract-content")[itemLooper].appendChild(itemCodeCont);

	getCodigo = filterGroup[item].itemId;
	var itemEX = document.getElementsByClassName("marketplace-abstract marketplace-search-item")[itemLooper];
	itemEX.setAttribute("data-groupid", getGrupo);

	if (typeof(getCodigo) === "string") {

		itemEX.setAttribute("data-itemid", undefined);

		// No mostrar código
		var itemCode = document.createElement("div");
		itemCode.setAttribute("class", "code-info");
		document.getElementsByClassName("abstract-code")[itemLooper].appendChild(itemCode);

	} else {
		
		itemEX.setAttribute("data-itemid", getCodigo);

		// Codigo
		var itemCode = document.createElement("div");
		itemCode.setAttribute("class", "code-info");
		document.getElementsByClassName("abstract-code")[itemLooper].appendChild(itemCode);
		document.getElementsByClassName("code-info")[itemLooper].innerHTML = 'COD. <span class="universalCode">' + getCodigo + '</span>';
		
	};

	// Nota
	var itemNote = document.createElement("div");
	itemNote.setAttribute("class", "abstract-note");
	document.getElementsByClassName("abstract-container")[itemLooper].appendChild(itemNote);
	document.getElementsByClassName("abstract-note")[itemLooper].innerHTML = getNota;

};

function getInfo() {

	getGrupo = filterGroup[item].groupId;
	
	try {
		filtro = groupInfo.filter(function(v){return v.groupId == getGrupo});

		(filterGroup[item].name == undefined)?(getNombre = filtro[0].name):(getNombre = filterGroup[item].name);
		getCategoria = filtro[0].category;
		(filterGroup[item].rarity == undefined)?(getRareza = filtro[0].rarity):(getRareza = filterGroup[item].rarity);
		(filterGroup[item].note == undefined)?(getNota = filtro[0].note):(getNota = filterGroup[item].note);
		(filterGroup[item].especial == undefined)?(getEspecial = filtro[0].especial):(getEspecial = filterGroup[item].especial);
		

		switch (getCategoria) {
			case "Pieles":
				imgurl = URL_SRC + URL_SKIN + URL_ICON + filterGroup[item].itemURL;
				break;
			case "Bocas":
				imgurl = URL_SRC + URL_MOUTH + URL_ICON + filterGroup[item].itemURL;
				break;
			case "Ojos":
				imgurl = URL_SRC + URL_EYES + URL_ICON + filterGroup[item].itemURL;
				break;
			case "Cabello":
				imgurl = URL_SRC + URL_HAIR + URL_ICON + filterGroup[item].itemURL;
				break;
			default:
				imgurl = URL_SRC + URL_CLOTHES + URL_ICON + filterGroup[item].itemURL;
		
		};

	} catch {

		alert("Se ha producido un error, la página se actualizará.");
		location.reload();

	};

};

$(function() { 

	// Filtros
		$("#filter-codeOptions").change(function() {
			selectedPage = 1;
			itemsxpag = 7;
			submenu = false;
			document.getElementById("filter-orderOptions").style.display = "inline-block";
			updateFilters();
		});
		$("#filter-bodyLocationOptions").change(function() {
			selectedPage = 1;
			itemsxpag = 7;
			submenu = false;
			document.getElementById("filter-orderOptions").style.display = "inline-block";
			updateFilters();
		});
		$("#filter-guardOptions").change(function() {
			selectedPage = 1;
			itemsxpag = 7;
			submenu = false;
			document.getElementById("filter-orderOptions").style.display = "inline-block";
			updateFilters();
		});
		$("#filter-rarityOptions").change(function() {
			selectedPage = 1;
			itemsxpag = 7;
			submenu = false;
			document.getElementById("filter-orderOptions").style.display = "inline-block";
			updateFilters();
		});
		$("#filter-orderOptions").change(function() {
			selectedPage = 1;
			document.getElementById("filter-orderOptions").style.display = "inline-block";
			updateFilters();
		});
		$("#filter-itemName").change(function() {
			selectedPage = 1;
			itemsxpag = 7;
			submenu = false;
			document.getElementById("filter-orderOptions").style.display = "inline-block";
			updateFilters();
		});

	// Otros

		$(".marketplace-abstract.marketplace-search-item").each(function(){$(this).click(function() {
			$("canvas").attr("#" + selectedCode)?($("canvas").remove("#" + selectedCode)):"";

			if (selectedCode != $(this).attr("data-itemid")) {

				unselectAll();
				selectedCode = $(this).attr("data-itemid");
				selectedGroup = $(this).attr("data-groupid");

				$(this).addClass("selected");

				if ($("#filter-codeOptions").val() != "submenu" || filterGroup[0].itemId == Number($("#filter-itemName").val()) || $("#filter-guardOptions").val() == "Arcoíris") {

					limpiarCanvas();
					searchtoSelect(selectedCode);

				} else {

					getGroupId = groupList.filter(function(v){return v.itemId == selectedCode});
					filterGroup = groupList.filter(function(v){return v.groupId == getGroupId[0].groupId});

					if (filterGroup.length > 1) {
						// Abre el submenu
						if (submenu == false) {

							mainPage = selectedPage;
							selectedPage = 1;
							itemsxpag = 6;

							document.getElementById("filter-orderOptions").style.display = "none";
							
							crearPagination();
							submenu = true;

							var div = document.createElement("div");
							div.setAttribute("id","marketplace-search-title");
							div.innerHTML = "Mostrando todas las variaciones de colores de " + getGroupId[0].groupId;
							// Mover hacia arriba
							var padre = document.getElementById("marketplace-search-items");
							var cont = document.getElementsByClassName("marketplace-search-item");
							padre.insertBefore(div, cont[0]);

							var div = document.createElement ("div");
							div.setAttribute("class","marketplace-abstract marketplace-search-back");
							div.setAttribute("onclick","searchBack()");
							div.innerHTML = "🡸 Regresar";
							// Mover hacia arriba
							var padre = document.getElementById("marketplace-search-items");
							var cont = document.getElementsByClassName("marketplace-search-item");
							padre.insertBefore(div, cont[0]);

							$("#footer-links").html("Mostrando " + filterGroup.length + " artículos de los " + groupList.length + " artículos disponibles.");

						} else {
							itemsxpag = 6;
							limpiarCanvas();
							searchtoSelect(selectedCode);
						};

					} else {
						limpiarCanvas();
						searchtoSelect(selectedCode);

					};

				};

			} else {
				unselectAll();
				$(this).removeClass("selected");
			};

	})});

});



function updateFilters() {
	$("span").remove("#empty");
	unselectAll();

	fGrupos = $("#filter-codeOptions").val();				// item / grupo
	fCategorias = $("#filter-bodyLocationOptions").val();	// categorias
	fEspecial = $("#filter-guardOptions").val();			// Guardias / Premio del mes
	fRareza = $("#filter-rarityOptions").val();				// rareza
	fOrden = $("#filter-orderOptions").val();				// newest / oldest
	fName = $("#filter-itemName").val();

	// ----------------------------------------------

	var filterA = [];
	var filterB = [];
	filterGroup.length = 0;

	// Grupo --------------------------------------------

	if (fEspecial == "Arcoíris") {
		fGrupos = "all";
	}

	if (fName != "" && !(isNaN(fName)) ) {
		fGrupos = "all";	
	}

	try {

		if (fGrupos == "first" || fGrupos == "submenu") {

			for (i = 0; i < groupInfo.length; i++) {
				for (b = 0; b < groupList.length; b++) {
					if (groupInfo[i].groupId == groupList[b].groupId) {
						filterA.push(groupList[b]);
					break;
					};
				};
			};			

		} else if (fGrupos == "all") {

			for (i = 0; i < groupList.length; i++) {
				filterA.push(groupList[i]);

				var s = filterA[i].itemId;
				if (typeof(s) === "string") {

					if ( s.charAt(s.length - 1) == "s") {
						s = s.slice(0,-1);
						filterA[filterA.length - 1].itemId = s;
					};

				};
				
			};

		};

	} catch {

		alert("Se ha producido un error, la página se actualizará.");
		location.reload();

	};

	// Categorías ---------------------------------------
	
	if (fCategorias != "") {

		filtro = groupInfo.filter(function(v){return v.category == fCategorias});

		for (i = 0; i < filterA.length; i++) {
			var currentGroup = filtro.filter(function(v){return v.groupId == filterA[i].groupId});

			if (currentGroup.length != 0) {
				if (filterA[i].groupId == currentGroup[0].groupId) {
					filterB.push(filterA[i]);
				};

			};

		};

	} else {
		for (i = 0; i < filterA.length; i++) {
			filterB.push(filterA[i]);
		};
	};
	
	filterA.length = 0;

	// Especial -----------------------------------------

	if (fEspecial != "") {
		
		filterA = filterB.filter(function(v){return v.especial == fEspecial});

	} else {
		for (i = 0; i < filterB.length; i++) {
			filterA.push(filterB[i]);
		};
	};

	filterB.length = 0;

	// Rareza -------------------------------------------

	if (fRareza != "") {
		fRareza=="common"?fRareza="Común":"";
		fRareza=="rare"?fRareza="Raro":"";
		fRareza=="epic"?fRareza="Épico":"";
		fRareza=="legendary"?fRareza="Legendario":"";
		fRareza=="event"?fRareza="Evento":"";

		filtro = groupInfo.filter(function(v){return v.rarity == fRareza});

		for (i = 0; i < filterA.length; i++) {
			var currentGroup = filtro.filter(function(v){return v.groupId == filterA[i].groupId});

			if (currentGroup.length != 0) {
				if (filterA[i].groupId == currentGroup[0].groupId) {
					filterB.push(filterA[i]);
				};

			};

		};

	} else {
		for (i = 0; i < filterA.length; i++) {
			filterB.push(filterA[i]);
		};
	};

	filterA.length = 0;

	// txt ----------------------------------------------

	if (fName != "") {
		if (isNaN(fName) ) {
			// Buscar por Nombre

			var nombre = normalize(fName).toLowerCase();


			if (!fName.includes(":")) {
				// Busqueda normal
				filtro = groupInfo.filter(function(v){return (normalize(v.name).toLowerCase()).includes(nombre)});

				for (i = 0; i < filterB.length; i++) {
					var currentGroup = filtro.filter(function(v){return v.groupId == filterB[i].groupId});

					if (currentGroup.length != 0) {
						if (filterB[i].groupId == currentGroup[0].groupId) {
							filterA.push(filterB[i]);
						};

					};

				};
			
			} else {

				// Reiniciar todos los filtros

				fCategorias = $("#filter-bodyLocationOptions").val("");	// categorias
				fEspecial = $("#filter-guardOptions").val("");			// Guardias / Premio del mes

				var espFilter = fName.split(":");

				var pri = espFilter[0], seg = espFilter[1];

					switch (pri) {
						case "SV":case "sv": pri = "San Valentín "; break;
						case "A":case "a": pri = "1 de Abril "; break;
						case "P":case "p": pri = "Pascua "; break;
						case "M":case "m": pri = "Música "; break;
						case "JE":case "je": pri = "Japan Expo "; break;
						case "PM":case "pm": pri = "Pride Month "; break;
						case "V":case "v": pri = "Verano "; break;
						case "BF":case "bf": pri = "Black Friday "; break;
						case "H":case "h": pri = "Halloween "; break;
						case "N":case "n": pri = "Navidad "; break;
						default: pri = "vacio";
					};

					pri = pri + seg;

				filtro = groupInfo.filter(function(v){return v.note.includes(pri)});

				for (i = 0; i < filterB.length; i++) {
					var currentGroup = filtro.filter(function(v){return v.groupId == filterB[i].groupId});

					if (currentGroup.length != 0) {
						if (filterB[i].groupId == currentGroup[0].groupId) {
							filterA.push(filterB[i]);
						};

					};

				};

			}

		// -----------------------------------------------------------

		} else {
			// Reiniciar todos los filtros

			//fGrupos = $("#filter-codeOptions").val("all");		// item / grupo
			fCategorias = $("#filter-bodyLocationOptions").val("");	// categorias
			fEspecial = $("#filter-guardOptions").val("");			// Guardias / Premio del mes
			fRareza = $("#filter-rarityOptions").val("");			// rareza

			// Buscar por código

			for (grupo = 0; grupo < groupInfo.length; grupo++) {
				getGrupo = groupInfo[grupo].groupId;

				for (i = 0; i < filterB.length; i++) {
					if (filterB[i].itemId == fName) {
						filterA.push(filterB[i]);
						grupo = groupInfo.length;
						break;
					};
				};

			};

		// -----------------------------------------------------------

		};
		
	} else {

		for (i = 0; i < filterB.length; i++) {
			filterA.push(filterB[i]);
		};

	};

	filterB.length = 0;

	// Orden --------------------------------------------

	if (fOrden == "newest") {
		filterA.reverse();

	} else {

	};

	// Pasar todo a filterGroup ---------------------------

	for (i = 0; i < filterA.length; i++) {
		filterGroup.push(filterA[i]);
	};

	$("#footer-links").html("Mostrando " + filterGroup.length + " artículos de los " + groupList.length + " artículos disponibles.");

	if (submenu == true) {
		selectedPage = 1;
	}
	
	crearPagination();
};

// Normalize ----------------------------------------------

var normalize = (function() {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};
 
  for(var i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );
 
  return function( str ) {
      var ret = [];
      for( var i = 0, j = str.length; i < j; i++ ) {
          var c = str.charAt( i );
          if( mapping.hasOwnProperty( str.charAt( i ) ) )
              ret.push( mapping[ c ] );
          else
              ret.push( c );
      }      
      return ret.join( '' );
  }
 
})();

// ----------------------------------------------------

window.addEventListener('popstate', (event) => {
  getCustom();
});