class Locutor{
	
	constructor(nombre, verbo){
		this.nombre = nombre;
		this.verbo = verbo || "dice"
	}
	
	dice(texto){
		console.log(this.nombre + " " + this.verbo + " '" + texto + "'")
	}
	
}

class Feriante extends Locutor {
	
	constructor(nombre){
		super(nombre, "grita");
	}
	
	dice(texto){
		super.dice(texto.toUpperCase());
	}
	
}

	