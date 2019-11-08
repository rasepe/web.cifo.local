var xhr;
if (window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
}else {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
xhr.onreadystatechange = function() {
	// Aviso de carga 
	document.getElementById("aviso_carga").style.display = "block";
	if (xhr.readyState == 4 && xhr.status == 200) {
		var arrayCentros = JSON.parse(xhr.responseText);
		for (var i = 0; i < arrayCentros.records.length; i++) {

			// montamos la maqueta html con classes de bootstrap y vamos concatenando maquetas, una por cada posición de la array
			var maquetaHTML = 
				'<div class="col-12 col-md-6 col-lg-4 p-3  d-flex">'
				+'<div class="card h-100">'
				+'<img src="'+arrayCentros.records[i].media+'" class="card-img-top w-100" style="object-fit:cover; max-height:150px" alt="'+arrayCentros.records[i].nombre+'">'
				+'<div class="card-body pb-0">'
				+'<h5 class="card-title text-info">'+arrayCentros.records[i].nombre+'</h5>'
				+'<div class="border border-light border-right-0 border-left-0 pt-3">'
				+'<p><i class="fa fa-phone fa-fw text-muted"></i> '+arrayCentros.records[i].telefono+'</p>'
				+'<p><i class="fa fa-envelope fa-fw text-muted"></i>'
				+'<a href="mailto:'+arrayCentros.records[i].buzon+'"> '+arrayCentros.records[i].buzon+'</a></p>'
				+'<p><i class="fa fa-calendar fa-fw text-muted"></i> '+arrayCentros.records[i].horario+'</p>'
				+'<p><i class="fa fa-map-marker fa-fw text-muted"></i> '+arrayCentros.records[i].direccion+'</p>'
				+'</div>'
				+'<div class="pt-3">'
				+'<h5 class="text-secondary"><i class="fa fa-road fa-fw text-muted"></i> Acceso</h5>'
				+arrayCentros.records[i].acceso
				+'</div>'      	
				+'</div>'
				+'<div class="card-footer bg-transparent border-0">'
				+'<p class="d-flex justify-content-center mt-3 align-text-bottom"><a href="#" class="btn btn-primary">Más información...</a></p>'
				+'</div>'
				+'</div>'
				+'</div>';
			
			document.getElementById("aviso_carga").style.display = "none";
			// Indicamos en que elemento del DOM, vamos a concatenar cada variable "maquetaHTML"
			document.getElementById("centros").innerHTML += maquetaHTML;
		}					
	}
}
xhr.open('GET','http://app.cifo.local/api/public/formacion/centros/?nocache='+Math.random(), true);
xhr.send();
