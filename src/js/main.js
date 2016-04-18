"use strict";

;$(function(){

	// clickable anons-block
	$("section").on("click", "article", function(){
		window.location = $(this).find("a").attr('href');
	});

});