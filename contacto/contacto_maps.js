// Creamos un objeto llamado map	
var map;
// Creamos la función para insertar el mapa	
function initMap(){
	// Asignamos en un div llamado "mapa" el mapa de google maps con los parametros deseados
	map = new google.maps.Map(document.getElementById('mapa'), {
		center: {lat: 41.402675, lng: 2.181181}, 
		scrollwheel: false,
		zoom: 7,
		zoomControl: true,
		rotateControl : true,
		mapTypeControl: true,
		streetViewControl: false,
		navigationControl: true,
		draggable: true,
	});       
}


var xhr;
if (window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
}else {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

xhr.onreadystatechange = function() {
	if (xhr.readyState == 4 && xhr.status == 200) {
		var arrCentros = JSON.parse(xhr.responseText);
		for (var i = 0; i < arrCentros.records.length; i++) {
			crearMarker (arrCentros.records[i],i);
		}
	}
}

xhr.open('GET', 'http://app.cifo.local/api/public/formacion/centros/'+'?nocache='+Math.random(), true);
xhr.send(null);

//Creamos la función crearMarker que contiene la información de cada marker, trabaja con array de centros

function crearMarker (obj,i) {
	
	var coordenada = {
			lat: parseFloat(obj.lat),
			lng: parseFloat(obj.lng),
	};

	var marker = new google.maps.Marker({
		position: coordenada,
		map: map,
		title: obj.nombre,
		label: String.fromCharCode(65 + i)
	});
	
	var infowindow = new google.maps.InfoWindow({

		content: '<div>'
		+'<div>'
		+'<img src="'+obj.media+'" class="card-img-top w-100" style="object-fit:cover; max-height:200px" alt="'+obj.nombre+'">'
		+'<div >'
		+'<h5 class="card-title text-info">'+obj.nombre+'</h5>'
		+'<div class="border border-light border-right-0 border-left-0 pt-3">'
		+'<p><i class="fa fa-phone fa-fw text-muted"></i> '+obj.telefono+'</p>'
		+'<p><i class="fa fa-envelope fa-fw text-muted"></i>'
		+'<a href="mailto:'+obj.buzon+'"> '+obj.buzon+'</a></p>'
		+'<p><i class="fa fa-calendar fa-fw text-muted"></i> '+obj.horario+'</p>'
		+'<p><i class="fa fa-map-marker fa-fw text-muted"></i> '+obj.direccion+'</p>'
		+'</div>'
		+'<div class="pt-3">'
		+'<h5 class="text-secondary"><i class="fa fa-road fa-fw text-muted"></i> Acceso</h5>'
		+obj.acceso
		+'</div>'      	
		+'</div>'
		+'<div >'
		+'<p class="d-flex justify-content-center mt-3 align-text-bottom"><a href="#" class="btn btn-primary">Más información...</a></p>'
		+'</div>'
		+'</div>'
		+'</div>'	
	});
	
	google.maps.event.addListener(marker, 'click', function() {	
		infowindow.open(map, this);
		setTimeout(function () { infowindow.close(); }, 5000);
			});
}
