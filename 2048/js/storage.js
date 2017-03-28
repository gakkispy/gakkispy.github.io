function localStorageManager() {
	if(!localStorageSupported()){
		$('p:has(#best)').remove();
	}	
}


// 测试浏览器是否支持storage存储，成功返回true，否则为false
function localStorageSupported() {
	var testKey = 'test';
	var storage = window.localStorage;
	
  	try {
    	storage.setItem(testKey, "1");
    	storage.removeItem(testKey);
    	return true;
  	} catch (error) {
    	return false;
  	}
}


//最高分的获取与存储
function getBestScore() {
	return window.localStorage.getItem('bestScore') || 0;
}

function setBestScore(best) {
	window.localStorage.setItem('bestScore',best);
}


//游戏状态的获取与存储
function getGameState () {
	var stateJSON = window.localStorage.getItem('gameState');
	return stateJSON ? JSON.parse(stateJSON) : null ;
}

function setGameState(gameState) {
	window.localStorage.setItem('gameState',JSON.stringify(gameState));
}

function clearGameState() {
	window.localStorage.removeItem('gameState');
}
