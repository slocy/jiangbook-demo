function randomKey(key){
	key = (typeof key === 'undefined') ? "std" : key;

	return ("xxxyxxxyxxx" + key).replace(/[xy]/g, function(c) {
    		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    		return v.toString(16);
		});
}

function makeSignature(jsapiTicket, randomKey, timeStamp, url){
	var pass = 'jsapi_ticket=' + jsapiTicket + '&noncestr=' + randomKey + '&timestamp=' + timeStamp + '&url=' + url;

	//alert(pass);

	var sha = Sha1.hash(pass);

	return sha;
}

/*
Init all configurations for current page request.
*/
function wxapi_init(ticket, appId){
	var _jsapiTicket = 'kgt8ON7yVITDhtdwci0qef3l2R9YvFTapCYoJUzN-YFE15ZOhlmMlG42TYNm18QT-Y100IuXyifFuC4AXYz0DQ';
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
	    //alert('ready!');
	});

	wx.error(function(res){
		// config信息验证失败会执行error函数，如签名过期导致验证失败，
		// 具体错误信息可以打开config的debug模式查看，
		// 也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

		//alert('error!');
	});
};

/*
Check browser capability
*/
function checkBrowser(){
	wx.checkJsApi({
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
	    ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
	    success: function(res) {
	        // 以键值对的形式返回，可用的api值true，不可用为false
	        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
	        alert(res);
	    }
	});
}

/*
Get the Wechat customer authentication.
*/
function getWechatAuthentication(){

}

/*
Share current page to WeChat friend.
*/
function shareToFriend(){
	wx.onMenuShareAppMessage({
	    title: 'Test Page of Slocy.cn', // 分享标题
	    desc: 'Test description', // 分享描述
	    link: 'http://wx.slocy.cn', // 分享链接
	    imgUrl: '', // 分享图标
	    type: 'link', // 分享类型,music、video或link，不填默认为link
	    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	    success: function () { 
	        alert('Shared!');
	    },
	    cancel: function () { 
	    	alert('Share cancelled!');
	    }
	});
}

function shareToWechatTimeline(){}

function shareToQQ(){}

function shareToWeibo(){}

function shareToQZone(){}

/*
Get the network type from cutomer's cellphone.
*/
function getNetworkType(){
	wx.getNetworkType({
	    success: function (res) {
	        alert(res); // 返回网络类型2g，3g，4g，wifi
	    }
	});
}

/*
Get the geo location of customer.
*/
function getLocation(){
	wx.getLocation({
	    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
	    success: function (res) {
	        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
	        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
	        var speed = res.speed; // 速度，以米/每秒计
	        var accuracy = res.accuracy; // 位置精度

	        alert(res);
	    }
	});
}

/*
Redirect current page to product page, including the product page, detail page and scanning page.
*/
function redirectToProductPage(productId, viewType){
	wx.openProductSpecificView({
	    productId: 1, // 商品id
	    viewType: 2 // 0.默认值，普通商品详情页1.扫一扫商品详情页2.小店商品详情页
	});
}

/*
Choose image from album or take a photo.
*/
function chooseImage(){
	wx.chooseImage({
	    count: 1, // 默认9
	    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
	    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
	    success: function (res) {
	        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

	        alert(localIds);
	    }
	});
}