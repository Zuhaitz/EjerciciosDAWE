import Producto from './productos.js';
export default class Disco extends Producto {

	constructor(titulo, autor, precio, formato){
		super(titulo, autor, precio);
		this.formato = formato;
	}

	formato() {
		console.log("Formato del disco:" + formato)	
	}

}
