function scoreManager(score,i,j,x) {
  var jsNum1 = document.getElementById("num" + i);
  var jsNum2 = document.getElementById("num" + j);
  var jsNum3 = document.getElementById("num" + x);
  switch(true) {
    case score < 10 :
    jsNum1.style.display = "block";
    jsNum1.style.backgroundImage = "url(img/" + score + ".jpg)";
    break;
    case score < 100:
    jsNum1.style.display = "block";
    jsNum2.style.display = "block";
    jsNum1.style.backgroundImage = "url(img/" + parseInt(score/10) + ".jpg)";
    jsNum2.style.backgroundImage = "url(img/" + score%10 + ".jpg)";
    break;
    case score < 1000:
    jsNum1.style.display = "block";
    jsNum2.style.display = "block";
    jsNum3.style.display = "block";
    jsNum1.style.backgroundImage = "url(img/" + parseInt(score/100) + ".jpg)";
    jsNum2.style.backgroundImage = "url(img/" + parseInt(score/10)%10 + ".jpg)";
    jsNum3.style.backgroundImage = "url(img/" + score%10 + ".jpg)";
  }
  return score;
}
