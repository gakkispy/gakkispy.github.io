


var searchUrl = function(val) {
	return "https://zh.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + val + "&limit=15";
}

var requestContent = [],
	string = "";
	addToHtml = function(title,keyword,url) {
		string = "<div class = 'result'><a href = '" + url + "' target = '_blank'><h1>" + title + "</h1><p>" + keyword + "</p></a></div>";
		$(".results").append(string);
	}
$("document").ready(function () {
	$("#search-btn").on("click",function() {
		$(".result").empty();
		var searchContent =""; 
		searchContent = $("#search-box").val();
	$.ajax({
		url:searchUrl(searchContent),
		dataType:"jsonp",
		success:function (data) {
			if (data[1].length !== 0)  {
				for (var i = 0; i < data[1].length; i++) {
                addToHtml(data[1][i],data[2][i],data[3][i]);
			}
		}
	}
	});
	});
	$("#search-box").keypress(function(event) {
		if(event.keyCode == "13") {
			$("#search-btn").trigger("click");
		}
	});
	$("#random-btn").on("click",function () {
		window.open("http://en.wikipedia.org/wiki/Special:Random");
	});
	$("#clear-btn").on("click",function () {
		$(".results").empty();
		$("#search-box").val("");
	});
});