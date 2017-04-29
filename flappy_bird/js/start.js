var jsHeadTitle = document.getElementById("headTitle");
var jsHeadBird = document.getElementById("headBird");
var jsWrapBg  =document.getElementById("wrapBg")
var jsStartBtn = document.getElementById("startBtn");
var jsOkBtn = document.getElementById("ok");
var jsGrassLand = document.getElementById("grassLand");
var jsScore = document.getElementById("score");
var jsGameOver = document.getElementById("gameOver");
var jsNum0  =document.getElementById("num1");

var Y = 3;
var index = 0;
var score = 0;
var imgArr = ["img/bird0.png","img/bird1.png"];

var newGameManager = new gameManager;
var blocksArr = new Array;
var animationBird = new bird();
var blockDistance = newGameManager.randomNum(130,250);

var headWaveTimer = setInterval(headWave,200);
var landTimer = setInterval(landRun,30);

function headWave() {
	Y *= -1;
	jsHeadTitle.style.top = jsHeadTitle.offsetTop + Y + "px";
	jsHeadBird.src = imgArr[index++];
	if(index == 2) {
		index = 0;
	}
}


function landRun() {
	if(jsGrassLand.offsetLeft <= -343) {
		jsGrassLand.style.left = "0";
	}
	jsGrassLand.style.left = jsGrassLand.offsetLeft - 3 + "px";
	if(blocksArr.length) {
		for(var i=0;i<blocksArr.length;i++) {
			blocksArr[i].moveBlock();
			var x = newGameManager.rectangleCrashExamine(blocksArr[i].downDivWrap,animationBird.div);
			var y = newGameManager.rectangleCrashExamine(blocksArr[i].upDivWrap,animationBird.div);
			var z= animationBird.div.offsetTop>=390;
			if( x|| y|| z) {
				window.clearInterval(landTimer);
				animationBird.fallSpeed = 0;
				jsWrapBg.removeEventListener("click",bgListener);//取消点击事件
				jsScore.style.display = "none";//隐藏积分器
				jsGameOver.style.display = "block";//显示游戏结束面板
				scoreManager(score,4,5,6);//显示本局分数
				Boolean(localStorage.best) ? (localStorage.best < score ? localStorage.best = score : null) : localStorage.best = score;
				//判断当前分数是否高于之前最高分，如果是，则更新最高分
				scoreManager(localStorage.best,7,8,9);//显示最高分
			}
		}
		if(blocksArr[blocksArr.length-1].downDivWrap.offsetLeft < (450- blockDistance)){
			blockDistance = newGameManager.randomNum(130,250);
			var newBlock = new roadBlock();
			newBlock.createBlock();
			blocksArr.push(newBlock);
		}
		if(blocksArr[0].downDivWrap.offsetLeft < -50) {
			jsWrapBg.removeChild(blocksArr[0].downDivWrap);
			jsWrapBg.removeChild(blocksArr[0].upDivWrap);
			blocksArr.shift(blocksArr[0]);
		}
		if(blocksArr[0].downDivWrap.offsetLeft == -12){
			score++;
			scoreManager(score,1,2,3);
		}
	}
}

jsStartBtn.addEventListener( "click",function() {
	//隐藏开始界面元素
	jsHeadTitle.style.display = "none";
	clearInterval(headWaveTimer);
	jsStartBtn.style.display = "none";
	//插入小鸟
	animationBird.showBird(jsWrapBg);
	//控制小鸟下落
	animationBird.flyBird();
	//小鸟的逐帧动画
	animationBird.wingWave();

	//生成路障
	var newBlock = new roadBlock();
	newBlock.createBlock();
	blocksArr.push(newBlock);

	//显示计数器
	jsNum0.style.display = "block";

	jsWrapBg.addEventListener( "click",bgListener,false);
	window.event?window.event.cancelBubble=true:event.stopPropagation();
},false);


function bgListener() {
	animationBird.fallSpeed = -8;
	window.event?window.event.cancelBubble=true:event.stopPropagation();
}

jsOkBtn.addEventListener("click",function() {
	window.location.reload();//点击后刷新
},false);
