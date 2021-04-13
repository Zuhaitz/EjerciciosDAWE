class Punto {
	
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
	
	
	suma(punto){
		return new Punto(this.x + punto.x, this.y + punto.y);
	}
	
}