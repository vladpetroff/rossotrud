/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	;$(function () {

		// layout newsBlock
		if (document.body.clientWidth > 767) {
			$('.grid').masonry();
		}

		// clickable anons-block
		$("section.anons").on("click", "article", function () {
			window.location = $(this).find("a").attr('href');
		});
		// clickable news-block
		$("section.news").on("click", ".news", function () {
			window.location = $(this).find("a").attr('href');
		});
		// clickable projects-block
		$("section.projects").on("click", "article", function () {
			window.location = $(this).find("a").attr('href');
		});
		// clickable manage-block
		$("section.manage.block").on("click", "article", function () {
			window.location = $(this).find("a").attr('href');
		});
		// clickable programs-block
		$("section.programs").on("click", "article", function () {
			window.location = $(this).find("a").attr('href');
		});

		// select lang
		$('.navbar-default .lang').on('click', 'a', function () {
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
		if (poll) {
			var pollString = document.querySelectorAll('.pollBlock .poll table tr');
			var pollMaxValue = 0;
			[].forEach.call(pollString, function (elem) {
				if (parseInt(elem.getAttribute("data-persent")) > pollMaxValue) {
					pollMaxValue = parseInt(elem.getAttribute("data-persent"));
				}
				elem.children[1].children[0].style.width = elem.getAttribute("data-persent");
				elem.children[0].innerText = elem.getAttribute("data-persent");
			});
			document.querySelector('.pollBlock .poll table tr[data-persent="52%"]').children[1].children[0].style.backgroundColor = "#ffd180";
			//if(parseInt(getComputedStyle(poll).height) >= 260) {
			//	poll.style.height = "260px";
			//	poll.nextElementSibling.style.display = 'block';
			//};
		}

		// fixed desktop navbar
		var navDesktop = document.querySelector('.navbar.navbar-desktop');
		var navOffset = navDesktop.offsetTop;
		window.onscroll = function () {
			var scrolled = window.pageYOffset || document.documentElement.scrollTop;
			if (scrolled >= navOffset) {
				navDesktop.classList.add('fixed-nav');
				$('.navbar-desktop .navbarLine').addClass('container');
			} else {
				navDesktop.classList.remove('fixed-nav');
				$('.navbar-desktop .navbarLine').removeClass('container');
			}
		};

		//collapse menu
		$('.navbar-default #navbar-collapsed').on('shown.bs.collapse', function () {
			var docHeight = document.documentElement.clientHeight;
			var navLineHeight = document.querySelector('.navbar-default.visible-xs .navbar-header').offsetHeight;
			var menuHeight = docHeight - navLineHeight;
			$('body').addClass('overflow-hid');
			$('.navbar-default #navbar-collapsed').height(menuHeight);
		});
		$('.navbar-default #navbar-collapsed').on('hidden.bs.collapse', function () {
			$('body').removeClass('overflow-hid');
		});

		// search line
		$('.navbar.navbar-default .search').click(function () {
			$('.navbar.navbar-default .searchField').toggle();
			document.querySelector('.navbar.navbar-default .searchField input.form-control').focus();
			return false;
		});
		$('.navbar.navbar-desktop .search').click(function () {
			$('.navbar.navbar-desktop .searchField').toggle();
			document.querySelector('.navbar.navbar-desktop .searchField input.form-control').focus();
			return false;
		});
		$('body').click(function (evt) {
			if ($('.navbar.navbar-desktop .searchField').css('display') !== 'none') {
				if (evt.target.nodeName !== document.querySelector('.navbar.navbar-desktop .searchField input.form-control').nodeName) {
					$('.navbar.navbar-desktop .searchField').toggle();
				}
			}
			if ($('.navbar.navbar-default .searchField').css('display') !== 'none') {
				if (evt.target.nodeName !== document.querySelector('.navbar.navbar-default .searchField input.form-control').nodeName) {
					$('.navbar.navbar-default .searchField').toggle();
				}
			}
		});
		//$('.navbar.navbar-default .search').click(function(){
		//	$('.navbar.navbar-default .searchField').animate({
		//		left: '0px'
		//	}, 50);
		//	document.querySelector('.navbar.navbar-default .searchField input.form-control').focus();
		//	return false;
		//});
		//$('.navbar.navbar-desktop .search').click(function(){
		//	$('.navbar.navbar-desktop .searchField').animate({
		//		left: '0px'
		//	}, 50);
		//	document.querySelector('.navbar.navbar-desktop .searchField input.form-control').focus();
		//	return false;
		//});
		//$('body').click(function(evt){
		//	if( ($('.navbar.navbar-desktop .searchField').css('left') !== '100%')) {
		//		if(evt.target.nodeName !== document.querySelector('.navbar.navbar-desktop .searchField input.form-control').nodeName) {
		//			$('.navbar.navbar-desktop .searchField').animate({
		//				left: '100%'
		//			}, 50);
		//		}
		//	}
		//	if( ($('.navbar.navbar-default .searchField').css('left') !== '100%')) {
		//		if(evt.target.nodeName !== document.querySelector('.navbar.navbar-default .searchField input.form-control').nodeName) {
		//			$('.navbar.navbar-default .searchField').animate({
		//				left: '100%'
		//			}, 50);
		//		}
		//	}
		//});

		// show/hide representative block
		$('.headerRegion .repres').click(function () {
			$(this).toggleClass('open');
			$('.represBlock').toggleClass('show');
		});
		$('.headerRegion .represBlock .represCloseBtn').click(function () {
			$('.headerRegion .repres').removeClass('open');
			$('.headerRegion .represBlock').removeClass('show');
		});
		$('.headerRegion .represBlock').on('click', '.media-body a', function (evt) {
			//var repTxt = evt.target.dataset.repres;
			//$('.headerRegion .represBlock .media-body a.selected').removeClass('selected');
			//$(this).addClass('selected');
			//$('.headerRegion .repres span.text')[0].innerText = repTxt;
			$('.headerRegion .represBlock').removeClass('show');
			$('.headerRegion .repres').removeClass('open');
			//return false;
		});
		$(document).click(function (event) {
			if ($(event.target).closest(".headerRegion").length) return;
			$('.headerRegion .represBlock').removeClass('show');
			$('.headerRegion .repres').removeClass('open');
			event.stopPropagation();
		});
	});

/***/ }
/******/ ]);