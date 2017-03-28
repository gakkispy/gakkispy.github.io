//键盘事件绑定
//function keyDown(keycode) {
//	var map = {
//	    38: 0, // Up
//	    39: 1, // Right
//	    40: 2, // Down
//	    37: 3, // Left
//	    75: 0, // Vim up
//	    76: 1, // Vim right
//	    74: 2, // Vim down
//	    72: 3, // Vim left
//	    87: 0, // W
//	    68: 1, // D
//	    83: 2, // S
//	    65: 3  // A
//	};
//	return map[keycode];
//}

function inputManager() {
	$(document).on('keydown',(event) =>{
		console.log(event);
	  	var map = {
		    38: 0, // Up
		    39: 1, // Right
		    40: 2, // Down
		    37: 3, // Left
		    75: 0, // Vim up
		    76: 1, // Vim right
		    74: 2, // Vim down
		    72: 3, // Vim left
		    87: 0, // W
		    68: 1, // D
		    83: 2, // S
		    65: 3  // A
	  	};
	  	var mapped = map[event.keyCode];
	  	var modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
	  	if(!modifiers) {
	  		if(mapped !== undefined && $('.game-won').length == 0 && $('.game-over').length == 0){
	  			event.preventDefault();
	  			move(mapped);
	  		}
	  	}
	  	
	  	//R键重启游戏
	  	if(!modifiers && event.keyCode === 82) {
	  		event.preventDefault();
	  		clearGameState();
	  		game2048();
	  	}	
 	});
 	
 	//重启游戏按键绑定
 	$('#newGameButton,#retry-button').on('click',()=>{
			clearGameState();
			game2048();
	});
	
	//触摸
	
	var eventTouchstart,eventTouchmove,eventTouchend;
	
	if (window.navigator.msPointerEnabled) {
    //兼容IE10，此为IE10特有API，已经废弃
    // 兼容的是IE10下的触摸事件
    	eventTouchstart    = "MSPointerDown";
    	eventTouchmove     = "MSPointerMove";
    	eventTouchend      = "MSPointerUp";
  	} else {
    //绑定触摸事件，touchstart和touchend类似mousedown和mouseup，表示触摸事件中的按下和抬起
    // touchmove是触摸事件独有的，即触摸拖动
	    eventTouchstart    = "touchstart";
	    eventTouchmove     = "touchmove";
	    eventTouchend      = "touchend";
  	}
	
	var touchStartClientX,touchStartClientY;
	var gamerContainer  = document.getElementsByClassName('tile-container')[0];
	console.log(eventTouchend,eventTouchmove,eventTouchstart);
	
	//触摸滑动开始
	gamerContainer.addEventListener(eventTouchstart,(event)=>{
		//兼容IE10，无视多指触摸
		
		if((!window.navigator.msPointerEnabled && event.touches.length >1) || event.targetTouches.length >1) {
			return;
		}
		
		//获取滑动的起点坐标
		if(window.navigator.msPointerEnabled) {
			touchStartClientX = event.pageX;
			touchStartClientY = event.pageY;
		}else {
			touchStartClientX = event.touches[0].clientX;
			touchStartClientY = event.touches[0].clientY;
		}
		
		event.preventDefault();
	});
	
	
	//阻止拖动
	gamerContainer.addEventListener(eventTouchmove,(event)=>{
		event.preventDefault();
	});
	
	//触摸滑动结束
	
	gamerContainer.addEventListener(eventTouchend,(event)=>{
		if((!window.navigator.msPointerEnabled && event.touches.length>0) || event.targetTouches.length >0) {
			return;//如果触摸结束时还有手指停留在屏幕,无视它
		}
		
		//获取滑动的终点坐标
		var touchEndClientX,touchEndClientY;
		
		if(window.navigator.msPointerEnabled) {
			touchEndClientX = event.pageX;
			touchEndClientY = event.pageY;
		}else {
			touchEndClientX = event.changedTouches[0].clientX;
			touchEndClientY = event.changedTouches[0].clientY;
		}
		
		
		//判断
		var dx = touchEndClientX - touchStartClientX;
		var absDx = Math.abs(dx);
		
		var dy = touchEndClientY - touchStartClientY;
		var absDy = Math.abs(dy);
		
		if(Math.max(absDx,absDy) >10) {
			var direction = absDx > absDy ? (dx > 0 ? 1: 3) : (dy > 0 ? 2 : 0);
			move(direction);
		}
			
	});
 
};