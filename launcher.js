/*
Get the JS API ticket, it's temporary access method for single request.
The ticket should be stored at server side.
*/
function getApiTicketTemporary(){
	$.ajax( {
		url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxdebf3e2511cf03f7&secret=73cea8e8e906b72c86ce00ba47ab625a",
		crossDomain: true, 
		success: function( data ) {
			console.log(data);

			var token = data.access_token;

			$.ajax({
				url: "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=" + token,
				crossDomain: true,
				success: function( data ) {
					console.log(data);

					alert(data.ticket);
				},
			});
		}
	});
}


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