//重新生成所有tile

function refreshTiles() {
	
	$('.tile').remove();
	for(let i=0;i<cols.length;i++) {
		for(let j=0;j<rows.length;j++) {
			$('.tile-container').append('<div class ="tile tile-' + i +'-' + j + ' tile-' + cellsArray[i][j].value + '"></div>' );
			var theTile = $('.tile-'+ i + '-' +j);
			
			if(cellsArray[i][j].value == 0) {
//				theTile.css({
//					'width' : 0,
//					'height' : 0
//				});
			}else {
//				theTile.css({
//					'width' : '100px',
//					'height' : '100px'
//				});
				theTile.text(cellsArray[i][j].value);
			}
			cellsArray[i][j].merged = false;
		}
	}
	

}

//生成随机棋子
function randomTile() {
	this.ava = new availableTile();
	if(fullTiles(cellsArray)){
		return false;
	}else {
		var rand = {
			x:this.ava.x,
			y:this.ava.y,
			value:this.ava.value
		}
//		tilesArray.push(rand);
	}
	newTile(rand.x,rand.y,rand.value);
}

//棋子是否布满
function fullTiles(array) {
	for(let i =0; i<cols.length;i++) {
		for(let j=0;j<rows.length;j++) {
			if(array[i][j].value == 0){
				return false;
				break;
			}
		}
	}
	return true;
}

//判断随机棋子生成位置是否已存在棋子
function availableTile() {
	this.x= Math.floor(Math.random()*rows.length);
	this.y= Math.floor(Math.random()*cols.length);
	this.value= Math.random() < 0.9 ? 2:4;
	var times = 0;
	while(times< 50) {
		if(cellsArray[this.x][this.y].value == 0){
			break;
		}else {
			this.x = Math.floor(Math.random()*rows.length);
			this.y = Math.floor(Math.random()*cols.length); 
		}
		times++;
	}
	if(times == 50) {
		for(let i=0;i<cols.length;i++) {
			for(let j=0;j<rows.length;j++) {
				if(cellsArray[i][j].value == 0) {
					this.x = i;
					this.y = j;
				}
			}
		}
	}
}

//生成一个新棋子
function newTile(x,y,val) {
	$('.tile-new').removeClass('tile-new');
	cellsArray[x][y].value = val;
	var tile = $('.tile-' + x +'-' + y);
	tile.addClass('tile-new tile-' + val);
	tile.text(val);
}
