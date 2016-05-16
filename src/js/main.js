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
	// clickable programs-block
	$("section.programs").on("click", "article", function(){
		window.location = $(this).find("a").attr('href');
	});


	// select lang
	$('.navbar-default .lang').on('click', 'a', function(){
		$('.navbar-default.visible-xs .lang a.active').removeClass('active');
		$(this).addClass('active');
	});

	// menu
	//$('.navbar-default .navbar-nav li').on('click', '> a', function(){
	//	//$(this).closest('li:not(".active")').addClass('active');
	//	//$(this).closest('li.active').removeClass('active');
	//	if( $(this).closest('li').hasClass('active') || $(this).closest('li').hasClass('open')  ) {
	//		$('.navbar-default .navbar-nav li.active').removeClass('active');
	//		$(this).closest('li').removeClass('active')
	//	} else {
	//		$('.navbar-default .navbar-nav li.active').removeClass('active');
	//		$(this).closest('li').addClass('active');
	//	}
	//	//this.closest('li').classList.toggle('active');
	//	//$('.navbar-default .navbar-nav li.active').removeClass('active');
	//	//$(this).closest('.navbar-nav > .active').toggleClass('active');
	//	$(this).closest('li').siblings('li.open').removeClass('open').find('.open').removeClass('open');
	//	//$(this).closest('li').siblings('li.active').removeClass('active').find('.open').removeClass('active');
	//});
	//$('.navbar-default .navbar-nav li').on('click', '> a', function(){
	//	if(this.nextElementSibling.tagName === 'UL'){
	//		this.closest('li').classList.toggle('open');
	//		return false;
	//	}
	//});

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
	}

	// fixed desktop navbar
	var navDesktop = (document.querySelector('.navbar.navbar-desktop'));
	var navOffset = navDesktop.offsetTop;
	window.onscroll = function() {
		var scrolled = window.pageYOffset || document.documentElement.scrollTop;
		if(scrolled >= navOffset) {
			navDesktop.classList.add('fixed-nav');
		} else {
			navDesktop.classList.remove('fixed-nav');
		}
	};
	// search line
	$('.navbar.navbar-default .search').click(function(){
		$('.navbar.navbar-default .searchField').animate({
			left: '0px'
		}, 50);
		document.querySelector('.navbar.navbar-default .searchField input.form-control').focus();
		return false;
	});
	$('.navbar.navbar-desktop .search').click(function(){
		$('.navbar.navbar-desktop .searchField').animate({
			left: '18px'
		}, 50);
		//console.log( document.body.clientWidth );
		//if(document.body.clientWidth >= 1190 && document.body.clientWidth < 1390) {
		//	$('.navbar.navbar-desktop .searchField').animate({
		//		left: '80px'
		//	}, 50);
		//}
		//if(document.body.clientWidth >= 1390) {
		//	$('.navbar.navbar-desktop .searchField').animate({
		//		left: '115px'
		//	}, 50);
		//}
		//if(document.body.clientWidth < 1190) {
		//	$('.navbar.navbar-desktop .searchField').animate({
		//		left: '0px'
		//	}, 50);
		//}
		document.querySelector('.navbar.navbar-desktop .searchField input.form-control').focus();
		return false;
	});
	$('body').click(function(evt){
		if( ($('.navbar.navbar-desktop .searchField').css('left') !== '100%')) {
			if(evt.target.nodeName !== document.querySelector('.navbar.navbar-desktop .searchField input.form-control').nodeName) {
				$('.navbar.navbar-desktop .searchField').animate({
					left: '100%'
				}, 50);
			}
		}
		if( ($('.navbar.navbar-default .searchField').css('left') !== '100%')) {
			if(evt.target.nodeName !== document.querySelector('.navbar.navbar-default .searchField input.form-control').nodeName) {
				$('.navbar.navbar-default .searchField').animate({
					left: '100%'
				}, 50);
			}
		}
	});

});



;$(function(){
	setTimeout(function(){
		// layout newsBlock
		$('.grid').masonry();
	}, 200);
});

