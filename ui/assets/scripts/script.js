var scrollTop = 0;
var modules = document.querySelectorAll('.Module')
var menuItems = document.querySelectorAll('.Menu-item')
var moduleTops = [];

document.addEventListener('scroll',scrollHandler);
window.addEventListener('resize',resizeHandler);

resizeHandler();
setTimeout(setTops,1);

function scrollHandler(e) {
	scrollTop = document.querySelector('body').scrollTop
	for (var i = 0; i < modules.length; i++) {
		if(i == modules.length-1 && scrollTop > moduleTops[i]){
			menuItems[i].classList.add('active');
			modules[i].classList.add('active');
		}else if(scrollTop > moduleTops[i] && scrollTop < moduleTops[i+1]){
			menuItems[i].classList.add('active');
			modules[i].classList.add('active');
		}else{
			menuItems[i].classList.remove('active');
			modules[i].classList.remove('active');
		}
	}
}

function resizeHandler(e) {
	setTops();
}

function setTops() {
	moduleTops = []
	for (var i = 0; i < modules.length; i++) {
		moduleTops.push(modules[i].getBoundingClientRect().top - menuItems[menuItems.length-1].getBoundingClientRect().top + document.querySelector('body').scrollTop)
	}
}