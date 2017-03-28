var clock = null;
var state = 0,speed = 4;


function init (){
	
	$("main").onclick = function(ev) {
		judge(ev);
	}
	
	clock = window.setInterval("move()",30);
}


function judge (ev) {
	if(ev.target.className.indexOf('active') == -1) {
		ev.target.className = "cell red";
		fail();
//		pass;
	}else {
		ev.target.className = "cell";
		ev.target.parentNode.pass= 1;
		score();
	}
}


function fail () {
	clearInterval(clock);
	confirm("你的最终得分为" + parseInt($("score").innerHTML));
}


function createDiv(className) {
	var div = document.createElement("div");
	div.className = className;
	return div;
}


function createRow() {
	var con = $("con"),
	row = createDiv("row"),
	arr = createCell();
	
	con.insertBefore(row,con.firstChild);
	
	for (var i=0;i<4;i++) {
		row.appendChild(createDiv(arr[i]));
	}
//	
//	if (con.firstChild == null) {
//		con.appendChild(row);
//	}else {
		
//	}
}

function $(id) {
	return document.getElementById(id);
}


function createCell() {
	var temp = ["cell","cell","cell","cell",],
	i = Math.floor(Math.random()*4);
	temp[i] = "cell active";
	return temp;
}


function move() {
	var con = $("con"),
	rows = con.getElementsByClassName("row"),
	top = parseInt(window.getComputedStyle(con)["top"]);
	
	if(speed + top >0) {
		top = 0;
	}else {
		top += speed;
	}
	
	con.style.top = top +"px";
	
	if(top == 0) {
		createRow();
		con.style.top = "-100px";
		delRow();
	}else if (top == (-100 +speed)) {
		
		console.log(rows.length);
		if((rows.length == 5) && (rows[rows.length-1].pass !== 1)) {
			fail();
		}
	}
}

function speedup() {
	speed += 2;
	if(speed == 20) {
		alert("你超神了");
	}
}


function delRow() {
	var con = $("con");
	var row = con.getElementsByClassName("row");
	if(row.length >5 ) {
		
		con.removeChild(row[row.length-1]);
	
	}
}


function score() {
	var newScore = parseInt($("score").innerHTML) +1;
	$("score").innerHTML = newScore;
	if(newScore %10 == 0) {
		speedup();
	}
}

window.onload = function() {
	$("button") .onclick = function() {
		init();
	}
}













