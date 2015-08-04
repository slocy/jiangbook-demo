
/*
Fire every button.
*/
$( "#button_init" ).click( function( event ) {
	//wxapi_init();

	getApiTicketTemporary();
});

$( "#button_shareFriend" ).click( function( event ) {
	shareToFriend();
});

$( "#button_checkBrowser" ).click( function( event ) {
	checkBrowser();
});

$( "#button_chooseImage" ).click( function( event ) {
	chooseImage();
});