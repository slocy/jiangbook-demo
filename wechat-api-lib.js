function randomKey(key){
	key = (typeof key === 'undefined') ? "std" : key;

	return ("xxxyxxxyxxx" + key).replace(/[xy]/g, function(c) {
    		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    		return v.toString(16);
		});
}

function makeSignature(jsapiTicket, randomKey, timeStamp, url){
	var pass = 'jsapi_ticket=' + jsapiTicket + '&noncestr=' + randomKey + '&timestamp=timeStamp&url=' + url;

	return Sha1.hash(pass);
}

function wxapi_init(){
	var _jsapiTicket = 'kgt8ON7yVITDhtdwci0qef3l2R9YvFTapCYoJUzN-YEBB6mGhmi5T5IK6L4B86FrUMfpsU1YSoVmhPLSSJjEfA';
	var _timeStamp = Date.now();
	var _randomKey = randomKey();
	var _appId = 'wxdebf3e2511cf03f7';
	var _url = window.location.href.split('?')[0];

	var sig = makeSignature(_jsapiTicket, _randomKey, _timeStamp, _url);

	wx.config({
	    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	    appId: _appId, // 必填，公众号的唯一标识
	    timestamp: _timeStamp, // 必填，生成签名的时间戳
	    nonceStr: _randomKey, // 必填，生成签名的随机串
	    signature: sig,// 必填，签名，见附录1
	    jsApiList: [
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'onMenuShareQQ',
			'onMenuShareWeibo',
			'onMenuShareQZone',
			'startRecord',
			'stopRecord',
			'onVoiceRecordEnd',
			'playVoice',
			'pauseVoice',
			'stopVoice',
			'onVoicePlayEnd',
			'uploadVoice',
			'downloadVoice',
			'chooseImage',
			'previewImage',
			'uploadImage',
			'downloadImage',
			'translateVoice',
			'getNetworkType',
			'openLocation',
			'getLocation',
			'hideOptionMenu',
			'showOptionMenu',
			'hideMenuItems',
			'showMenuItems',
			'hideAllNonBaseMenuItem',
			'showAllNonBaseMenuItem',
			'closeWindow',
			'scanQRCode',
			'chooseWXPay',
			'openProductSpecificView',
			'addCard',
			'chooseCard',
			'openCard',
	      ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});

	wx.ready(function(){
	    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
	    // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
	    // 则须把相关接口放在ready函数中调用来确保正确执行。
	    // 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
	    alert('ready!');
	});

	wx.error(function(res){
		// config信息验证失败会执行error函数，如签名过期导致验证失败，
		// 具体错误信息可以打开config的debug模式查看，
		// 也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

		alert('error!');
	});
};