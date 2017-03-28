
var timeManager = {
	workingTime:localStorage.workingTime,
	breakTime : localStorage.breakTime,
	breakTime_long : localStorage.breakTime_long
}



var circle = document.getElementById("circle"),
	ctx = circle.getContext("2d"),
	time_rate = timeManager.workingTime*4 + timeManager.breakTime*3 + timeManager.breakTime_long*1,
	fullCir = Math.PI*2,
	quart = Math.PI/2,
	imd = null,
	t = 0,
	content = 0,
	restTime = 0,
	rate_width = 0,
	timer_c=timer_b=timer_w=timer_m  = timer_s  = timer_r= null,
	judge_a,judge_c = false,
	workColor = "mediumvioletred",
	breakColor = "#03a9f4";


//Canvas
	
ctx.beginPath();
ctx.lineCap = "round";
ctx.closePath();
ctx.fill();
ctx.lineWidth = 6.0;

imd = ctx.getImageData(0,0,414,414);
function draw(current,color) {
	ctx.strokeStyle = color;
	ctx.putImageData(imd,0,0);
	ctx.beginPath();
	ctx.arc(206,206,203,(-quart),(fullCir*(1-current)-quart),false);
	ctx.stroke();
}

function loadCanvas(color,timer) {
	if (t<1) {
		draw(t,color);
		t +=0.001;
	}else {
		circle.className = "hide";
		clearInterval(timer);
		judge_a = (!judge_a);
		t=0;
	}
}

//倒计时




function countDown(timer)
{   
	if(restTime>=0)
	{   
		minutes = Math.floor(restTime/60);   
		seconds = Math.floor(restTime%60);   
		msg = (minutes <10 ? "0" : "") + minutes + ":" +(seconds < 10 ? + "0" : "") + seconds;   
		document.getElementById("time").innerHTML=msg;    
		--restTime;   
	}   
	else
	{   
		clearInterval(timer); 
		timer = null;
	}   
//	console.log(restTime);
}   





//主体圆环动画设置(耦合太深了)


function startAnimate() {
	var btn_start = document.getElementById("start"),
		btn_pause = document.getElementById("pause"),
		time_text = document.getElementById("time"),
		btn_refresh = document.getElementsByClassName("fa-refresh"),
		btn_end_bg = document.getElementsByClassName("fa-step-forward"),
		btn_pause_bg = document.getElementsByClassName("fa-pause"),
		main = document.getElementsByClassName("main"),
		audio = document.getElementById("music");
	
	btn_start.onclick = function () {
		var time_run = judge_a ? (content == 7 ? timeManager.breakTime_long : timeManager.breakTime) : timeManager.workingTime;
		//start按钮点击后不可操作
		btn_start.className = "hide";
		btn_pause_bg[0].className = "fa fa-pause fa-lg";
		btn_end_bg[0].className = "fa fa-step-forward fa-lg";
		//使refresh旋转
		btn_refresh[0].className = "fa fa-refresh fa-lg fa-spin";
		//重置canvas动画显示状态
		circle.className = "";
//		停止播放声音
		audio.pause();
		audio.currentTime = 0;
			timer_c = setInterval(function() {
				//判断canvas当前显示状态，利用content来判断一次计时事件的完成
				if (circle.className == "") {
//					判断当前工作/休息状态
					if (!judge_a) {
						loadCanvas(workColor,timer_w);
					}else {
						loadCanvas(breakColor,timer_b);
					}
				}else {
					clearInterval(timer_c);
					timer_c = null;
//					refresh停止旋转
					btn_refresh[0].className = "fa fa-refresh fa-lg";
//					重复播放提示音
					audio.currentTime = 0;
					audio.play();
//					重置start按钮显示状态(除最后一次)
					if(content <7) {
						btn_start.className = "";
					}
//					当前次数加1
					content +=1;
				}
		},time_run);
		
		
		btn_pause.onclick = function () {
			clearInterval(timer_c);
			btn_start.className = "";
			btn_refresh[0].className = "fa fa-refresh fa-lg";
			btn_pause_bg[0].className = "fa fa-pause fa-lg hide";
		}
	}
	

	main[0].onclick = function () {
		audio.pause();
		audio.currentTime = 0;
	}


}


//主体时间倒计时设置


function startText () {
	var time_text = document.getElementById("time"),
		btn_start = document.getElementById("start"),
		btn_pause = document.getElementById("pause");
		
		btn_start.addEventListener("click",function() {
			if(restTime <= 0) {
				var text_run = judge_a ? (content == 7 ? timeManager.breakTime_long : timeManager.breakTime) : timeManager.workingTime;
				console.log(content);
				restTime = text_run;
				countDown();
			}
//					console.log(restTime);
				timer_s = setInterval(function() {
					if (restTime >= 0 ){
						countDown(timer_m);
					}else if (restTime = -1){
						clearInterval(timer_s);
						clearInterval(timer_m);
						timer_s = timer_m = null;
						if(judge_a) {
							var natification = new Notification(" Focus",{body:"工作时间结束，希望你有所收获。"});
						}else {
							var natification = new Notification(" Focus",{body:"休息时间结束，收拾心情继续工作！"});
//							alert("休息时间结束，收拾心情继续工作！")
						}
					}
				},1000);
				
				btn_pause.addEventListener("click",function() {
					clearInterval(timer_s);
				});
		});
	
	
	
}


//进度条设置

