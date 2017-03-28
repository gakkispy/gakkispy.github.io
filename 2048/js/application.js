//$(document).on('keydown',(event) =>{
//	if($('.game-won').length == 0 && $('.game-over').length == 0)){
//		var direction = keyDown(event.keyCode);
//		if(direction !=null) {
//			move(direction);
//		}
//		
//	}
//	
//});

$(window).load(()=>{
	inputManager();
	game2048();
});


