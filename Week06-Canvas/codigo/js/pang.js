const canvas = document.getElementById("pang");
const context = canvas.getContext("2d");
const sprite = new Image();

export function loadSpritesheet(){
        inicializar(0, 0);
}

function inicializar(x, y){
        sprite.src = "img/spritesheet.png";
        sprite.onload = function() {
                context.drawImage(sprite, 0, 0);
                dibujarCuadro(x, y);
                dibujarCoord(x, y);
                zoomImage(x, y);
        };
}

function dibujarCuadro(x, y){
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(28+x, y);
        context.lineTo(28+x, 36+y);
        context.lineTo(x, 36+y);
        context.closePath();
        context.lineWidth = 1;
        context.strokeStyle = "#FF0000";
        context.stroke();
}

function dibujarCoord(x, y){
        context.font = "bold 12px sans-serif";
        context.fillStyle = "red";
        context.textBaseline = "top";
        context.textAlign = "right";
        context.fillText(`(${x}, ${y})`, canvas.width-74, 8);
}


function zoomImage(x, y){
        context.drawImage(
                sprite,
                x, y, 28, 36,
                486, 0 , 56, 72
        );
}



export function actualizar(x, y) {
        //borrar();
        context.drawImage(sprite, 0, 0);
        dibujarCuadro(x, y);
        dibujarCoord(x, y);
        zoomImage(x, y);
}


function borrar(x, y){
        context.clearRect(0, 0, canvas.width, canvas.height);
}