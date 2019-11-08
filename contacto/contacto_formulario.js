//------------------------ VALIDACIONES FORMULARIO -------------------------------------
	  // Llamamos al boton del elemento del DOM cuando hacemos click sobre el 	  
 	  document.getElementById("btnSubmit").onclick = function(evt) {
      // Capturamos el evento de hacer submit sobre el formulario y lo paramos
      evt.preventDefault();
      // Creamos la variable allOk que es la que nos hará de control de envio, si se cumple se envia, si en algún campo no se cumple, no se envia
      var allOk = true;
      // ---- Limpiamos las classes 'is-invalid' y 'is-valid' ----
      this.form.querySelectorAll("*").forEach(function(item) {  //aplicamos la funcion para cada elemento, seleccionados todos los elementos del formulario
        item.className = item.className.replace(/(is-valid|is-invalid)/g, '');  //indicamos que reemplace la classe is-valid por is-invalid, y la is-invalid por is-invalid
      });
      // ------------------------ NOMBRE COMPLETO --------------------
      this.form.nombre.value = this.form.nombre.value.trim();  
      var nombreString = this.form.nombre.value;
      var nombrePattern = /\D/g; 
      if (!nombrePattern.test(nombreString) || nombreString == "") {
        this.form.nombre.className += ' is-invalid';        
        allOk = false;
      } else {
        this.form.nombre.className += ' is-valid';
      }
      // ------------------------ NUMERO DE TELEFONO --------------------
      this.form.numero.value = this.form.numero.value.trim();
      var numeroString = this.form.numero.value;
      var numeroPattern = /^(\+34|0034|34)?[\s|\-|\.]?[6|7|8|9][\s|\-|\.]?([0-9][\s|\-|\.]?){8}$/; //admite numeros españoles, prefijo +34, 0034 o 34, admite separadores de espacio, guion, o punto. Maximo 9 numeros aparte del prefijo (solo pueden empezar por 6,7,8 o 9)
      if (!numeroPattern.test(numeroString) || numeroString == "") {
        this.form.numero.className += ' is-invalid';
        allOk = false;
      } else {
        this.form.numero.className += ' is-valid';
      }
      // ------------------------- DIRECCION DE CORREO -----------------------------------
      this.form.email.value = this.form.email.value.trim();
      var emailString = this.form.email.value;
      var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Formato mail, con un simbolo de arroba obligatorio, el punto obligatorio, y despues 2 o 3 caracteres despues del punto
      if (!emailPattern.test(emailString) || emailString == "") {
        this.form.email.className += " is-invalid ";
        allOk = false;
      } else {
        this.form.email.className += " is-valid ";
      }
      // ------------------------ MENSAJE ---------------------------------
      if (this.form.mensaje.value == "" || this.form.mensaje.value.length > 300) {
        this.form.mensaje.className += " is-invalid ";
        allOk = false;
      } else {
        this.form.mensaje.className += " is-valid ";
      }
      // ------------------------- RECAPTCHA V2 --------------------------------	
      var response = grecaptcha.getResponse();
      //Creamos la condición para que muestre un aviso (en un div oculto) de que el captcha no esta verificado 
      if (response.length == 0) {
        document.getElementById("g-recaptcha-error").style.display = "block";
        allOk = false;
     	}
      //Creamos la condición final de si se cumple todo, se envia el formulario al hacer click en el button
      if (allOk == true) {
         this.form.submit(); //Disparamos el evento de enviar el formulario validado
      }
   }
