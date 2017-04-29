function gameManager() {

}

gameManager.prototype.randomNum = function(min,max) {
  return parseInt(Math.random() * (max - min + 1) + min);
}

gameManager.prototype.rectangleCrashExamine = function(obj1,obj2) {
  var objLeft_1 = obj1.offsetLeft;
  var objWidth_1 = obj1.offsetLeft + obj1.offsetWidth;
  var objTop_1 = obj1.offsetTop;
  var objHeight_1 = obj1.offsetTop + obj1.offsetHeight;

  var objLeft_2 = obj2.offsetLeft;
  var objWidth_2 = obj2.offsetLeft + obj2.offsetWidth;
  var objTop_2 = obj2.offsetTop;
  var objHeight_2 = obj2.offsetTop + obj2.offsetHeight;

  if(!(objLeft_1 > objWidth_2 || objWidth_1 < objLeft_2 || objTop_1 > objHeight_2 || objHeight_1 < objTop_2)) {
    return true;
  }
  return false;
}
