const almacen = [
  {tipo:   "lavadora", valor: 5000},
  {tipo:   "lavadora", valor:  650},
  {tipo:      "vaso", valor:   10},
  {tipo: "armario", valor: 1200},
  {tipo:   "lavadora", valor:   77}
]

let totalValorLavadoras = almacen.filter(item => item.tipo == "lavadora")
								.reduce((acc, item) => acc + item.valor, 0);
								
//let totalValorLavadoras = almacen.reduce((acc, objeto) => objeto.tipo == "lavadora" ? acc + objeto.valor : acc, 0);

console.log (  totalValorLavadoras ); // se espera 5727