var cellsArray = new Array();
var rows = $('.grid-row');
var cols = $('.grid-row:first>.grid-cell');
var score = 0;
var bestScore = new Number;



//游戏主函数
function game2048() {
	console.log(getGameState());
	localStorageManager();
	init();
	
}


//初始化函数
function init() {
	$('.game-message').removeClass('game-over').removeClass('game-won');
	$('.game-message').fadeOut(0);
	
	score = 0;
	console.log(getGameState());
	if(localStorageSupported()) {
		bestScore = getBestScore();
		updateBestScore(bestScore);
		if(getGameState() != null){
			cellsArray = getGameState();
			console.log(getGameState());
		}else {
			setupCells();
			setTimeout(()=>{
				randomTile();
			},250);
			setTimeout(()=>{
				randomTile();
			},500);
		}
	}
	refreshTiles();
}

//初始化cells数组
function setupCells () {
	
	for(let i =0;i<cols.length;i++) {
		cellsArray[i] = [];
		for(let j = 0;j<rows.length;j++) {
			cellsArray[i][j] = new cell(i,j,0);
		}
	}
	return cellsArray;
}

//构造cell对象
function cell (x,y,val) {
	this.x = x;
	this.y = y;
	this.value = val;
	this.merged = false;
}


//游戏结束判定
function isGameTerminated(){
	if(fullTiles(cellsArray) && noMove(cellsArray)) {
		over();
		setTimeout(()=>{clearGameState();},400);
		//判断游戏是否到达2048
	}else if(haswon(2048)){
		won();
		setTimeout(()=>{clearGameState();},400);
	}
//	clearGameState();
}
//失败结束
function over() {
	$('.game-message>p').text('Game Over!');
	$('.game-message').addClass('game-over').fadeIn(800);
}
//获胜结束
function haswon(num) {
	for(let i=0;i<cols.length;i++) {
		for(let j=0;j<rows.length;j++) {
			if(cellsArray[i][j].value == num) {
				return true;
			}
		}
	}
	return false;
}

function won() {
	$('.game-message>p').text('You Win!');
	$('.game-message').addClass('game-won').fadeIn(1600);
}

//游戏分数
function updateScore(score) {
	$('#score').text(score);
}
//最高分
function updateBestScore(score) {
	$('#best').text(score);
	bestScore = score;
	if(localStorageSupported()){
		setBestScore(bestScore);
	}
}

