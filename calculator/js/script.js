//移动端无动画



var operators = ["+","-","×", "÷"],
	keys = document.getElementsByClassName("btn"),
	memory = 0,
	answer = "",
	content = false;//用于判断是否可以退格或添加数值

Array.prototype.forEach.call(keys,function(val) {
	val.onclick = function(e) {

		var display = document.getElementById("answer"),
			result = display.innerHTML,
			keyVal = this.innerHTML,
			keyName = this.className;
			//console.log(keyVal);
			//console.log(this.className);

			switch (keyName) {
				case "btn number" :
				if (result == "0") {
					display.innerHTML = "";
				}


				//console.log(dot.test(result));
				//防止出现多个小数点
				var dot =  (/[\+,\-,\×,\÷]/).test(result) ? result.split(/[\+,\-,\×,\÷]/).pop() : result;
				if((keyVal !== "." || !(/\./).test(dot))&& !content) {
					display.innerHTML += keyVal;
				}

				break;

				case "btn math" :
				switch (keyVal) {
					case "=" :
					//判断最后一位是否为运算符
					var opera = /\D$/;
					if(!opera.test(result)) {
						//将运算符替换为js可识别的符码
						result=result.replace(/×/,"*").replace(/÷/,"/");
						console.log(result);
						//计算并消除浮点数误差，同时去除小数点后多余位数
						display.innerHTML = parseFloat(eval(result).toFixed(10));
						answer = (display.innerHTML).length;
						console.log(answer)
						content = result =="0" ? false : true;
					}

					break;

					case "DEL" :
					console.log(result.length);
					console.log(answer);
					if((!content && result !== "0") && result.length > answer){
						display.innerHTML = result.slice(0,-1);
					}
					break;

					case "AC" :
					display.innerHTML = "0";
					content = false;
					break;

					default :
					//判断最后一位不为运算符时才能添加运算符
					if(operators.indexOf(result[result.length-1]) == -1) {
						display.innerHTML += keyVal;
						content = false;
					}
					break;
				}

				case "btn memory" :
				switch (keyVal) {
					case "mc" :
					memory = 0;
					break;

					case "m+" :

					var opera = /\D$/;
					if(!opera.test(result)) {
						memory = parseFloat(eval(memory + "+" + result).toFixed(10));
					}
					content = true;
					break;

					case "m-" :
					var opera = /\D$/;
					if(!opera.test(result)) {
						memory = parseFloat(eval(memory + "-" + result).toFixed(10));
					}
					content = true;
					break;

					case "mr" :
					display.innerHTML = memory;
					content = true;
					break;
				}
				break;
			}
	}

});

//绑定click动画

	Array.prototype.forEach.call(keys , function(val) {
		val.onmousedown = function() {
			var keyName = this.className;
			switch (keyName) {
				case "btn number" :
				this.className = "btn number numberClick";
				break;

				case "btn math" :
				if (this.innerHTML !== "="){
					console.log(this.innerHTML);
					this.className = "btn math mathClick";
				}
				break;

				case "btn memory" :
				this.className = "btn memory memoryClick"
				break;
			}
		}
		val.onmouseup = function() {
			var keyName = this.className;
			switch (keyName) {
				case "btn number numberClick" :
				this.className = "btn number";
				break;

				case "btn math mathClick" :
				this.className = "btn math";
				break;

				case "btn memory memoryClick" :
				this.className = "btn memory"
				break;
			}
		}
	});

	//对equl_进行单独修改

	var equl = document.getElementById("equl");
	equl.onmousedown = function() {
		equl.style.background = "url('http://imglf0.nosdn.127.net/img/dis1c3pkblY3UWxkMk5seUV2ZTVrSDFIWWlpTmFmbWQ1UzFuM001cDBpdlVhSUV2b28xY2tBPT0.png?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg') repeat scroll top left";
	}
	equl.onmouseup = function () {
		equl.style.background = "url('http://imglf.nosdn.127.net/img/dis1c3pkblY3UWxkMk5seUV2ZTVrUHhWREdTeDNvekVMQWt4YVRvSEFHOWs3QnoyTi9yREZBPT0.png?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg') repeat scroll top left";
	}
