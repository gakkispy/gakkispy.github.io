var urlStreams = "https://api.twitch.tv/kraken/streams/",
	//获取.stream内的数据
	urlChannel = "https://api.twitch.tv/kraken/channels/",
	//获取.channel下的数据
	callback = "?callback=?&client_id=j15r3tcqv1ies1opd4ve46kq74106un",
	channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","brunofin","comster404","test_channel","cretetion","sheevergaming","TR7K","OgamingSC2","ESL_SC2"];
	channelsData = [],
	streamStatus = "",
	refreshRate = 3000000,
	active = "all",
	




$(document).ready(function() {
	function getChannel () {
	$(".results").empty();
	function loading() {
	$(".results").html("<div class='loding'><i class='fa fa-spinner fa-pulse glyphicon-fast-forwardx fa-fw'></i><span class='loding-text'>Loding...</span></div>");
}
	//loading();
	function makeUrl(type,name) {
	return "https://api.twitch.tv/kraken/" + type + "/" + name + '?callback=?&client_id=j15r3tcqv1ies1opd4ve46kq74106un';
}
	channels.forEach(function(val) {
		var url = url
		$.getJSON(makeUrl("streams",val),function(data) {
			var game,status,
			viewers = "",
			preview = "";
				
			if (data.stream === null) {
				game = "Offline";
				status ="offline";
				viewers = "";
				preview = "";	
			}else if (data.stream === undefined) {
				game = "Account Closed";
				status = "offline";
				viewers = "";
				preview = "";
			}else {
				game = data.stream.game;
				status = "online";
				viewers = data.stream.viewers ;
				preview = data.stream.preview.large ;
			}
			$.getJSON(makeUrl("channels",val),function(data) {
				var logo = data.logo != null ? data.logo :"http://2am.ninja/twitch/img/GlitchIcon_WhiteonPurple.png",
					name = data.display_name != null ? data.display_name : val,
					description = (status == "online") ? data.status : "",
					html  = '<div class="col-xs-4 room ' + 
					status + '"><a href="' +
					data.url + '" target="_blank" id="' +
					val + '"><img src="' +
					logo + '" class="logo"><h1 class="name" id="' +
					val + '">' +
					name + '</h1><p class="despt">' +
					description + '</p><span class="game">' +
					game + '&nbsp;&nbsp;<i class="glyphicon glyphicon-eye-open" aria-hidden="true"></i>' + 
					viewers + '</span></a></div>'
					//$(".results").empty();
					status === "online" ? $(".results").prepend(html) : $(".results").append(html);
					//$(".results").append(html);
					if (preview != "") {						
						$("#" + val).css("background","url(" + preview + ") no-repeat left top");
					}
					
//					$("#fcc").prepend( "<img src='" + logo +"'>");
//					$("#fcc").attr("href",data.url).css({display:"inline-block",background:"url(" + preview + ") no-repeat"});
//					$(".viewers").html(viewers);
//					$(".name").html(name + game);
//					$(".despt").html(description);
			});
		});
	});
}
getChannel();

	$(".nav>#all").on("click",function(e) {
		if(!$(this).hasClass("active")) {
			$(".nav>.active").removeClass("active");
			$(this).addClass("active");
			$(".offline,.online").fadeIn(500);
			
		}
	});
	$(".nav>#online").on("click",function(e) {
		if(!$(this).hasClass("active")) {
			$(".nav>.active").removeClass("active");
			$(this).addClass("active");
			$(".offline").fadeOut("50");
			$(".online").fadeIn("50");
		}
	});	
	$(".nav>#offline").on("click",function(e) {
		if(!$(this).hasClass("active")) {
			$(".nav>.active").removeClass("active");
			$(this).addClass("active");
			$(".offline").fadeIn(500);
			$(".online").fadeOut(500);
		}
	});	
	$("#search").keyup(function(e) {
		var s_text = $(this).val().toLowerCase();
		var	s_results = channels.filter(function(val) {
				return (val.toLowerCase().indexOf(s_text) != -1);
			});
			console.log(s_results);
			$(".results>.room").fadeOut(0);
			s_results.forEach(function(val) {
				$(".room:has(#" + val + ")").fadeIn(0);
			})
			
			
	});
});

//function getData() {
//	$(".results").empty();
//	loading();
//	channelsData = [];
//	channels.forEach(function(val) {
//		var url = urlStreams + val + callback;
//		$.getJSON(url,function(data,textStatus,jqXHR) {
//			var dataCopy = {};
//			dataCopy.name = val;
//			dataCopy.status = data.status;
//			dataCopy.streaming = (data.stream !== null);
//			if(dataCopy.streaming) {
//				dataCopy.viewers = data.stream.viewers;
//				dataCopy.preview = data.stream.preview.large;
//			}else {
//				dataCopy.viewers = null;
//				dataCopy.preview = null;
//			}
//			
//			$.getJSON(url,function(data,textStatus,jqXHR) {
//				dataCopy.logo = data.logo;
//				dataCopy.url =null;
//				if(data.status !== 422 && data.status !== 404) {
//					dataCopy.info = data.status;
//					dataCopy.displayName = data.display_name;
//					dataCopy.game = data.game;
//					if ( dataCopy.preview == null) {
//						if(data.profile_banner !== null) {
//							dataCopy.preview = data.profile_banner;
//						}else  {
//							(data.video_banner === null) ? (dataCopy.preview = "twitch") : (dataCopy.preview = data.video_banner);
//						}
//					}
//					dataCopy.url = "https;//www.twitch.tv/" + data.name;
//				}
//				channelsData.push(dataCopy);
//				
//				if (channelsData.length == channels.length) {
//					$(".results").empty();
//					channelsData.sort(sortList);
//					channelsData.forEach(function(val) {
//						$(".nav>a").removeClass("active");
//						$("#all").addClass("active");
//						showChannel();
//					});
//				}
//			});
//		});
//	});
//}
//
//function showChannel(channel) {
//	var html = "";
//	html += "<div class='col-xs-2'><a href=" + channel.url + "' target='_blank'><div class='infocard' id='infocard_'" + channel.name +"'>";
//	html += "<img clas='logo' src='" + channel.logo + "'>";
//	if (channel.url !== null) {
//		html += "<div class='play'<i class='fa fa-play-circle-o fa-5x' aria-hidden='true'></i></div>";
//	}
//	html +="<div class='info'><ul>"
//}
