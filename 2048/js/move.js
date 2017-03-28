//移动

function move(direction) {
	switch (direction) {
		case 0:
			if(moveUp()){
				setTimeout(()=>{
					randomTile();
				},250);
				setTimeout(() => {
					isGameTerminated();
				},300);
			}
				
			break;
		case 1:
			if(moveRight()){
				setTimeout(()=>{
					randomTile();
				},250);
				setTimeout(() => {
					isGameTerminated();
				},300);
			}
		
			break;
		case 2:
			if(moveDown()){
				setTimeout(()=>{
					randomTile();
				},250);
				setTimeout(() => {
					isGameTerminated();
				},300);
			}
		
			break;
		case 3:
			if(moveLeft()){
				setTimeout(()=>{
					randomTile();
				},250);
				setTimeout(() => {
					isGameTerminated();
				},300);
			}
		
			break;
	}
	
	if(localStorageSupported()){
		setTimeout(()=>{
			setGameState(cellsArray);
			
		},350);
	} 
}



//左移
function moveLeft() {
	
	if(canMoveLeft(cellsArray)){
		for(let i=1;i<cols.length;i++) {
			for(let j=0;j<rows.length;j++) {
				if(cellsArray[i][j].value !=0) {
					for(let k=0;k<i;k++) {
						if(cellsArray[k][j].value == 0 && faultOnRow(i,j,k,cellsArray) ){
							
							moveStep(i,j,k,j);
							cellsArray[k][j].value = cellsArray[i][j].value;
							cellsArray[i][j].value = 0;
							continue;
						}else if(cellsArray[k][j].value == cellsArray[i][j].value && faultOnRow(i,j,k,cellsArray) && !cellsArray[k][j].merged){
							moveStep(i,j,k,j);
							cellsArray[k][j].value  += cellsArray[i][j].value;
							cellsArray[i][j].value = 0;
							score += cellsArray[k][j].value;
							
							
							updateScore(score);
							if(score > bestScore) {
								updateBestScore(score);
							}
							
							
							cellsArray[k][j].merged = true;
							continue;
						}
					}
				}
			}
		}
	}else {
		return false;
	}
	setTimeout(()=>{refreshTiles();},200);
	return true;
}
//右移
function moveRight() {
	
	if(canMoveRight(cellsArray)) {
		for(let i=cols.length-2;i>=0;i--) {
			for(let j=0;j<rows.length;j++){
				if(cellsArray[i][j].value !=0) {
					for(let k= cols.length-1;k>i;k--) {
						if(cellsArray[k][j].value == 0 && faultOnRow(k,j,i,cellsArray)) {
							moveStep(i,j,k,j);
							cellsArray[k][j].value = cellsArray[i][j].value;
							cellsArray[i][j].value = 0;
							continue;
						}else if(cellsArray[k][j].value == cellsArray[i][j].value && faultOnRow(k,j,i,cellsArray) && !cellsArray[k][j].merged){
							moveStep(i,j,k,j);
							cellsArray[k][j].value  += cellsArray[i][j].value;
							cellsArray[i][j].value = 0;
							score += cellsArray[k][j].value;
							
							updateScore(score);
							if(score > bestScore) {
								updateBestScore(score);
							}
							
							cellsArray[k][j].merged  = true;
							continue;
						}
					}
				}
			}
		}
	}else {
		return false;
	}
	setTimeout(()=>{refreshTiles();},200);
	return true;
}

//上移
function moveUp() {
	
	if(canMoveUp(cellsArray)) {
		for(let i=0;i<cols.length;i++) {
			for(let j=1;j<rows.length;j++) {
				if(cellsArray[i][j].value != 0) {
					for(let k=0;k<j;k++) {
						if(cellsArray[i][k].value == 0 && faultOnCol(j,i,k,cellsArray)) {
							moveStep(i,j,i,k);
							cellsArray[i][k].value = cellsArray[i][j].value;
							cellsArray[i][j].value = 0;
							continue;
						}else if(cellsArray[i][k].value == cellsArray[i][j].value && faultOnCol(j,i,k,cellsArray) && !cellsArray[i][k].merged){
							moveStep(i,j,i,k);
							cellsArray[i][k].value += cellsArray[i][j].value;
							cellsArray[i][j].value = 0;
							score += cellsArray[i][k].value;
							
							updateScore(score);
							if(score > bestScore) {
								updateBestScore(score);
							}
							
							cellsArray[i][k].merged  = true;
							continue;
						}
					}
				}
			}
		}
	}else {
		return false;
	}
	setTimeout(()=>{refreshTiles();},200);
	return true;
}

