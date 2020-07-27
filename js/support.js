var str, num;

$(document).ready(function(){

	$.get("https://raw.githubusercontent.com/GardieMaker/data/master/status/activities", function(estado, success, xhr) {
		document.getElementsByClassName("news-latest")[0].innerHTML = estado;
	});

	str = window.location.search;

	if (str.includes("general")) {
		document.querySelector("#menu-general > li").setAttribute("class", "on");
		cargarContent(infoGeneral);
	} else if (str.includes("wardrobe")) {
		document.querySelector("#menu-wardrobe > li").setAttribute("class", "on");
		cargarContent(infoWardrobe);
	} else if (str.includes("profile")) {
		document.querySelector("#menu-profile > li").setAttribute("class", "on");
		cargarContent(infoProfile);
	} else if (str.includes("contests")) {
		document.querySelector("#menu-contests > li").setAttribute("class", "on");
		cargarContent(infoContests);
	} else {
		history.pushState(null, "", "?general");
		document.querySelector("#menu-general > li").setAttribute("class", "on");
		cargarContent(infoGeneral);
	};

	if (str.includes("q1")) {
		num = 1;
		abrePregunta();
	} else if (str.includes("q2")) {
		num = 2;
		abrePregunta();
	} else if (str.includes("q3")) {
		num = 3;
		abrePregunta();
	} else if (str.includes("q4")) {
		num = 4;
		abrePregunta();
	} else if (str.includes("q5")) {
		num = 5;
		abrePregunta();
	} else if (str.includes("q6")) {
		num = 6;
		abrePregunta();
	} else if (str.includes("q7")) {
		num = 7;
		abrePregunta();
	};

	if (str.includes("general")) {
		str = "?general";
	} else if (str.includes("wardrobe")) {
		str = "?wardrobe";
	} else if (str.includes("profile")) {
		str = "?profile";
	} else if (str.includes("contests")) {
		str = "?contests";
	};

});

$(function() { 
	$("#menu-general").click(function(){
		str = "?general";
		document.getElementsByClassName("on")[0].removeAttribute("class");
		document.querySelector("#menu-general > li").setAttribute("class", "on");
		cargarContent(infoGeneral);
	});

	$("#menu-wardrobe").click(function(){
		str = "?wardrobe";
		document.getElementsByClassName("on")[0].removeAttribute("class");
		document.querySelector("#menu-wardrobe > li").setAttribute("class", "on");
		cargarContent(infoWardrobe);
	});

	$("#menu-profile").click(function(){
		str = "?profile";
		document.getElementsByClassName("on")[0].removeAttribute("class");
		document.querySelector("#menu-profile > li").setAttribute("class", "on");
		cargarContent(infoProfile);
	});

	$("#menu-contests").click(function(){
		str = "?contests";
		document.getElementsByClassName("on")[0].removeAttribute("class");
		document.querySelector("#menu-contests > li").setAttribute("class", "on");
		cargarContent(infoContests);
	});


	$("#support-category-content").on("click", "#q1", function(){
		num = 1;
		history.pushState(null, "", str + "=q" + num);
		abrePregunta();
	});

	$("#support-category-content").on("click", "#q2", function(){
		num = 2;
		history.pushState(null, "", str + "=q" + num);
		abrePregunta();
	});

	$("#support-category-content").on("click", "#q3", function(){
		num = 3;
		history.pushState(null, "", str + "=q" + num);
		abrePregunta();
	});

	$("#support-category-content").on("click", "#q4", function(){
		num = 4;
		history.pushState(null, "", str + "=q" + num);
		abrePregunta();
	});

	$("#support-category-content").on("click", "#q5", function(){
		num = 5;
		history.pushState(null, "", str + "=q" + num);
		abrePregunta();
	});

	$("#support-category-content").on("click", "#q6", function(){
		num = 6;
		history.pushState(null, "", str + "=q" + num);
		abrePregunta();
	});

	$("#support-category-content").on("click", "#q7", function(){
		num = 7;
		history.pushState(null, "", str + "=q" + num);
		abrePregunta();
	});

});


function abrePregunta() {
	if (document.getElementsByClassName("question")[num - 1].getAttribute("class") != "question active") {
		cierraActivo();
		document.getElementsByClassName("question")[num - 1].setAttribute("class", "question active");
		document.getElementsByClassName("answer")[num - 1].style.display = "block";
		
	} else {
		cierraActivo();
	};
}

