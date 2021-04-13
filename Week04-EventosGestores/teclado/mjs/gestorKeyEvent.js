export default class GestorKeyEvent {

	constructor(){
		document.addEventListener('keydown', this.avisoKey);
		document.addEventListener('keyup', this.soltarKey);
		this.pulsado = false;
	}
	
	avisoKey (tecla) {
		switch(tecla.code){
			case 'ArrowUp': case 'ArrowDown': case 'ArrowLeft': case 'ArrowRight': 
				!this.pulsado ? (alert(`Has pulsado ${tecla.code}`), this.pulsado = true) : null;
				tecla.preventDefault();
				break;
			default: break;
		}
	}

	soltarKey () { this.pulsado = false; }
}
