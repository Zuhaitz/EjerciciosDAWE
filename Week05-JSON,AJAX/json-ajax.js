function obtenerInfo()
{
        var combobox = document.getElementById("combo");
        var titulo = document.getElementById("titulo");
        var autor = document.getElementById("autor");
        var portada = document.getElementById("portada");
        var codigo = combobox.options[combobox.selectedIndex].text;
        if(codigo.includes("ISBN")){
                fetch(`https://openlibrary.org/api/books?bibkeys=${codigo}&jscmd=details&format=json`)
                        .then( r1 => r1.json() ).then( r1 => {
                                titulo.innerHTML = r1[Object.keys(r1)[0]].details.title;
                                autor.innerHTML = "Autor/es: " + r1[Object.keys(r1)[0]].details.authors.map(e => e.name);
                                new Promise(resolve => {
                                        portada.addEventListener('load', () => {
                                                resolve(portada);
                                        });
                                        portada.src = r1[Object.keys(r1)[0]].thumbnail_url.replace("S", "M");
                                });
                        });
        }
}