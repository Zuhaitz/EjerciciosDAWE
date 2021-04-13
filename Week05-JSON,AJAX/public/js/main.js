import {loadLevel} from './loaders.js';


const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

let offset = 0;
let der = true;

loadLevel().
    then( level => {
            level.draw(context, 0);
            // código del ejercicio 6 
	    //level.tiles.forEach(console.log);
	
	   
	    var intervalId = window.setInterval(function(){
		    if(der) offset++; else offset--; 
		    level.draw(context, offset);
		    if(offset>=150 || offset<=0) der=!der;
	    }, 10);
        
        // código del ejercicio 10
        // Añadir el código necesario para desplazar (scroll) el background del nivel 
        // hacia la izquierda. Se puede hacer en una sóla línea
        // Piensa cómo llamar periódicamente al método level.draw y con qué parámetros...
     



    });
