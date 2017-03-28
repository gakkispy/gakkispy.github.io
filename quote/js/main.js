function inIframe () { try { return window.self !== window.top; } catch (e) { return true; } }

var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
var currentQuote = '',
	currentAuthor = '';

function openURL(url) {
	window.open(url,"Share","width=550,height = 400, toolbar = 0,scrollbars = 1 ,loaction = 0,statusbar = 0,menubar = 0, resizable = 0");
	
}

function getQuote () {
	$.ajax({
		headers: {
			"X-Mashape-Key" :"OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
			Accept:"application/json",
			"Content-Type" :"application/x-www-form-urlencoded"
		},
		
		url:"https://andruxnet-random-famous-quotes.p.mashape.com/cat=",
		success:function (response) {
			var res = JSON.parse(response);
			currentQuote = res.quote;
			currentAuthor = res.author;
			if(inIframe()) {
				$('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
				$('#weibo-quote').attr('href', 'https://weibo.com');
    
				
			}
			
			$(".quote-text").animate({
				opacity:0
			},500,
			function() {
				$(this).animate({
					opacityl:1
				},500);
				$("#text").text(res.quote);
			});
			$(".quote-author").animate({
				opacity:0
			},500,
			function() {
				$(this).animate({
					opacity:1
				},500);
				$("#author").html(res.author);
			});
			
			var color = Math.floor(Math.random()*colors.length);
			$(".submit").animate({
				backgroundColor:colors[color]
			},1000);
			console.log($("submit").css('background-color'));
			$(".button--wrapper").animate({
				backgroundColor:colors[color]
			},1000);
		}
		
	});
}

$(document).ready(function () {
	getQuote();
	$(".submit").on("click",getQuote);
	$("#tweet-quote").on("click",function(){
		if(!inIframe()) {
			openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
		}
	});
	$("#weibo-quote").on('click', function() {
    if(!inIframe()) {
      openURL(' https://weibo.com');
    }
	});
});
