"use strict";

;$(function(){

	// clickable anons-block
	$("section.anons").on("click", "article", function(){
		window.location = $(this).find("a").attr('href');
	});
	// clickable news-block
	$("section.news").on("click", ".news", function(){
		window.location = $(this).find("a").attr('href');
	});
	// clickable projects-block
	$("section.projects").on("click", "article", function(){
		window.location = $(this).find("a").attr('href');
	});
	// clickable manage-block
	$("section.manage.block").on("click", "article", function(){
		window.location = $(this).find("a").attr('href');
	});


	// select lang
	$('.navbar-default .lang').on('click', 'a', function(){
		$('.navbar-default.visible-xs .lang a.active').removeClass('active');
		$(this).addClass('active');
	});

	// menu
	$('.navbar-default .navbar-nav li').on('click', '> a', function(){
		//$(this).closest('li:not(".active")').addClass('active');
		//$(this).closest('li.active').removeClass('active');
		if( $(this).closest('li').hasClass('active') || $(this).closest('li').hasClass('open')  ) {
			$('.navbar-default .navbar-nav li.active').removeClass('active');
			$(this).closest('li').removeClass('active')
		} else {
			$('.navbar-default .navbar-nav li.active').removeClass('active');
			$(this).closest('li').addClass('active');
		}
		//this.closest('li').classList.toggle('active');
		//$('.navbar-default .navbar-nav li.active').removeClass('active');
		//$(this).closest('.navbar-nav > .active').toggleClass('active');
		$(this).closest('li').siblings('li.open').removeClass('open').find('.open').removeClass('open');
		//$(this).closest('li').siblings('li.active').removeClass('active').find('.open').removeClass('active');
	});
	$('.navbar-default .navbar-nav li').on('click', '> a', function(){
		if(this.nextElementSibling.tagName === 'UL'){
			this.closest('li').classList.toggle('open');
			return false;
		}
	});

	// polling
	var poll = document.querySelector('.pollBlock .poll');
	if(poll) {
		var pollString = document.querySelectorAll('.pollBlock .poll table tr');
		var pollMaxValue = 0;
		[].forEach.call(pollString, function(elem){
			if( parseInt( elem.getAttribute( "data-persent" )) > pollMaxValue ) {
				pollMaxValue = parseInt( elem.getAttribute( "data-persent" ));
			}
			elem.children[1].children[0].style.width = elem.getAttribute( "data-persent" );
			elem.children[0].innerText = elem.getAttribute( "data-persent" );
		});
		document.querySelector('.pollBlock .poll table tr[data-persent="52%"]').children[1].children[0].style.backgroundColor = "#ffd180";
		//if(parseInt(getComputedStyle(poll).height) >= 260) {
		//	poll.style.height = "260px";
		//	poll.nextElementSibling.style.display = 'block';
		//};

		// search line
	}

	var searchfield = $('.navbar .searchField input.form-control');
	$('.navbar .search').click(function(){
		console.log( 'click' );
		$('.navbar .searchField').animate({
			left: '0px'
		}, 500);
		return false;
	});
	$('.container').click(function(evt){
		if( ($('.navbar .searchField').css('display') === 'block')) {
			if(evt.target != searchfield[0]) {
				$('.navbar .searchField').animate({
					left: '100%'
				}, 500);
			}
		}
	})

});