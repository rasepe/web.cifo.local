//Creación datatable
var tabla = $('#libros').DataTable({
	"lengthMenu" : [ 5, 10, 25, 50, 75, 100 ],
	responsive : true,
	language : {
		url : '/spanish.datatable.json'
	},
	"columnDefs" : [ {
		"data" : "Isbn",
		"targets" : 0
	}, {
		"data" : "Cubierta",
		"targets" : 1
	}, {
		"data" : "Título",
		"targets" : 2
	}, {
		"data" : "Editorial",
		"targets" : 3
	}, {
		"data" : "Sección",
		"targets" : 4
	}, {
		"data" : "Tema",
		"targets" : 5
	}
	]
});

//Variable donde guardamos las XMLHttpRequest()
var xhr;

/*Al cargar la página, carga las opciones de los selectores de secciones y editoriales y la tabla con 
los libros. Las editoriales se cargan a través de una llamada a la función getEditoriales() 
desde la función getSecciones() y los libros, a su vez, se cargan a través de una llamada a la función 
getLibros() desde la función getEditoriales()  */
getSecciones();

function getSecciones() {
//	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var arrSecciones = JSON.parse(xhr.responseText);
			for (var i = 0; i < arrSecciones.records.length; i++) {
				document.getElementById("secciones").innerHTML += '<option  value="' + arrSecciones.records[i].id + '">'
				+ arrSecciones.records[i].nombre + '</option>';
			}
			//cuando ha terminado de pasar al DOM las opciones de las secciones, llama a la función getEditoriales:
			getEditoriales();
		}
	}
	xhr.open('GET','http://app.cifo.local/api/public/biblioteca/secciones/', true);
	xhr.send();
}

//Carga las opciones del selector de editoriales
function getEditoriales() {
	//var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var arrEditoriales = JSON.parse(xhr.responseText);
			for (var i = 0; i < arrEditoriales.records.length; i++) {
				document.getElementById("editoriales").innerHTML += '<option  value="' + arrEditoriales.records[i].id + '">'
				+ arrEditoriales.records[i].nombre
				+ '</option>';

			}
			//cuando ha terminado de pasar al DOM las opciones de las editoriales, llama a la función getLibros():
			getLibros();
		}
	}
	xhr
	.open('GET','http://app.cifo.local/api/public/biblioteca/editoriales/', true);
	xhr.send();
}


/* Añade al datatable una lista de libros.
		Opcionalmente se le pueden pasar hasta tres parámetros (codigoseccion, codigotema, codigoeditorial).
		Sin parámetros, la llamada AJAX devuelve todos los libros.
		Con parámetros, la llamada AJAX devuelve los libros que cumplan la propiedad especificada en cada parámetro.
		Finalmente, se imprimen en la tabla todos los libros que devuelve la llamada AJAX. */
function getLibros(codigoseccion=0, codigotema=0, codigoeditorial=0) {
	//var xhr;
	var filtroCodigoseccion 	= '' ;
	var filtroCodigotema		= '' ;
	var filtroCodigoeditorial 	= '' ;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var arrLibros = JSON.parse(xhr.responseText);
			for (var i = 0; i < arrLibros.records.length; i++) {
				tabla.row
				.add({
					"Isbn" : '<a href="javascript:void(0)" onclick="getLibro('
						+ arrLibros.records[i].id
						+ ')" data-toggle="modal" data-target=".bd-example-modal-sm">'
						+ arrLibros.records[i].isbn
						+ '</a>',
						"Cubierta" : '<img src="'+arrLibros.records[i].cubierta+'" height="100px">',
						"Título" : arrLibros.records[i].titulo,
						"Editorial" : arrLibros.records[i].editorial,
						"Sección" : arrLibros.records[i].seccion,
						"Tema" : arrLibros.records[i].tema
				});
			}
			//Dibuja la tabla:
			tabla.draw();
		}
	}
	//transforma los strings codigoseccion, codigotema y codigoeditorial
	if (codigoseccion != 0) {
		filtroCodigoseccion = 'seccion/' + codigoseccion + '/';
	} 

	if (codigotema != 0) {
		filtroCodigotema = 'tema/' + codigotema + '/'
	} 

	if (codigoeditorial != 0) {
		filtroCodigoeditorial = 'editorial/' + codigoeditorial + '/'
	} 
	//llamada AJAX
	xhr.open('GET',
			'http://app.cifo.local/api/public/biblioteca/libros/'
			+ filtroCodigoseccion + filtroCodigotema + filtroCodigoeditorial , true);
	xhr.send();
}


//Muestra las opciones del selector de temas cuando se selecciona una sección (evento onchange):
document.getElementById("secciones").onchange = function() {
	document.getElementById("temas").innerHTML = '<option value="0">-- Escoja un tema --</option>';
	var codigoSeccion = document.getElementById("secciones").value;
	//var codigoSeccion = document.getElementById("secciones").options[seccionSeleccionada].id;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var arrTemas = JSON.parse(xhr.responseText);
			for (var i = 0; i < arrTemas.records.length; i++) {
				document.getElementById("temas").innerHTML += '<option  value="' + arrTemas.records[i].id + '">'
				+ arrTemas.records[i].nombre + '</option>';
			}
		}
	}
	xhr.open('GET',
			'http://app.cifo.local/api/public/biblioteca/temas/seccion/'
			+ codigoSeccion, true);
	xhr.send();
}


