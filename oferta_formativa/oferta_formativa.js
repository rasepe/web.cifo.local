//----------------crear variable tipo XMLHttpRequest para todo tipo de navegadores------------------

var xhr;//creo una variable de tipo XMLHttpRequest que será el objeto con el que realizamos la llamada Ajax
if(window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
	}else if(window.ActiveXObject) {
		peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
	}

//-----------------------Llamada AJAX para rellenar la Família Profesional--------------------------

xhr.onreadystatechange = function(){//Preparamos la función para cuando tengamos la respuesta
	if(xhr.readyState==4 && xhr.status==200){
		var objAreas = JSON.parse(xhr.responseText);
		//console.log(objAreas); imprimo el objeto Json ya convertido a Objeto JS
		var arrAreas = objAreas.records;
		//console.log(arrAreas); imprimo el array de áreas
		for(var i=0; i<arrAreas.length; i++){
			var cadena = '<option value="' + arrAreas[i].id + '">' + arrAreas[i].nombre + '</option>';
			document.getElementById("familiaProfesional").innerHTML+=cadena;
		} //he creado "on the fly" los <options> del <select>
	}
}	
xhr.open('GET','http://app.cifo.local/api/public/formacion/areas/', true);//lanzo la llamada con las instrucciones de la API
xhr.send();		

//-------------Llamada AJAX para rellenar los cursos según el id dela Família Profesional--------------

//creo función para cuando el usuario haya seleccionado un área con el evento onchange
document.getElementById("familiaProfesional").onchange = function(){
	document.getElementById("cursos").innerHTML = '<option value="">--Elija una opción--</option>';
	
	xhr.onreadystatechange = function(){
 		if(xhr.readyState==4 && xhr.status==200){
 			var objCursos = JSON.parse(xhr.responseText);	
			//console.log(objCursos);
			var arrCursos = objCursos.records;
			//console.log(arrCursos);
			for(var i=0; i<arrCursos.length; i++){
				var cadena = '<option value="' + arrCursos[i].id + '">' + arrCursos[i].nombre + '</option>';
				document.getElementById("cursos").innerHTML+=cadena;
				
			}
 		}
 	}	
	xhr.open('GET','http://app.cifo.local/api/public/formacion/cursos/area/' + this.value +'/', true);
 	xhr.send();		
}

//----------------------------------------Llamada AJAX para rellenar los centros--------------------------

var xhr1; //creo una segunda variable para llamar a los centros en cuanto se abra la página
if(window.XMLHttpRequest) {
	xhr1 = new XMLHttpRequest();
	}else if(window.ActiveXObject) {
		peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
	}

xhr1.onreadystatechange = function(){
	if(xhr1.readyState==4 && xhr1.status==200){
		var objCentros = JSON.parse(xhr1.responseText);
		//console.log(objCentros);
		var arrCentros = objCentros.records;
		//console.log(arrCentros);
		for(var i=0; i<arrCentros.length; i++){
			var cadena = '<option value="' + arrCentros[i].id + '">' + arrCentros[i].nombre + '</option>';
			document.getElementById("centrosFormacion").innerHTML+=cadena;
		}
	}
}	
xhr1.open('GET','http://app.cifo.local/api/public/formacion/centros/', true);
xhr1.send();		

//------------------------------------------Datatable --------------------------------------

var tabla;
tabla=$('#tablaOfertas').DataTable({//defino algunas propiedades de datatable
	language : {
		url : '/spanish.datatable.json'//llamo el .json qu traduce el datatable al castellano
	},
	"columnDefs":[
		{"data": "codigoferta", "targets": 0 },
		{"data": "curso", "targets": 1 },
		{"data": "area", "targets": 2 },
		{"data": "centro", "targets": 3 },
		{"data": "datainicio", "targets": 4 },
		{"data": "datafin", "targets": 5 },
		
	],
	responsive: true,
	fixedHeader: true,
	 "lengthMenu": [[5,10, 25, 50, -1], [5,10, 25, 50, "All"]]
});

//---------------Llamada AJAX para rellenar datatable de ofertas--------------------------

var xhr2;//creo una tercera variable para hacer otra llamada a ofertas y rellenar el datatable al cargar la página
if(window.XMLHttpRequest) {
	xhr2 = new XMLHttpRequest();
	}else if(window.ActiveXObject) {
		peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
	}

xhr2.onreadystatechange = function(){
	if(xhr2.readyState==4 && xhr2.status==200){
		var objOfertas = JSON.parse(xhr2.responseText);
		//console.log(objOfertas);
		var arrOfertas = objOfertas.records;
		//console.log(arrOfertas);
		for(var i=0; i<arrOfertas.length; i++){
			tabla.row.add({
				"codigoferta":'<a href="javascript:void(0)" onclick="editOferta(' + arrOfertas[i].id + ')">'+arrOfertas[i].codigoferta+'</a>',
				"curso": arrOfertas[i].curso,
				"area": arrOfertas[i].area,
				"centro": arrOfertas[i].centro,
				"datainicio": arrOfertas[i].datainicio,
				"datafin": arrOfertas[i].datafin
			})
		}
		tabla.draw();
	}
}//en esta llamada a ofertas cargaré todas las ofertas sin filtrar
xhr2.open('GET','http://app.cifo.local/api/public/formacion/ofertas/', true);
xhr2.send();		