function startRate () {
	var rate_bg = document.getElementById("rate"),
		time_innertext = document.getElementById("time").innerHTML.match(/\S/g),
		btn_start = document.getElementById("start"),
		btn_pause = document.getElementById("pause");
		
		btn_start.addEventListener("click",function() {
			rate_bg.style.animationDuration = time_rate + "s";
			rate_bg.style.animationPlayState = "running";
			timer_r = setInterval(function() {
				if(restTime == -1) {
					rate_bg.style.animationPlayState = "paused";
					clearInterval(timer_r);
					timer_r = null;
				}else {
					rate_bg.style.animationPlayState = "running";
				}
			},1000);
		});
		
		btn_pause.addEventListener("click",function () {
			rate_bg.style.animationPlayState = "paused";
			clearInterval(timer_r);
			timer_r = null;
		});
}




//end按钮

function end() {
	var rate_bg = document.getElementById("rate"),
		time_text = document.getElementById("time"),
		btn_end = document.getElementById("end"),
		btn_end_bg = document.getElementsByClassName("fa-step-forward");
	
	
	btn_end.addEventListener("click",function() {
		if(content < 8) {
			
			//隐藏canvas动画，并停止startanimate事件
			circle.className = "hide";
			//判断当前工作/休息状态
			if(!judge_a) {
				rate_width += 19.21;
				time_rate -= timeManager.workingTime;
			}else {
				if (content<7) {
					rate_width += 3.86;
					time_rate -= timeManager.breakTime;
				}else {
					rate_width += 11.57;
					time_rate -= timeManager.breakTime_long;
				}
			}
			judge_a = (!judge_a);
	//		cnavas动画计数清零
			t=0;
			restTime = -1;
	//		重置数字时钟
			clearInterval(timer_s);
			timer_s = null;
			time_text.innerHTML = "00:00";
	//		进度条显示完成状态
			rate_bg.style.width = rate_width + "%";
			rate_bg.style.animationName = "tomato_0" + (content +1);
			rate_bg.style.animationPlayState = "paused";
			btn_end_bg[0].className += " hide";
			console.log(rate_bg.style.animationName);
		}else {
			btn_end_bg[0].className += " hide";
		}
		
		
	});
}

//refresh 按钮

function refresh() {
	var rate_bg = document.getElementById("rate"),
	
		btn_fresh = document.getElementById("refresh");
	
	btn_fresh.addEventListener("click",function () {
		window.location.reload();
		localStorage.setItem("workingTime",document.getElementById("workingtime").value);
		localStorage.setItem("breakTime", document.getElementById("breaktime").value);
		localStorage.setItem("breakTime_long", document.getElementById("breaktime--long").value);
	});
	
	
}

//footbar more(利用classname获取元素会出现莫名其妙的bug)

function footMore () {
	var btn_up = document.getElementById("more__up"),
		btn_down = document.getElementById("more__down"),
		btn_more = document.getElementById("more"),
		footbar = document.getElementsByClassName("footbar");
//向上展示
	btn_up.addEventListener("click",function () {
			btn_up.className = "hide";
			btn_down.className = "fa fa-chevron-down fa-lg";
			footbar[0].style.bottom = "0";
			footbar[0].style.transition = "1s";
	});
//	向下缩回
	btn_down.addEventListener("click",function () {
		btn_down.className = "hide";
		btn_up.className = "fa fa-chevron-up fa-lg";
		footbar[0].style.bottom = "-45px";
		footbar[0].style.transition = "1s";
	});
}
	
//leftbar more

function leftMore () {
	var btn_left = document.getElementById("more__left"),
		btn_right = document.getElementById("more__right"),
		leftbar = document.getElementsByClassName("leftbar");
//		向右展示
	btn_left.addEventListener("click",function () {
		btn_left.className = "hide";
		btn_right.className = "fa fa-chevron-up fa-rotate-270 fa-lg";
		leftbar[0].style.width = "90px";
		leftbar[0].style.transition = "1s";
	});
//	向左缩回
	btn_right.addEventListener("click",function () {
		btn_right.className = "hide";
		btn_left.className = "fa fa-chevron-up fa-rotate-90 fa-lg";
		leftbar[0].style.width = "45px";
		leftbar[0].style.transition = "1s";
	});	
}



//主页按钮

function home () {
	var main = document.getElementsByClassName("main--wrap")[0],
		setting = document.getElementsByClassName("setting")[0],
		btn_home = document.getElementById("home");
		
	btn_home.onclick = function () {
		setting.className += " hide";
		main.className = "main--wrap";
//		显示canvas
		circle.className = "";
		
		//重置用户设置的事件值
	timeManager.workingTime = document.getElementById("workingtime").value;
	timeManager.breakTime = document.getElementById("breaktime").value;
	timeManager.breakTime_long = document.getElementById("breaktime--long").value;
	}
}


//设置按钮
function setting () {
	var main = document.getElementsByClassName("main--wrap")[0],
		setting = document.getElementsByClassName("setting")[0],
		btn_setting = document.getElementById("setting");
		
	btn_setting.onclick = function () {
		main.className += " hide";
		setting.className = "wrap setting";
//		隐藏canvas,避免干涉
		circle.className = "hide";
	}
}

window.addEventListener('load', function () {
	Notification.requestPermission(function (status) {
    // 这将使我们能在 Chrome/Safari 中使用 Notification.permission
    	if (Notification.permission !== status) {
      		Notification.permission = status;
    	}
  	});
	localStorage.setItem("workingTime",document.getElementById("workingtime").value);
	localStorage.setItem("breakTime", document.getElementById("breaktime").value);
	localStorage.setItem("breakTime_long", document.getElementById("breaktime--long").value);
  	refresh();
  	startAnimate();
	startText ();
	startRate();	
	end();
	footMore();
	leftMore();
	home();
	setting();
});
