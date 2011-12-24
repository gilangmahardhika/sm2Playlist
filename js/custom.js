/*
========= SoundManager2 plugin
========= I Hope it can plays custom playlist
========= It Has control buttons, volume control, progress bar control, repeat control,
*/


$(document).ready(function() {
	
	var lagu = null;	
	// Click on a title
	$("#playlist li a").click(function() {
		if($(this).parent().attr("class") == "active")
		{
			soundManager.pause('myLagu');
			$(this).parent().addClass("paused");
			$(this).parent().removeClass("active");
			$("a.controlplay").show();
			$("a.controlpause").hide();
		}
		else {
			if($(this).parent().attr("class") == "paused")
			{
				soundManager.play('myLagu');
				$(this).parent().removeClass("paused");
				$(this).parent().addClass("active");
				$("a.controlplay").hide();
				$("a.controlpause").show();
			}
			else
			{
				soundManager.destroySound('myLagu');
				$("#playlist li.active").addClass("ready");
				$("#playlist li.active").removeClass("active");
				$("#playlist a").removeClass("playing");
				lagu = soundManager.createSound({
					id:'myLagu',
					url: $(this).attr("name"),
					volume:$("#amount").html(),
					onfinish: function() {
						if($("#playlist li").last().attr("class") == "active")
						{
							$("#playlist li").first().children().click();
						} else {
							$("#playlist li.active").next().children().click();
						}
					},
					//Duration
					whileplaying: function(){
						//Playing time
						var nSec = Math.floor(lagu.position/1000);
						var min = Math.floor(nSec/60);
						var sec = nSec-(min*60);

						//Total Time
						var totalDetik = Math.floor(lagu.duration/1000);
						var totalMenit = Math.floor(totalDetik/60);
						var hasilDetik = totalDetik-(totalMenit*60);
						/*
						var tMin = Math.floor(tSec/60);
						var secT = tSec-(tMin*60);
						*/
						var detik = sec<10?'0'+sec:sec;
						var totalLagu = hasilDetik<10?'0'+hasilDetik:hasilDetik;

						var putar = min+":"+detik+" / "+totalMenit+":"+totalLagu;
						$(".duration").html(putar);
						
						
						// Progress
						var progress = lagu.position / lagu.duration * 100;
						var perV = progress+"%";
						$(".progress").css("width",perV);
						
					}
				
				}); 
				lagu.play();
				$("a.controlplay").hide();
				$("a.controlstop").show();
				$("a.controlpause").show();
				$(this).addClass("playing");
				$(this).parent().removeClass("ready");
				$(this).parent().addClass("active");
				$(this).removeClass("stop");
				document.title = "Now Playing - "+$(this).html();
				
				// Callback For increase total play
				
			}
		}
	});
	

	$( "#slider-vertical" ).slider({
		orientation: "horizontal",
		range: "min",
		min: 0,
		max: 100,
		value: 75,
		slide: function( event, ui ) {
			$( "#amount" ).html( ui.value );
			lagu.unmute();
			lagu.setVolume(ui.value)
		}
	});
	$( "#amount" ).html( $( "#slider-vertical" ).slider( "value" ) );
	
	// Pause
	$("a.controlpause").click(function() {
		lagu.pause();
		$("a.controlplay").show();
		$(this).hide();
	});
	
	
	// play
	$("a.controlplay").click(function() {
		if(lagu == null)
		{
			$("#playlist li").first().children().click();
			$("a.controlstop").show();
		}
		else
		{
			soundManager.play('myLagu');
			$("a.controlpause").show();
			$("a.controlstop").show();
			$(this).hide();
		}		
	});
	
	// stop
	$("a.controlstop").click(function() {
		soundManager.stop('myLagu');
		$("a.controlplay").show();
		$(this).hide();
	});
	
	//next
	$("a.next").click(function() {
		$("#playlist li.active").next().children().click();
	});
	
	//prev
	$("a.prev").click(function() {
		$("#playlist li.active").prev().children().click();
	});
	
	// mute
	$("a.mute").click(function() {
		
		lagu.toggleMute();
	});
});
