/* A través de una llamada AJAX, obtiene cada uno de los centros recorriendo el array de centros 
		 y luego llama a la función imprimecentro(arrCentros.records[i]) para imprimir en pantalla el centro que está
		 en la posición actual */
var xhr;
if (window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
} else {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
xhr.onreadystatechange = function() {
	//mientras se cargan los centros, avisa de que se están cargando:
	document.getElementById("avisocarga").innerHTML = "Un momento, cargando centros...";
	//preparamos lo que haremos con la respuesta (por cada centro llama a la función imprimecentro)
	if (xhr.readyState == 4 && xhr.status == 200) {
		var arrCentros = JSON.parse(xhr.responseText);
		for (var i = 0; i < arrCentros.records.length; i++) {
			imprimecentro(arrCentros.records[i]);
		}
	}
}
//llamada ajax
xhr.open('GET',
		'http://app.cifo.local/api/public/formacion/centros/?nocache='
		+ Math.random(), true);
xhr.send();

//imprime cada centro, se le pasa como parámetro el objeto centro a imprimir.
function imprimecentro(objcentro) {
	document.getElementById("avisocarga").innerHTML = "";
	var cadena = '<div class="col-12 col-md-6 col-lg-4 p-3  d-flex">'
		+ '<div class="card h-100">'
		+ '<img src="'+objcentro.media+'" class="card-img-top w-100" style="object-fit:cover; max-height:150px" alt="'+objcentro.nombre+'">'
		+ '<div class="card-body pb-0">'
		+ '<h5 class="card-title text-info">'
		+ objcentro.nombre
		+ '</h5>'
		+ '<div class="border border-light border-right-0 border-left-0 pt-3">'
		+ '<p><i class="fa fa-phone fa-fw text-muted"></i> '
		+ objcentro.telefono
		+ '</p>'
		+ '<p><i class="fa fa-envelope fa-fw text-muted"></i>'
		+ '<a href="mailto:'+objcentro.buzon+'"> '
		+ objcentro.buzon
		+ '</a></p>'
		+ '<p><i class="fa fa-calendar fa-fw text-muted"></i> '
		+ objcentro.horario
		+ '</p>'
		+ '<p><i class="fa fa-map-marker fa-fw text-muted"></i> '
		+ objcentro.direccion
		+ '</p>'
		+ '</div>'
		+ '<div class="pt-3">'
		+ '<h5 class="text-secondary"><i class="fa fa-road fa-fw text-muted"></i> Acceso</h5>'
		+ objcentro.acceso
		+ '</div>'
		+ '</div>'
		+ '<div class="card-footer bg-transparent border-0">'
		+ '<p class="d-flex justify-content-center mt-3 align-text-bottom"><a href="#" class="btn btn-primary">Más información...</a></p>'
		+ '</div>' + '</div>' + '</div>';
	document.getElementById("centros").innerHTML += cadena;
}