function cargarContent(info) {
	history.pushState(null, "", str);
	$("div").remove(".question");
	var contenedor = document.getElementById("support-category-content");

	for (i = 0; i < info.length; i++) {
		var div = document.createElement("div");
		div.setAttribute("class", "question");
		contenedor.appendChild(div);

		var question = document.getElementsByClassName("question");

		div = document.createElement("div");
		div.setAttribute("id", "q" + (i + 1));
		div.innerHTML = info[i].question;
		question[i].appendChild(div);

		div = document.createElement("div");
		div.setAttribute("class", "answer");
		div.innerHTML = info[i].answer;
		question[i].appendChild(div);
	};
};

function cierraActivo() {
	var activo = document.getElementsByClassName("question active");
	if (activo.length > 0) {
		activo[0].setAttribute("class", "question");
		var answer = document.getElementsByClassName("answer");
		for (i = 0; i < answer.length; i ++) {
			if (answer[i].style.display == "block") {
				answer[i].style.display = "none";
				break;
			};
		};
	};
};

var infoGeneral = [
	{'question':'¿Qué es GardieMaker?','answer':'GardieMaker es una aplicación web que cree con la finalidad de juntar la mayor cantidad posible de prendas que están disponibles en Eldarya. Mi objetivo era crear un vestidor gigante y libre de limitaciones en el cual puedes crear y vestir a tu guardiana como siempre has querido hacerlo; teniendo acceso, además, a items exclusivos de eventos pasados y del servidor francés. Este es un proyecto ambicioso en el cual trabajo día a día con la intención de superarme y mejorar poco a poco todo esto.<br><br>Este proyecto fue realizado por mí con fines de aprendizaje, sin fines de lucro y con la mera intención de entretener. Las imagenes y los diseños utilizados son propiedad de Beemoov y en ningún momento pretendo apropiarme de los mismos.'},
	{'question':'¿Cómo puedo hacer un aporte?','answer':'Para saber más sobre los tipos de aportes y cómo hacerlo puedes <a href="https://gardiemaker.tumblr.com/tagged/como-aportar">leer esto.</a>'},
	{'question':'He aportado hace unos días y no veo las prendas en el vestidor.','answer':'Generalmente, las prendas son agregadas cuando el "grupo" está completo. Cada grupo contiene las diferentes variaciones de colores de cada prenda. Si solo aportaste una prenda, es probable que yo no cuente con todas sus variaciones de colores como para agregarla al vestidor.'},
	{'question':'¿Cómo reportar?', 'answer':'Para reportar algún error o problema que encuentres en el funcionamiento del vestidor o del perfil, es necesario que me cuentes el contexto que te llevó a ese error (si quitaste una prenda, cambiaste algún filtro, etc) y cual es el error (no cargó, cargó mal algo, etc). Para reportar un error has <a href="https://gardiemaker.tumblr.com/ask">clic aquí</a>.'},
	{'question':'¿Dudas?','answer':'Cualquier inquietud que tengas sobre cualquier cosa puedes <a href="https://gardiemaker.tumblr.com/ask">escribirme aquí</a>. Si tienes blog también puedes hacerlo por privado, de lo contrario tu respuesta será pública en el blog.'}
]