/*Función filtrar(). Se ejecuta cuando apretamos el botón "Filtrar". Llama a la función getlibros con los
		parámetros que recibe de las opciones seleccionadas.*/
function filtrar() {
	//borramos la tabla
	tabla.clear().draw();
	//guardamos los valores enteros de los códigos de sección, tema y editorial seleccionados en el selector
	var codigoseccion 	= parseInt(document.getElementById("secciones").value);
	var codigotema 		= parseInt(document.getElementById("temas").value);
	var codigoeditorial = parseInt(document.getElementById("editoriales").value);
	getLibros(codigoseccion, codigotema, codigoeditorial);
}


//Resetea las opciones seleccionadas en el selector
function borrar() {
	document.getElementById("secciones").selectedIndex = 0;
	document.getElementById("temas").selectedIndex = 0;
	document.getElementById("editoriales").selectedIndex = 0;
}


/* A partir de una id que se pasa por parámetro, obtiene la información del libro que se ha seleccionado 
		 pinchando el enlace de la tabla y la imprime en una ventana modal. */
function getLibro(id) {
	xhr;
	window.sessionStorage.setItem("id_libro", id);
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.onreadystatechange = function() {
		var id_libro = window.sessionStorage.getItem("id_libro");
		if (xhr.readyState == 4 && xhr.status == 200) {
			var arrLibro = JSON.parse(xhr.responseText);
			var titolmodal = "Libro";
			document.getElementById("modalLibros").innerHTML = titolmodal;
			var cadena1 = '<table class="table-sm" id="tablaModal" style="width:95%"><tbody>'
				+ '<tr style="border-bottom: 3px solid white;"><th scope="row" style="text-align: right; width:25%; padding-right:1%">Isbn:</th><td style="padding-left:1%">'
				+ arrLibro.record.isbn
				+ '</td></tr>'
				+ '<tr style="border-bottom: 3px solid white;"><th scope="row" style="text-align: right; width:25%; padding-right:1%">Título:</th><td style="padding-left:1%">'
				+ arrLibro.record.titulo
				+ '</td></tr>'
				+ '<tr style="border-bottom: 3px solid white;"><th scope="row" style="text-align: right; width:25%; padding-right:1%">Subítulo:</th><td style="padding-left:1%">'
				+ arrLibro.record.subtitulo
				+ '</td></tr>'
				+ '<tr style="border-bottom: 3px solid white;"><th scope="row" style="text-align: right; width:25%; padding-right:1%">Número de páginas:</th><td style="padding-left:1%">'
				+ arrLibro.record.numero_paginas
				+ '</td></tr>'
				+ '<tr style="border-bottom: 3px solid white;"><th scope="row" style="text-align: right; width:25%; padding-right:1%">Editorial:</th><td style="padding-left:1%">'
				+ arrLibro.record.editorial.nombre
				+ '</td></tr>'
				+ '<tr style="border-bottom: 3px solid white;"><th scope="row" style="text-align: right; width:25%; padding-right:1%">Año de publicación:</th><td style="padding-left:1%">'
				+ arrLibro.record.anio_publicacion
				+ '</td></tr>'
				+ '<tr style="border-bottom: 3px solid white;"><th scope="row" style="text-align: right; width:25%; padding-right:1%">Tema:</th><td style="padding-left:1%">'
				+ arrLibro.record.tema.nombre
				+ '</td></tr>'
				+ '<tr style="border-bottom: 3px solid white;"><th scope="row" style="text-align: right; width:25%; padding-right:1%">Sección:</th><td style="padding-left:1%">'
				+ arrLibro.record.seccion.nombre
				+ '</td></tr>'
				+ '<tr style="border-bottom: 3px solid white;"><th scope="row" style="text-align: right; width:25%; padding-right:1%">Nivel:</th><td style="padding-left:1%">'
				+ arrLibro.record.nivel
				+ '</td></tr>'
				+ '</tbody></table>';
			var cadena2 = '<p>' + arrLibro.record.descripcion + '</p>';
			var cadena3 = '';
			for (var j = 0; j < arrLibro.record.autores.length; j++) {
				if (j > 0) {
					cadena3 += '<hr>';
				}
				;
				cadena3 += '<img src="'+arrLibro.record.autores[j].foto+'" height="100px"></img>'
				+ '<h5>'
				+ arrLibro.record.autores[j].nombre
				+ '&nbsp;'
				+ arrLibro.record.autores[j].apellidos
				+ '</h5>'
				+ '<p>'
				+ arrLibro.record.autores[j].biografia + '</p>';
			}
			var imagenModal = '<img id="imagentabla" src="'+arrLibro.record.cubierta+'" style="max-height:200px;" >'; //class="align-self-stretch border rounded" style="object-fit:cover" //class="align-self-stretch" //d-inline-block				
			document.querySelector("#myModal #parrafo1-1").innerHTML = cadena1;
			document.querySelector("#myModal #parrafo1-2").innerHTML = imagenModal;
			document.querySelector("#collapseTwo .card-body").innerHTML = cadena2;
			document.querySelector("#collapseThree .card-body").innerHTML = cadena3;
			//Creación de la ventana modal:
			$('#myModal').modal('show');
		}
	}
	var id_libro = window.sessionStorage.getItem("id_libro");
	xhr.open('GET',
			'http://app.cifo.local/api/public/biblioteca/libros/'
			+ id_libro, true);
	xhr.send();
}