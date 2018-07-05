$(document).ready(function() {
	$('html').on('DOMMouseScroll mousewheel', function (e) {
	  if(e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
	    console.log('Down');
	    $( "#header-nav" ).removeClass( "header--up" );
	    $( "#header-nav" ).addClass( "header--scrolling header--down" );
	  } else {
	    console.log('Up');
	    $( "#header-nav" ).removeClass( "header--scrolling header--down" );
	    $( "#header-nav" ).addClass( "header--up" );
	  }
	});
});