var scrollTop = 0;
var scrollDistance = 0;

var touchStartY;
var touchStartScroll;
var isTouchDevice;
var moved = 0; // amount touchmoved or mousewheeled
var rotX;
var rotY;

var inertiaInterval;

var _winW; // width of the window
var _winH;
var smallScreen; // boolean for < 1000px
var itemTops; // array holds item top position

$(function() { // INITIALIZE AFTER JQUERY IS LOADED
	var WIN = $(window);
	var DOC = $(document);
	resizeHandler(); // Calculate sizes right away

// EVENTS
/////////

	WIN.on('resize',resizeHandler);

  WIN.on('wheel',scrollHandler)
  WIN.on('mousemove',mousemoveHandler)
	WIN.on('scroll',scrollHandler)

	$('.Down-arrow').on('click',function(){
		$("html, body").animate(
			{ scrollTop: _winH },
			{ duration: 600}
		);
	})

	window.addEventListener('deviceorientation',function(e){
	  mousemoveHandler(e);
	})

// FUNCTIONS
////////////
	function mousemoveHandler(e){
		var newX;
		var newY;
		if(scrollTop < _winH-200){
			if(e.type == 'mousemove'){
				newX = e.pageX
				newY = -e.pageY
			}else if(e.type == 'deviceorientation' && _winW < 1000){
				newY = Math.floor(e.beta)*20;
				newX = Math.floor(e.gamma)*20;
			}
			newX = Math.max(-500,Math.min(500,newX-(_winW/2)))
			newY = Math.max(-700,Math.min(700,newY-(_winH/2)))
			var p1X = ($('.Person1').width()/-2)-(newX/50);
			var p1Y = (newY/50)+30;
			var p2X = ($('.Person1').width()/-2)-(newX/80);
			var p2Y = (newY/80)+30;
			var p3X = ($('.Person1').width()/-2)-(newX/100);
			var p3Y = (newY/100)+30;
			$('.Person1').css({
				'-webkit-transform': 'translate3d('+p1X+'px,'+p1Y+'px,0)',
				'-moz-transform': 'translate3d('+p1X+'px,'+p1Y+'px,0)',
				'transform': 'translate3d('+p1X+'px,'+p1Y+'px,0)',
			})
			$('.Person2').css({
				'-webkit-transform': 'translate3d('+p2X+'px,'+p2Y+'px,0)',
				'-moz-transform': 'translate3d('+p2X+'px,'+p2Y+'px,0)',
				'transform': 'translate3d('+p2X+'px,'+p2Y+'px,0)',
			})
			$('.Person3').css({
				'-webkit-transform': 'translate3d('+p3X+'px,'+p3Y+'px,0)',
				'-moz-transform': 'translate3d('+p3X+'px,'+p3Y+'px,0)',
				'transform': 'translate3d('+p3X+'px,'+p3Y+'px,0)',
			})
		}
	}
	function scrollHandler(e) {
		clearInterval(inertiaInterval);
		var oldScrollTop = scrollTop;
		scrollTop = WIN.scrollTop();
		var nextMove = scrollTop - oldScrollTop;
		var iTop = (50-(50*(scrollTop/_winH)));
		if(scrollTop + nextMove > _winH){
			$('.Issue').css({
				position: 'relative',
				top: _winH
			})
			$('.Nav').css({
				'-webkit-transform': 'translate3d(0,-48px,0)'
			})
			$('.Mag-cover').css({
				'top': -_winH
			})
			$('.Nav').addClass('dark');
			shiftCovers();
		}else{
			$('.Nav').removeClass('dark');
			$('.Mag-cover').css({
				'top': Math.min(_winH,scrollTop)*-1
			})
			$('.Nav').css({
				'-webkit-transform': 'translate3d(0,'+Math.max(-48,(-scrollTop/_winH)*48)+'px,0)'
			})
			$('.Issue').css({
				position: 'fixed',
				top: '0'
			})
			$('.Foreground').css({
				'-webkit-transform': 'translate3d(-50%,'+ scrollTop/5 + 'px,0)',
				'-moz-transform': 'translate3d(-50%,'+ scrollTop/5 + 'px,0)',
				'transform': 'translate3d(-50%,'+ scrollTop/5 + 'px,0)',
			})
			$('.Background').css({
				'-webkit-transform': 'translate3d(0,'+ scrollTop/2 + 'px,0)',
				'-moz-transform': 'translate3d(0,'+ scrollTop/2 + 'px,0)',
				'transform': 'translate3d(0,'+ scrollTop/2 + 'px,0)',
			})
			// $('.Issue').css({
			// 	'-webkit-transform': 'translate3d(0,'+ iTop + 'px,0)',
			// 	'-moz-transform': 'translate3d(0,'+ iTop + 'px,0)',
			// 	'transform': 'translate3d(0,'+ iTop + 'px,0)'
			// })
		}
	}
	function shiftCovers() {
		var duration = '0s';
		if(scrollTop < _winH){
			duration = '.5s';
		}
		$('.CoverImage').each(function(i){
			var cover = $(this);
			var newTop = ((Math.max(0,(scrollTop-_winH))-itemTops[i])/5)+20
			cover.css({
				'-webkit-transform': 'translate3d(0,'+ newTop + 'px,0)',
				'-moz-transform': 'translate3d(0,'+ newTop + 'px,0)',
				'transform': 'translate3d(0,'+ newTop + 'px,0)',
				'-webkit-transition': duration + ' all ease-in-out',
				'transition': duration + ' all ease-in-out'
			})
		});
	}
	function touchEndHandler (e) {
		inertiaInterval = setInterval(function(){
		  moved*=.94;
		  if(Math.abs(moved) < .2){
		    clearInterval(inertiaInterval)
		  }
		},10)
	}
	function resizeHandler () { // Set the size of images and preload them
		_winW = $('.Mag-cover').width();
		_winH = $('.Mag-cover').height();
		$('.Lines').css({
			height: _winH
		})
		if(_winW > 1000){
			smallScreen = false;
		}else{
			smallScreen = true;
		}
		itemTops = [];
		$('.CoverImage').each(function(i){
			itemTops.push($('.CoverImage').eq(i).offset().top);
		})
		shiftCovers();
	}
})
