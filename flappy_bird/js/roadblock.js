function roadBlock() {
	this.gameManager = new gameManager;
	this.upDivWrap = null;
	this.downDivWrap = null;
	this.downHeight = this.gameManager.randomNum(0,150);
	this.gapHeight = this.gameManager.randomNum(150,160);
	this.upHeight = 312 - this.downHeight - this.gapHeight;
}

roadBlock.prototype.createDiv = function(url,height,positionType,left,top) {
	var newDiv = document.createElement("div");
	newDiv.style.width  ="62px";
	newDiv.style.height = height ;
	newDiv.style.position = positionType;
	newDiv.style.left  =left;
	newDiv.style.top = top;
	newDiv.style.backgroundImage  =url;
	return newDiv;
}

roadBlock.prototype.createBlock = function() {
	var upDiv1  =this.createDiv("url(img/up_mod.png)",this.upHeight+"px");
	var upDiv2 = this.createDiv("url(img/up_pipe.png)","60px");
	this.upDivWrap = this.createDiv(null,null,"absolute","450px");
	this.upDivWrap.appendChild(upDiv1);
	this.upDivWrap.appendChild(upDiv2);//生成上部管道

	var downDiv1 = this.createDiv("url(img/down_mod.png)",this.downHeight + "px");
	var downDiv2 = this.createDiv("url(img/down_pipe.png)","60px");
	this.downDivWrap = this.createDiv(null,null,"absolute","450px",363 - this.downHeight + "px");
	this.downDivWrap.appendChild(downDiv2);
	this.downDivWrap.appendChild(downDiv1);//生成下部管道

	jsWrapBg.appendChild(this.upDivWrap);
	jsWrapBg.appendChild(this.downDivWrap);
}

roadBlock.prototype.moveBlock = function() {
	this.upDivWrap.style.left = this.upDivWrap.offsetLeft - 3 +"px";
	this.downDivWrap.style.left = this.downDivWrap.offsetLeft - 3 + "px";
}
