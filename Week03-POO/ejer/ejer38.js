class ArrayOrdenado{
	
	constructor(comparador){
		this.comparador = comparador;
		this.contenido = [];
	}
	
	findPos(elt){
		var pos = this.contenido.findIndex(x => (this.comparador(elt, x)) < 0);
		const fn = (p => pos >= 0 ? pos : this.contenido.length);
		return fn();
	}
	
	insert(elt){
		this.contenido.splice(this.findPos(elt), 0, elt)
	}
	
}

var ordenado = new ArrayOrdenado((a, b) => a - b)

ordenado.insert(1)
ordenado.insert(2)
ordenado.insert(5)
ordenado.insert(4)
ordenado.insert(3)
console.log("array:", ordenado.contenido)

var ordenado2 = new ArrayOrdenado((a, b) => -(a - b))
ordenado2.insert(1)


ordenado2.insert(4)
ordenado2.insert(3)

ordenado2.insert(5)
ordenado2.insert(2)

console.log("array:", ordenado2.contenido)

// array: [1, 2, 3, 4, 5]
