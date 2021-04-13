function Libro(titulo, autor, precio)
{

	Producto.apply(this, [titulo,autor,precio]);

	var _paginaActual = 0;

	this.marcador = function(pagina)
	{	
		_paginaActual = pagina;
		this.obtenerPagina();
	}

	this.pasarPagina = function()
	{
		_paginaActual++;
	}
	this.obtenerPagina = function()
	{
		console.log("Estoy en la página: " + _paginaActual);
	}

}

Libro.prototype = new Producto();
Libro.prototype.constructor = Libro;

