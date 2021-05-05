const URL_SRC = "https://www.eldarya.com/assets/img/player/hair/icon/";
const URL_FULL = "https://www.eldarya.com/assets/img/player/hair/web_portrait/";
var trackingList, tracking = "all";
//================================================================
$(document).ready(function () {
	$.get("https://raw.githubusercontent.com/GardieMaker/data/master/status/activities", function(estado, success, xhr) {
		document.getElementsByClassName("news-latest")[0].innerHTML = estado;
	});

    $.get("https://raw.githubusercontent.com/GardieMaker/data/master/status/affiliates", function(afiliados, success, xhr) {
        document.getElementById("footer-info").innerHTML = afiliados;
    });

	const requestTracking = new XMLHttpRequest();
	requestTracking.open("GET", "/data/trackingList.json");
	requestTracking.responseType = "json";
	requestTracking.send();
	requestTracking.onload = function() {trackingList = requestTracking.response;firstLoad();}

});

function firstLoad() {

	var pageMain = document.getElementsByClassName("page-main-container")[0];
	var iconListCounter = 0;

	// Debe contar cuantos grupos contiene

	for (a = 0; a < trackingList.length; a++) {

		var nombre = trackingList[a].name;
		
		if (tracking == "all") {
			var items = trackingList[a].items;
		} else if (tracking == "true") {
			var items = trackingList[a].items.filter(function(v){return v[0] != 0});
		} else if (tracking == "false") {
			var items = trackingList[a].items.filter(function(v){return v[0] == 0});
		};
		
		var disponibles = items.filter(function(v){return v[0] != 0}); 

		// Crear info de cada grupo

		var h1 = document.createElement("h1");
		h1.setAttribute("class", "itemInfo");
		pageMain.appendChild(h1);

		var itemInfo = document.getElementsByClassName("itemInfo")[a];

		var span = document.createElement("span");
		span.setAttribute("class", "diamond");
		itemInfo.appendChild(span);

		span = document.createElement("span");
		span.setAttribute("class", "itemName");
		span.innerHTML = nombre;
		itemInfo.appendChild(span);

		span = document.createElement("span");
		span.setAttribute("class", "countItemsOuter");
		itemInfo.appendChild(span);

		span = document.createElement("span");
		span.setAttribute("class", "countItems");
		span.innerHTML = disponibles.length + "/" + items.length;
		document.getElementsByClassName("countItemsOuter")[a].appendChild(span);

		// Crear contenedor

		var ul = document.createElement("ul");
		ul.setAttribute("class", "itemList");
		pageMain.appendChild(ul);

		var itemList = document.getElementsByClassName("itemList")[a];

		for (b = 0; b < items.length; b++) {

			var li = document.createElement("li");
			li.setAttribute("class", "iconList");
			itemList.appendChild(li);

			var aa = document.createElement("a");
			aa.setAttribute("class","fancybox");
			if (items[b][0] == 0) {
				aa.setAttribute("data-fancy-title","<p>undefined</p>");
			} else {
				aa.setAttribute("data-fancy-title","<p>" + items[b][0] + "</p>");
				aa.setAttribute("title", items[b][0]);
			};
			aa.setAttribute("href",URL_FULL + items[b][2]);
			aa.setAttribute("target","_blank");
			document.getElementsByClassName("iconList")[iconListCounter].appendChild(aa);

			var img = document.createElement("img");
			(items[b][0] == 0)?(img.setAttribute("class", "itemIcon")):(img.setAttribute("class", "itemIcon true"));
			img.setAttribute("alt",items[b][0]);

			img.src = URL_SRC + items[b][2];
			document.getElementsByClassName("fancybox")[iconListCounter].appendChild(img);

			iconListCounter++;

		};

	};
};

// ------------------------------------------------------

var trackingB = document.getElementsByClassName("tracking");

$(function() { 
    $("#tracking-all").click(function() { 
    	tracking = "all";
    	$("h1").remove(".itemInfo");
    	$("ul").remove(".itemList");

    	trackingB[0].setAttribute("class","tracking current");
    	trackingB[1].setAttribute("class","tracking");
    	trackingB[2].setAttribute("class","tracking");

    	firstLoad();

    });

    $("#tracking-true").click(function() { 
    	tracking = "true";
    	$("h1").remove(".itemInfo");
    	$("ul").remove(".itemList");

    	trackingB[0].setAttribute("class","tracking");
    	trackingB[1].setAttribute("class","tracking current");
    	trackingB[2].setAttribute("class","tracking");

    	firstLoad();

    });

	$("#tracking-false").click(function() { 
    	tracking = "false";
    	$("h1").remove(".itemInfo");
    	$("ul").remove(".itemList");

    	trackingB[0].setAttribute("class","tracking");
    	trackingB[1].setAttribute("class","tracking");
    	trackingB[2].setAttribute("class","tracking current");

    	firstLoad();

    });

});