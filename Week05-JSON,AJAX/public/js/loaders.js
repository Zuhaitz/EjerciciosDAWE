import Level from './Level.js';
import SpriteSheet from './SpriteSheet.js'
import {createBackgroundLayer} from './layers.js';

export function loadImage(url){

    return new Promise(resolve => {
    	const image = new Image();
    	image.addEventListener('load', () => {
		resolve(image);
	});
	image.src = url;
    });
}

function loadJSON(url){

    return fetch(url).then(r1 => r1.json());
}

function createTiles(level, backgrounds){

	backgrounds.forEach(function(backG){
		backG.ranges.forEach(function(ran) {
			for (var i=0; i<ran[1]; i++){
				for(var j=0; j<ran[3]; j++){
					level.tiles.set(ran[0]+i,ran[2]+j, backG.tile);
				}
			}
		});
	});
}

function loadSpriteSheet(){
	return loadJSON('sprites/sprites.json')
	.then(sheetSpec => Promise.all([
		sheetSpec,
		loadImage(sheetSpec.imageURL.replace("/", "")),
	]))
	.then(([sheetSpec, image]) => {
		const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH);
			            
		sheetSpec.tiles.forEach(tile => sprites.defineTile(tile.name, tile.index[0], tile.index[1]));						
		return sprites;
	});
}


export function loadLevel(){
    return loadJSON('levels/level.json') // qué tiles hay que poner y dónde dentro de este nivel
    .then(levelSpec => Promise.all([
        levelSpec, 
        loadSpriteSheet(), // cargar imágenes de un spritesheet como sprites 
      ]))
        .then(([levelSpec, backgroundSprites]) => {
            const level = new Level();
            createTiles(level, levelSpec.backgrounds); // desplegar tiles en la estrucura Matrix

            const backgroundLayer = createBackgroundLayer(level, backgroundSprites); // cargar canvas
            level.background = backgroundLayer; // canvas buffer 

            return level;
    });
    
}