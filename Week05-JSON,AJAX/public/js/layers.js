export function createBackgroundLayer(level, sprites){
    const buffer = document.createElement('canvas');
    buffer.width = 2048;
    buffer.height = 240;
    const context = buffer.getContext("2d");
    // ejercicio 8 (Tema 5: Canvas)
    // Por cada tile del level situado en x,y
        // dibujar dicho tile en el contexto de buffer, haciendo uso del método drawTile del objeto sprites
	for (var x=0; x<level.tiles.grid.length; x++){
		for (var y=0; y<level.tiles.grid[0].length; y++){
			sprites.drawTile(level.tiles.grid[x][y], context, x, y);
		}
	}
    return buffer;

} 
