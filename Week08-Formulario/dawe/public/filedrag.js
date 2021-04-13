// getElementById
	function $id(id) {
		return document.getElementById(id);
	}


	// output information
	function output(msg) {
		var m = $id("messages");
		m.innerHTML = msg + m.innerHTML;
	}


	// file drag hover
	function fileDragHover(e) {
		e.stopPropagation();
		e.preventDefault();
		e.target.className = (e.type == "dragover" ? "hover" : "");
	}


	// file selection
	function fileSelectHandler(e) {

		// cancel event and hover styling
		fileDragHover(e);

		// fetch FileList object
		var files = e.target.files || e.dataTransfer.files;
   
        if ( e.constructor.name !=  "DragEvent"){
            // process all File objects
            for (var i = 0, f; f = files[i]; i++) {
                parseFile(f);
            }
        }

        // files can be added by drag&drop or clicking on form's button
        // if the later, append files to form files field 
        var formFiles = $id("upload").fileselect;
        if (formFiles.files.length == 0){
            formFiles.files = files;
        }



	}


	// output file information
	function parseFile(file) {

		output(
			"<p>Datos del fichero: <strong>" + file.name +
			"</strong> Tipo: <strong>" + file.type +
			"</strong> Tamaño: <strong>" + file.size +
			"</strong> bytes</p>"
		);

	}


    function enviar(submitform){
    // debes devolver una función que recoja los datos de submitform usando FormData y haga una
    // petición post (usando el Fetch API) con dichos datos a /pedido/add 
    //  El resultado debes tratarlo como un objeto JSON y mostrarlo pantalla. En concreto la respuesta
    // JSON debe contener las rutas a los ficheros subidos al servidor (al hacer click sobre ellas deben
    // abrirse los ficheros) y los valores del resto de campos.

		return createFormData;

    }
	
	function createFormData(){
		if(checkInputs()){
			const formData = new FormData($id("upload"));
			const url = '/pedidos/add';
			fetch(url, {
				method: 'POST',
				body: formData
			}).then(resp => resp.json()).then(resp => {
				if (resp.err) alert(resp.err);
				else {
					output("<br><strong>Cantidad:</strong><br> " + resp[0].cantidad);
					output("<br><strong>Libro:</strong> " + resp[0].libro);
					output("<br><strong>E-mail:</strong> " + resp[0].email);
					output("<br><strong>Telefono:</strong> " + resp[0].tel);
					output("<br><strong>Name:</strong> " + resp[0].name);
					output("<br><small>*Imagenes con link</small>")

					Array.from({length: resp.length - 1}, (_, i) => i + 1).forEach(id => {
						const imagen = `<a href='${resp[id].file}' target="_blank"><img src='${resp[id].file}' width="100" height="100"></a>`;
						output(imagen);
					});
				}

				console.log(resp);
			})
		}
	}
	
	function checkInputs(){
		return checkDatosCliente() && checkLibros() && checkFiles();
	}

	function checkDatosCliente(){
		var nombre = $id("nombre"),                        
			telefono = $id("telefono"), 
			email = $id("email");

		var r = telefono.pattern(telefono.value);
		console.log(telefono.checkValidity()); // true

		if(!nombre.checkValidity()) { alert("El campo 'Nombre' es obligatorio"); return false; }
		else if(!telefono.checkValidity()) { alert("El campo 'Telefono' es obligatorio"); return false; }
		else if(!email.checkValidity()) { alert("El campo 'E-mail' es obligatorio"); return false; }
		else return true;
	}

	function checkLibros(){
		var libro = $id("libro"),
			cantidad = $id("cantidad");

		if(!libro.checkValidity()) { alert("El campo 'Libro' es obligatorio"); return false; }
		else if(!cantidad.checkValidity()) { alert("El campo 'Cantidad' es obligatorio"); return false; }
		else return true;
	}

	function checkFiles(){
		var fileselect = $id("fileselect");
		const extValidas = ['jpg', 'jpeg', 'png'];
		var correcto = true;

		Array.from(fileselect.files).forEach(file => {
			var sizeInMB = (file.size / (1024*1024)).toFixed(2);
			var extension = file.name.split(".").pop();
			if (!extValidas.includes(extension)) { alert("Solo se aceptan archivos con formato .PNG o .JPG"); correcto = false; }
			else if (sizeInMB > 2) { alert("Un archivo pesa demasiado"); correcto = false; }
		});

		return correcto;
	}

	// initialize
	function init() {

		var fileselect = $id("fileselect"),
			filedrag = $id("filedrag"),
			submitbutton = $id("enviar");


        	submitbutton.onclick = enviar($id("upload"));



		// file select
		fileselect.addEventListener("change", fileSelectHandler, false);


			// file drop
			filedrag.addEventListener("dragover", fileDragHover, false);
			filedrag.addEventListener("dragleave", fileDragHover, false);
			filedrag.addEventListener("drop", fileSelectHandler, false);
			filedrag.style.display = "block";

	}

	// call initialization file
	if (window.File && window.FileList) {
		init();
	}

