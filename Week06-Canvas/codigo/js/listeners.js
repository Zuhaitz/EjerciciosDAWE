import {loadSpritesheet, actualizar} from './pang.js';

const canvas = document.getElementById('pang');
var x = 0;
var y = 0;


window.onload = function(){
        loadSpritesheet();
        document.addEventListener('keydown', avisoKey);

}


function avisoKey (tecla) {
        switch(tecla.code){
                case 'ArrowUp':
                        y>0 ? actualizar(x, --y) : null;
                        tecla.preventDefault();
                        break;
                case 'ArrowDown':
                        y<canvas.height ? actualizar(x, ++y) : null;
                        tecla.preventDefault();
                        break;
                case 'ArrowLeft':
                        x>0 ? actualizar(--x, y) : null;
                        tecla.preventDefault();
                        break;
                case 'ArrowRight':
                        x<canvas.height ? actualizar(++x, y) : null;
                        tecla.preventDefault();
                        break;
                default: break;
        }
}