//---------------Llamada AJAX para rellenar datatable de ofertas por filtro . funcion onclick de filtrar--------------------------

document.getElementById("btnFiltrar").onclick = function(){
	tabla.clear().draw();//una vez le doy al botón onclick lo primero que haré será borrar las ofertas para que salgan sólo las filtradas
	var areaId = document.getElementById("familiaProfesional").value;
	var cursoId = document.getElementById("cursos").value;
	var centroId = document.getElementById("centrosFormacion").value;
	
	xhr.onreadystatechange = function(){
 		if(xhr.readyState==4 && xhr.status==200){
 			var objOfertas = JSON.parse(xhr.responseText);	
			var arrOfertas = objOfertas.records;
			for(var i=0; i<arrOfertas.length; i++){
				tabla.row.add({
					"codigoferta":'<a href="javascript:void(0)" onclick="editOferta(' + arrOfertas[i].id + ')">'+arrOfertas[i].codigoferta+'</a>',
					"curso": arrOfertas[i].curso,
					"area": arrOfertas[i].area,
					"centro": arrOfertas[i].centro,
					"datainicio": arrOfertas[i].datainicio,
					"datafin": arrOfertas[i].datafin
				})
			}
			tabla.draw();	
		}
 	}//creo condicionales para que la tabla se rellene según los filtros escogidos por el usuario
	if(areaId =="" && cursoId ==""){
		xhr.open('GET','http://app.cifo.local/api/public/formacion/ofertas/', true);
	}
	if(!areaId =="" && cursoId ==""){
		xhr.open('GET','http://app.cifo.local/api/public/formacion/ofertas/area/'+areaId+'/', true);
	}
	if(!areaId =="" && !cursoId ==""){
		xhr.open('GET','http://app.cifo.local/api/public/formacion/ofertas/area/'+areaId+'/curso/'+cursoId+'/', true);
	}
	if(areaId =="" && !centroId ==""){
		xhr.open('GET','http://app.cifo.local/api/public/formacion/ofertas/centro/'+centroId+'/', true);
	}
	if(!areaId =="" && !centroId ==""){
		xhr.open('GET','http://app.cifo.local/api/public/formacion/ofertas/area/'+areaId+'/centro/'+centroId+'/', true);
	}
	if(!areaId =="" && !centroId =="" && !cursoId ==""){
		xhr.open('GET','http://app.cifo.local/api/public/formacion/ofertas/area/'+areaId+'/curso/'+cursoId+'/centro/'+centroId+'/', true);
	}
	xhr.send();	
}	
	
 //------------------------funcion onclick del botón borrar-------------------------------

document.getElementById("btnBorrar").onclick = function(){//con esta función limpiaré los campos de selección
	document.getElementById("familiaProfesional").value = "";
	document.getElementById("cursos").value = "";
	document.getElementById("centrosFormacion").value = "";

}
 
 //------------------------------Creación Modal----------------------------------

function editOferta(id){
	//console.log(id);compruebo que recibo el id de la ogferta correctamente
 	//------------------------------LLamada Ajax para centros modal----------------------------------
 	xhr.onreadystatechange = function(){
 		if(xhr.readyState==4 && xhr.status==200){
 			var objOfertaCentros = JSON.parse(xhr.responseText);	
			//console.log(objCentrosModal);
			var OfertaCentros = objOfertaCentros.record;
			//console.log(OfertaCentros);
			var values =Object.values(OfertaCentros);
			console.log(values);
			document.getElementById("modCodOferta").innerHTML = values[1];
			document.getElementById("modCurso").innerHTML = values[10].nombre;
			document.getElementById("modFInicio").innerHTML = values[2];
			document.getElementById("modFFin").innerHTML = values[3];
			document.getElementById("modPlazas").innerHTML = values[5];
			document.getElementById("modProfesor").innerHTML = values[13].nombre +" "+ values[13].apellidos;
			document.getElementById("modDuracion").innerHTML = values[10].duracion;
			document.querySelector("#collapseOne div").innerHTML = values[10].objetivos;
			document.querySelector("#collapseTwo div").innerHTML = values[10].programa;
			document.getElementById("center").innerHTML = values[12].nombre;
			document.getElementById("tf").innerHTML = values[12].telefono;
			document.getElementById("mail").innerHTML = values[12].buzon;
			document.getElementById("calendar").innerHTML = values[12].horario;
			document.getElementById("address").innerHTML = values[12].direccion;
			document.getElementById("acceso").innerHTML = values[12].acceso;
			document.getElementById("acceso").innerHTML = values[12].acceso;
			var imgCentro='<img src="' + values[12].media+'" class="w-100" style="object-fit:cover">' ;
			document.getElementById("img").innerHTML=imgCentro;
 		}
 	}	
 	//con esta llamada ajax relleno los campos del modal
	xhr.open('GET','http://app.cifo.local/api/public/formacion/ofertas/' + id +'/', true);
 	xhr.send();		

 	$('#modalCentro').modal('show')
}
