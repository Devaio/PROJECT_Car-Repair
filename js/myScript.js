$(document).ready(function() {
//
//
// Begin Yelp Search API
	var auth = { 
	  //
	  // Update with your auth tokens.
	  //TTZeAv6k2_Au9Nzf1yns2A
	  consumerKey: "m1TvMHSF7PoLTIwV85NxbA", 
	  consumerSecret: "6u8JIKkDxYrVWVXmBsLSYPOnb5s",
	  accessToken: "F7C4xJ_7vIVuRCNfUPDje18uP5pv1j6d",
	  // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
	  // You wouldn't actually want to expose your access token secret like this in a real application.
	  accessTokenSecret: "7wxSv_KWFWe2uy1minQfgcwVYjE",
	  serviceProvider: { 
	    signatureMethod: "HMAC-SHA1"
	  }
	};

	var category_filter = 'automotive';
	var near = 'Boulder';

	var accessor = {
	  consumerSecret: auth.consumerSecret,
	  tokenSecret: auth.accessTokenSecret
	};

	parameters = [];
	parameters.push(['category_filter', category_filter]);
	parameters.push(['location', near]);
	parameters.push(['callback', 'cb']);
	parameters.push(['oauth_consumer_key', auth.consumerKey]);
	parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
	parameters.push(['oauth_token', auth.accessToken]);
	parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

	var message = { 
	  'action': 'http://api.yelp.com/v2/search',
	  'method': 'GET',
	  'parameters': parameters 
	};

	OAuth.setTimestampAndNonce(message);
	OAuth.SignatureMethod.sign(message, accessor);

	var parameterMap = OAuth.getParameterMap(message.parameters);
	parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
	console.log(parameterMap);

	$.ajax({
	  'url': message.action,
	  'data': parameterMap,
	  'cache': true,
	  'dataType': 'jsonp',
	  'jsonpCallback': 'cb',
	  'success': function(data, textStats, XMLHttpRequest) {
	    console.log(data);
	    var output = prettyPrint(data);
	    $("#listingArea").append(output);
	  }
	});
//
//
// End Yelp Search API



$('#listingArea').on('click', '.listing', function (){
	$(this).toggleClass('listing-expand');
});











});// End of Doc Ready