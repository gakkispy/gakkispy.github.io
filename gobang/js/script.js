//canvas
var gobang = document.getElementById("gobang"),
	context = gobang.getContext("2d"),
	background = new Image();
	background.src = "http://imglf.nosdn.127.net/img/dis1c3pkblY3UWxkMk5seUV2ZTVrSFdpWW1JZUJWRGlKM0w3YW1YOWJmeVN1bzJic25BVzNRPT0.png?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg";


context.strokeStyle =  "#000";
background.onload = function() {
	context.drawImage(background,0,0,450,450);
	(() => {
		for (let i= 0; i<15 ; i++ ) {
			context.moveTo(15 + i*30, 15);
			context.lineTo(15 + i*30, 435);
			context.stroke();
			context.moveTo(15,15 + i*30);
			context.lineTo(435,15+ i*30);
			context.stroke();
		}			
	})();
}
//落子
var hasChess = [],
	me = true;
	
	
for (let i=0; i<15; i++) {
	hasChess[i] = [];
	for (let j=0; j<15;j++) {
		hasChess[i][j] = 0;
	}
}

var oneStep = function (i,j,me) {
	context.beginPath();
	context.arc(15 + i*30,15 + j*30,13,0,2*Math.PI);
	context.closePath();
	let gradient = context.createRadialGradient(15 + i*30, 15+ j*30 -2,50,15 + i*30 +2, 15+j * 30 - 2,0);
	me ? (()=>{gradient.addColorStop(0,"#0a0a0a");gradient.addColorStop(1,"#8e8e8e" )})() : (()=>{gradient.addColorStop(0,"#8e8e8e");gradient.addColorStop(1,"#fff")})();
	context.fillStyle = gradient;
	context.fill();
	me = !me;
}


//赢法数组
var wins = [],
	count = 0;
	//生产赢法数组
for (let i=0;i<15 ; i ++) {
	wins[i] = [];
	for(let j = 0; j<15;j ++) {
		wins[i][j] = [];
	}
}
//所有竖排赢法
for (let i=0; i<15; i++) {
	for(let j=0;j<11;j++) {
		for (let k=0;k<5;k++) {
			wins[i][j+k][count] = true;
		}
		count++;
	}
}
//所有横排赢法
for (let i=0; i<15;i++) {
	for (let j = 0;j<11;j ++) {
		for (let k=0;k<5;k++) {
			wins[j+k][i][count] = true;
		}
		count++;
	}
}
//所有45°赢法
for (let i=0;i<11;i++) {
	for(let j=0;j<11;j++) {
		for(let k=0;k<5;k++) {
			wins[i+k][j+k][count] = true;
		}
		count++;
	}
}
//所有135°赢法
for (let i=0; i<11;i++) {
	for(let j=14;j>3;j--) {
		for (let k=0;k<5;k++) {
			wins[i+k][j-k][count] = true;
		}
		count++;
	}
}

//输赢判断
var myWin = [],
	pcWin = [],
	over = false;
for(let i=0;i<count ;i++) {
	myWin[i] = 0;
	pcWin[i] = 0;
}

//AI实现
var pcAI = function() {
	//玩家分数
	let myScore = [],
//	电脑分数
		pcScore = [],
//		最优位置的分数
		max = 0,
//		电脑预落子maxI列
		maxI = 0,
//		电脑预落子maxJ行
		maxJ =0;
		for (let i=0;i<15;i++) {
			myScore[i] = [];
			pcScore[i] = [];
			for(let j=0; j<15;j++) {
				myScore[i][j] = 0;
				pcScore[i][j] = 0;
			}
		}
//		对两个数组分别进行加分
		for (let i=0;i<15;i++) {
			for(let j=0;j<15;j++) {
				if(hasChess[i][j] == 0) {
					for (let k=0;k<count;k++){
						if(wins[i][j][k]) {
							switch(myWin[k]) {
								case 1:
								myScore[i][j] +=200;
								break;
								case 2:
								myScore[i][j] +=400;
								break;
								case 3:
								myScore[i][j] +=2000;
								break;
								case 4:
								myScore[i][j] +=10000;
								break;
								default:
								break;
							}
							switch(pcWin[k]) {
								case 1:
								pcScore[i][j] +=220;
								break;
								case 2:
								pcScore[i][j] +=420;
								break;
								case 3:
								pcScore[i][j] +=2220;
								break;
								case 4:
								pcScore[i][j] +=20000;
								break;
								default:
								break;
							}
						}
					}
//					若玩家在(i,j)处的分数高于目前的最高分数,则落子在(i,j)处
					if(myScore[i][j] > max) {
						max = myScore[i][j];
						maxI = i;
						maxJ = j;
					}else if(myScore[i][j] == max&& pcScore[i][j] > pcScore[maxI][maxJ]){
 // 					如果玩家(i,j)处和目前最优分数一样大，则比较电脑在该位置和预落子的位置的分数
							maxI = i;
							maxJ = j;	
					} 
//					  如果电脑(i,j)处比目前最优的分数大，则落子在(i,j)处
					if(pcScore[i][j] > max) {
						max = pcScore[i][j];
						maxI = i;
						maxJ = j;
					}else if(pcScore[i][j] == max && myScore[i][j] > myScore[maxI][maxJ]){
//						如果电脑(i,j)处和目前最优分数一样大，则比较玩家在该位置和预落子的位置的分数
							maxI = i;
							maxJ = j;
					
					}
				}
			};
		}
		oneStep(maxI,maxJ,false);
		hasChess[maxI][maxJ] = 2;
		
		for (let n=0 ; n<count;n++) {
			if(wins[maxI][maxJ][n]) {
				pcWin[n]++;
				if(pcWin[n] == 5) {
					setTimeout(()=>{window.alert("你输了！")},200);
					over = true;
				}
			}
		}
}
gobang.onclick = function(e) {
	if (over) {
		return;
	}
	if (!me) {
		return;
	}
	let x = e.offsetX,
		y = e.offsetY,
		i = Math.floor(x/30),
		j = Math.floor(y/30);
		if (hasChess[i][j] == 0 ) {
			oneStep(i,j,me);
			hasChess[i][j] = 1;
			for (let k=0; k<count;k++) {
				if(wins[i][j][k]) {
					myWin[k]++;
					console.log(myWin[k]);
					if(myWin[k] == 5) {
						setTimeout(()=>{window.alert("你赢了！")},200);
						over = true;
					}
				}
			}
			if(!over) {
				pcAI();	
			}
		}
}
//restart
var restart = document.getElementById("restart");
restart.onclick = function () {
	if(over) {
		window.location.reload();
	}
	
}