//下移
function moveDown() {
	
	if(canMoveDown(cellsArray)) {
		for( let i=0;i<cols.length;i++){
			for(let j=rows.length-2;j>=0;j--) {
				if(cellsArray[i][j].value !=0){
					for(let k = rows.length-1;k>j;k--) {
						if(cellsArray[i][k].value == 0 && faultOnCol(k,i,j,cellsArray)) {
							moveStep(i,j,i,k);
							cellsArray[i][k].value = cellsArray[i][j].value;
							cellsArray[i][j].value = 0;
							continue;
						}else if(cellsArray[i][k].value == cellsArray[i][j].value && faultOnCol(k,i,j,cellsArray) && !cellsArray[i][k].merged){
							moveStep(i,j,i,k);
							cellsArray[i][k].value += cellsArray[i][j].value;
							cellsArray[i][j].value = 0;
							score += cellsArray[i][k].value;
							
							
							updateScore(score);
							if(score > bestScore) {
								updateBestScore(score);
							}
							
							cellsArray[i][k].merged  = true;
							continue;
						}
					}
				}
			}
		}
	}else {
		return false;
	}
	setTimeout(()=>{refreshTiles();},200);
	return true;
}


//判断是否可以移动
function canMoveLeft(Array) {
	for(let i=1;i<cols.length;i++) {
		for(let j=0;j<rows.length;j++) {
			if(Array[i][j].value !=0) {
				if(Array[i-1][j].value == 0 || Array[i-1][j].value == Array[i][j].value) {
					return true;
				}
			}
		}
	}
	
	return false;
	
}


function canMoveRight(Array) {
	for(let i=cols.length-2;i>=0;i--) {
		for(let j=0;j<rows.length;j++) {
			if(Array[i][j].value !=0) {
				if(Array[i+1][j].value == 0 || Array[i+1][j].value == Array[i][j].value) {
					return true;
				}
			}
		}
	}
	
	return false;
	
}

function canMoveUp(Array) {
	for(let i=0;i<cols.length;i++) {
		for(let j=1;j<rows.length;j++) {
			if(Array[i][j].value !=0) {
				if(Array[i][j-1].value == 0 || Array[i][j-1].value == Array[i][j].value){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveDown(Array) {
	for(let i=0;i<cols.length;i++) {
		for(let j = rows.length-2;j>=0;j--) {
			if(Array[i][j].value !=0) {
				if(Array[i][j+1].value == 0 || Array[i][j+1].value == Array[i][j].value){
					return true;
				}
			}
		}
	}
	return false;
}


function noMove(array) {
	  if( canMoveLeft( array ) ||
        canMoveRight( array ) ||
        canMoveUp( array ) ||
        canMoveDown( array ) ){
        	return false;
        }
        return true;
}


//判断行内是否有障碍物
function faultOnRow(col0,row,col1,array) {
	for(let i = col1+1;i<col0;i++) {
		if(array[i][row].value !=0 ){
			return false;
		}
	}
	return true;
}



//判断列内是否有障碍物
function faultOnCol(row0,col,row1,array) {
	for(let i = row1 +1 ; i<row0 ; i++) {
		if(array[col][i].value !=0) {
			return false;
		}
	}
	return true;
}

//移动动画
function moveStep(fromx,fromy,tox,toy) {
	var tile = $('.tile-' + fromx + '-' + fromy );
	var getTop = $('.tile-' + tox + '-' +toy).css('top');
	var getLeft = $('.tile-' + tox + '-' +toy).css('left');

	tile.animate({
		top:getTop,
		left:getLeft
	},199);
	
}
