//var bird = {
//	flyTimer: null,//小鸟飞翔定时器
//	wingTimer: null,//小鸟翅膀摆动定时器
//
//	div: document.creatElement("div"),
//}

function bird() {
	this.flyTimer = null;//飞翔的定时器
	this.wingTimer = null;//翅膀摆动的定时器
	this.div = document.createElement("div");
	this.fallSpeed = 0;//小鸟下落的速度
	this.up = ["url(img/up_bird0.png","url(img/up_bird1.png"];
	this.down = ["url(img/down_bird0.png","url(img/down_bird1.png"];
	this.i = 0;
	this.j = 0;
}

bird.prototype.showBird = function(parentObj) { //插入小鸟的div
	this.div.style.width = "40px";
	this.div.style.height = "28px";
	this.div.style.background = "url(img/bird0.png) no-repeat"
	this.div.style.position = "absolute"
	this.div.style.left = "50px";
	this.div.style.top = "200px";
	this.div.style.zIndex = "1";
	parentObj.appendChild(this.div);
}


bird.prototype.flyBird = function() {
	this.flyTimer = setInterval(this.fly.bind(this),40);
}

bird.prototype.fly = function() {//小鸟飞行下落
	this.div.style.top = this.div.offsetTop + this.fallSpeed++ + "px";
	if(this.div.offsetTop < 0) {this.fallSpeed = 2;}//用于控制小鸟不要飞出界面
	if(this.div.offsetTop >= 395) {
		this.fallSpeed = 0;
		clearInterval(this.flyTimer);
		clearInterval(this.wingTimer);
	}
	if(this.fallSpeed > 12) {this.fallSpeed = 12;}//下落速动控制在12以内
}

bird.prototype.wingWave = function() {//鸟翅膀的速度
	this.wingTimer = setInterval(this.wing.bind(this),120);//逐帧动画，煽动翅膀
}

bird.prototype.wing = function() {//翅膀动画

	if(this.fallSpeed > 0) {
		this.div.style.backgroundImage = this.down[this.i++];
		if(this.i==2) this.i=0;
	}else if(this.fallSpeed < 0) {
		this.div.style.backgroundImage = this.up[this.j++];
		if(this.j==2) this.j=0;
	}
}
