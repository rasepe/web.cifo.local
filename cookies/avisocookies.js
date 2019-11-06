//Si detecta que la cookie esta ok, detecta que esta ok porque ya esta aceptada, elimina el hijo del elemento boxCookies, (por lo tanto no se muestra la maquetación html)
if (detectCookie("okCookie")) {
	if (getCookie("okCookie") == "ok") {
		var objBoxRGPD = document.getElementById("boxCookies");
		objBoxRGPD.parentNode.removeChild(objBoxRGPD);
	}
} else {
	//elimina el hijo del elemento boxCookies cuando ha sido aceptada por el boton con el id"btnRGPD" (por lo tanto no se muestra la maquetación html)
	document.getElementById("btnCookies").onclick = function() {
		setCookie("okCookie", "ok", 365);
		var objBoxCookies = document.getElementById("boxCookies");
		objBoxCookies.parentNode.removeChild(objBoxCookies);
	}
}
