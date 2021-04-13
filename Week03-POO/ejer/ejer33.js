function Punto(x, y)
{ 
	this.x = x;
	this.y = y;
}

Punto.prototype.suma = function(punto)
{
	return new Punto(this.x + punto.x, this.y + punto.y);
}

let punto = new Punto(1, 2).suma(new Punto(2, 1));
console.log(punto.x, punto.y);  // Se espera: 3 3
console.log(punto instanceof Punto); // Se espera: true
console.log(punto.constructor.name);  // Se espera Punto
	