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

			var coordenada = {
					lat: parseFloat(arrCentros.records[i].lat),
					lng: parseFloat(arrCentros.records[i].lng),
			};




			var marker = new google.maps.Marker({
				position: coordenada,
				map: map,
				title: arrCentros.records[i].nombre,
				label: String.fromCharCode(65 + i)
			});



			var infowindow = new google.maps.InfoWindow({

				content: '<div >'
				+'<div >'
				//	+'<img src="'+arrCentros.records[i].media+'" class="card-img-top w-100" style="object-fit:cover; max-height:150px" alt="'+arrCentros.records[i].nombre+'">'
				+'<div >'
				+'<h5 class="card-title text-info">'+arrCentros.records[i].nombre+'</h5>'
				+'<div class="border border-light border-right-0 border-left-0 pt-3">'
				+'<p><i class="fa fa-phone fa-fw text-muted"></i> '+arrCentros.records[i].telefono+'</p>'
				+'<p><i class="fa fa-envelope fa-fw text-muted"></i>'
				+'<a href="mailto:'+arrCentros.records[i].buzon+'"> '+arrCentros.records[i].buzon+'</a></p>'
				+'<p><i class="fa fa-calendar fa-fw text-muted"></i> '+arrCentros.records[i].horario+'</p>'
				+'<p><i class="fa fa-map-marker fa-fw text-muted"></i> '+arrCentros.records[i].direccion+'</p>'
				+'</div>'
				+'<div class="pt-3">'
				+'<h5 class="text-secondary"><i class="fa fa-road fa-fw text-muted"></i> Acceso</h5>'
				+arrCentros.records[i].acceso
				+'</div>'      	
				+'</div>'
				+'<div >'
				+'<p class="d-flex justify-content-center mt-3 align-text-bottom"><a href="#" class="btn btn-primary">Más información...</a></p>'
				+'</div>'
				+'</div>'
				+'</div>'
				//position: coordenada,
			});
			console.log
			// var positioncentro1 = {lat: 41.41677869999999, lng: 2.1329792000000225};
			// (arrCentro.records.lat)
			// (arrCentro.records.lng)
			/*   google.maps.event.addListener(marker,'click',function() {
	                	if (!infowindow) { 
	                		infowindow = new google.maps.InfoWindow();
	                		}
	                		infowindow.setContent(marcadores[i][3]);
	                		infowindow.open(map, marker); });
			 */
			/**/



			google.maps.event.addListener(marker, 'click', function() {	
				infowindow.open(map, this);

			});
		}
	}
}

xhr.open('GET', 'http://app.cifo.local/api/public/formacion/centros/'+'?nocache='+Math.random(), true);
xhr.send(null);
