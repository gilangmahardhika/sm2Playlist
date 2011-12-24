$(document).ready(function() {

	// notification
    $("#notification").fadeIn("slow");
    $(".dismiss").click(function(){
		$("#notification").fadeOut("slow");
    });
	
	// most tabs
	$(".most-tabs-content").hide();
	$(".most-tabs-nav li:first").addClass("active").show(); 
	$(".most-tabs-content:first").show(); 

	$(".most-tabs-nav li").click(function() {	
		$(".most-tabs-nav li").removeClass("active");
		$(this).addClass("active"); 
		$(".most-tabs-content").hide(); 

		var activeTab = $(this).find("a").attr("href") 
		$(activeTab).show(); 
		return false;
	});

	// Custom form
	$('.custom-select').JSizedFormSelect();
	$('.custom-check').JSizedFormCheckbox();

});
