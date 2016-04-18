"use strict";
/* gh-pages */

;$(function(){

	console.log("in main.js!");

	/* Calendar */
	if($.fn.datetimepicker) {
		$('.datetimepicker').datetimepicker({locale: 'ru'});
		$('.datepicker').datetimepicker({locale: 'ru', format: 'DD.MM.YYYY'});
	}

	/* Слайдеры-ползунки */
	if($.fn.slider) {
		$('#slider').slider({});
	}

	/* bxSlider */
	if($.fn.bxSlider) {
		$('.bxslider').bxSlider({
			slideWidth: 150,
			minSlides: 1,
			maxSlides: 6,
			slideMargin: 10
		});
	}

	/* fancybox */
	if($.fn.fancybox) {
		$(".fancybox").fancybox();
	}
});