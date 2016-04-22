"use strict";

;$(function(){

	// clickable anons-block
	$("section").on("click", "article", function(){
		window.location = $(this).find("a").attr('href');
	});


	// select lang
	$('.navbar-default.visible-xs .lang').on('click', 'a', function(){
		$('.navbar-default.visible-xs .lang a.active').removeClass('active');
		$(this).addClass('active');
	});

	// menu
	$('.navbar-default.visible-xs .navbar-nav li').on('click', '> a', function(){
		$('.navbar-default.visible-xs .navbar-nav li.active').removeClass('active');
		this.closest('li').classList.toggle('active');
	});
	$('.navbar-default.visible-xs .navbar-nav > li').on('click', '> a', function(){
		if(this.nextElementSibling.tagName === 'UL'){
			this.closest('li').classList.toggle('open');
			return false;
		}
	});

	// polling
	var poll = document.querySelector('.pollBlock .poll');

	if(parseInt(getComputedStyle(poll).height) >= 260) {
		poll.style.height = "260px";
		poll.nextElementSibling.style.display = 'block';
	};

	// search line
	var searchfield = $('.navbar-desktop .searchField input.form-control');
	$('.navbar.navbar-desktop .search').click(function(){
		$('.navbar-desktop .searchField').animate({
			left: '0px'
		}, 500);
		return false;
	});
	$('.container').click(function(evt){
		if( ($('.navbar-desktop .searchField').css('display') === 'block')) {
			if(evt.target != searchfield[0]) {
				$('.navbar-desktop .searchField').animate({
					left: '100%'
				}, 500);
			}
		}
	})

});