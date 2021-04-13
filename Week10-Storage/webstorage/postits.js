/* postits.js
 *
 */
var postitNum = 0;

window.onload = init;

function init() {
	var button = document.getElementById("add_button");
	button.onclick = createSticky;
	var button = document.getElementById("clear_button");
	button.onclick = clearStickyNotes;

	// EJERCICIO A
	// cargar las notas postit de localStorage  
	// cada nota se guarda como un par así: postit_X = texto_de_la_nota
	// donde X es el número de la nota
	// por cada una de ellas, llamar al método
	// addStickyToDOM(texto_de_la_nota);
	
	for (var i=0; i < localStorage.length; i++) { 
		if(localStorage.key(i).startsWith("postit_")){
			var postit = localStorage.getItem("postit_" + postitNum); 
			addStickyToDOM(postit);
			postitNum++;
		}
	}

	if(postitNum == 0) {
		var alma = document.getElementById("alma");
		alma.textContent = "Almacenado: " + getLocalStorageSize() + " Bytes";
	}
}

function createSticky() {
	var value = document.getElementById("note_text").value;
	
	// EJERCICIO B
        // crear la nota con nombre postit_X, donde X es un número entero
	// (postit_1, postit_2, ...)  y guardarla en el localStorage
	localStorage.setItem("postit_" + postitNum, value);
	postitNum++;
	
	addStickyToDOM(value);
}


function addStickyToDOM(value) {
	var stickies = document.getElementById("stickies");
	var postit = document.createElement("li");
	var span = document.createElement("span");
	var alma = document.getElementById("alma");
	span.setAttribute("class", "postit");
	span.innerHTML = value;
	postit.appendChild(span);
	stickies.appendChild(postit);
	alma.textContent = "Almacenado: " + getLocalStorageSize() + " Bytes";

}

function clearStickyNotes() {
	// EJERCICIO C
	// Crear un nuevo botón en la ventana de postit notes que al pulsarlo,
	// elimine las notas de pantalla y de localStorage
	for (var i=0; i < postitNum; i++) { 
		localStorage.removeItem("postit_" + i);
	}
	
	postitNum = 0;
	
	// Algoritmo:	
	// obtener una referencia a la capa "stickies"
	// recorrer los hijos (childNodes) de esa referencia,
	// eliminándolos uno a uno (removeChild)
	var stickies = document.getElementById("stickies");
	var children = stickies.childNodes;
	var array = Array.from(children);
	array.forEach(function(item){
		stickies.removeChild(item);
	});

	var alma = document.getElementById("alma");
	alma.textContent = "Almacenado: " + getLocalStorageSize() + " Bytes";
}

/**
 * REF: https://gist.github.com/tkambler/71050d80f1a57ea83c18
 * Autor: Tim Ambler (tkambler)
 * Corrección: Sylvain RAGOT (yllieth) 
 * Modificado: Zuhaitz Martínez
 */
/**
 * Returns the total amount of disk space used (in MB) by localStorage for the current domain.
 */
var getLocalStorageSize = function() {
    var total = 0;
    for (var x in localStorage) {
        // Value is multiplied by 2 due to data being stored in `utf-16` format, which requires twice the space.
        var amount = (localStorage[x].length * 2) /*/ 1024/ 1024*/;
        if (!isNaN(amount) && localStorage.hasOwnProperty(x) && x.startsWith("postit_")) {
            // console.log(x, localStorage.getItem(x), amount);
            total += amount;
        }
    }
    return total.toFixed(2);
};