var infoWardrobe = [
	{'question':'No hay ninguna Gardienne para vestir.','answer':'¡Tú tienes que crearla! La idea de no poner un Gardienne de base es para que tú puedas crearla como a ti te guste.'},
	{'question':'No puedo elegir ninguna prenda.','answer':'El vestidor se maneja con códigos que son ubicados en el enlace. Si no puedes cargar ninguna prenda comprueba que el enlace en el que te encuentres no esté corrupto. Prueba reiniciando el vestidor con el botón en la esquina superior derecha o vuelve a abrirlo haciendo <a href="wardrobe">clic aquí</a>. Si el error persiste por favor <a href="https://gardiemaker.tumblr.com/ask">repórtalo aquí.</a>'},
	{'question':'El vestidor se recarga solo y no puedo usarlo.','answer':'El vestidor está preparado para que, si existe algún problema al cargar las prendas, éste se reinicie solo. Si la página se recarga sola más de 4 veces, es probable que sea un problema del servidor. Si ves que estoy online cuando esto pase, es probable que esté entereda del problema porque sea yo la que está metiendo mano.'},
	{'question':'Las prendas animadas no se mueven.','answer':'Y no lo harán. Solo puse las imagenes porque era demasiado tedioso agregar las animaciones.'},
	{'question':'Filtros especiales.','answer':'Además de los filtros comunes del juego, el vestidor cuenta con algunos filtros especiales. Estos se escriben en el buscador. Actualmente los filtros disponibles son:<ul><li><u>Códigos:</u> Las prendas pueden buscarse por su código exacto.</li><li><u>Eventos:</u> Puedes filtrar las prendas por eventos específicos. Para usar este filtro basta con poner las siglas del evento y el año del mismo unidos por dos puntos (:). Por ejemplo "SV:2018" o "sv:2018" muestra todas las prendas del evento de San Valentín 2018. A su vez, puedes usar solo "SV:" o "sv:" para buscar las prendas de todos los eventos de San Valentín. Las siglas disponibles actualmente son las siguientes:<ul><li>A = 1 de Abril</li><li>P = Pascua</li><li>M = Música</li><li>PM = Pride Month</li><li>V = Verano</li><li>BF = Black Friday</li><li>H = Halloween</li><li>N = Navidad</li></ul></li></ul><u>NOTA:</u> Hay veces que el filtro de eventos no funciona bien a la primera, así que asegúrate de darle al enter dos veces.'},
	{'question':'¿Cómo guardo a la Gardienne que cree?','answer':'Puedes guardar una imagen de tu Gardienne en el perfil. Para acceder a él cuando acabes con tu guardiana, tienes que darle al botón de "Generar Perfil".'}
]

var infoProfile = [
	{'question':'¿Cómo puedo guardar a mi Gardienne?','answer':'Para ver y guardar un render de tu Gardienne tienes que hacer clic en "Ver portrait". Esto abrirá un pop-up que te permitirá guardar la imagen. Ten en cuenta que esto no funciona en dispositivos móviles y solo podrás guardarla desde un ordenador.'},
	{'question':'¿Para qué sirve el código?','answer':'Si te gustó tu gardi y la quieres compartir (o solo guardarla), puedes guardar este código para volver a generarla más tarde. Este código lo pegas debajo del perfil, dónde dice "Cargar guardiana".'}
]

var infoContests = [
	{'question':'Información general.','answer':'Los actividades realizadas en este blog son única y exclusivamente realizadas por mí y para ustedes. Estas se realizarán periódicamente y sin fechas específicas.'},
	{'question':'¿Cómo participar en un concurso/sorteo?','answer':'Cada actividad tendrá un post en el blog que indicará la temática o los pasos a seguir para participar. Si no sueles visitar el blog, podrás ver cuando haya actividades disponibles en el indicador de actividades que se encuentra en el vestidor.'},
	{'question':'¿Qué es el "UID"?','answer':'"UID" es el ID de usuario. Para mantener la privacidad de los participantes y la seguridad a la hora de reclamar los premios, las actividades realizadas en el blog se manejarán mediante "UID". Este UID no es un número cualquiera, sino que representa a tu cuenta de Eldarya.'},
	{'question':'¿Cómo puedo obtener mi "UID"?','answer':'El "UID" puede obtenerse fácilmente buscándolo en el código fuente de tu perfil, sin embargo, recomiendo usar <a href="/data/forms/uid">ESTE FORMULARIO</a> para solicitar tu UID. Ten en cuenta que este es un trabajo manual, por lo que puedo tardar algunas horas en responderte.'},
	{'question':'¿Cómo reclamo mi premio?','answer':'Si tu UID fue el ganador de alguna de las actividades, de momento, la única forma de reclamar el premio es enviándome una solicitud de amistad en el juego y reclamarlo por esa vía. De esta manera yo podré verificar que tu UID coincide con tu nombre de usuario. <br> Esto es simplemente para evitar que otra persona se haga pasar por tí.'},
	{'question':'Sobre los premios.','answer':'Los premios pueden ser maanas, MO o algún otro premio especial (a específicar). Estos podrían requerir o no el ingreso a tu cuenta para la compra de codes o la transferencia mediante el mercado según se especifique en cada actividad. Si no cuentas con el mercado desbloqueado o si no estás de acuerdo con esto, deberías abstenerte de participar.'},
	{'question':'Premio vacante.','answer':'Si el ganador no reclama su premio o si su reclamo es "sospechoso", el premio no pasará al segundo puesto ni se resorteará. La actividad quedará anulada.'}
]