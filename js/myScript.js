$(document).ready(function() {
//
//
// Begin Yelp Search API
var businessSearchResult = []
var yelpSearch = function(zip){
	var auth = { 
	  //
	  // Update with your auth tokens
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

	var category_filter = 'auto';
	var location = zip;

	var accessor = {
	  consumerSecret: auth.consumerSecret,
	  tokenSecret: auth.accessTokenSecret
	};

	parameters = [];
	parameters.push(['category_filter', category_filter]);
	parameters.push(['location', location]);
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
	parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);
	console.log(parameterMap);

  var request = $.ajax({
	  'url': message.action,
	  'data': parameterMap,
	  'cache': true,
	  'dataType': 'jsonp',
	  'jsonpCallback': 'cb',
	  'success': function(data, textStats, XMLHttpRequest) {
	    console.log(data.businesses);
	    businessSearchResult = data.businesses
	   _.each(data.businesses, function(db){
	   	db
	   }) 		
	  }
	});
};
//
// End Yelp Search API

//needs an iterator to pull data from array and object and display

//Render Results
var renderResults = function(){
	$('#listingArea').text('')
	for(var i=0; i<businessSearchResult.length; i++){
	var resultName = $('<div class="listing large-8 large-centered columns">'+ businessSearchResult[i].name +'</div>')
	var resultPhone = $('<p>Phone: '+businessSearchResult[i].display_phone+'</p>').css('display', 'none')
	var resultRank = $('<p> Rating: '+businessSearchResult[i].rating+'/5</p>').css('display', 'none')


	resultName.append(resultPhone)
	resultName.append(resultRank)



	$('#listingArea').append(resultName)

	}
}





//Main Page
$('#listingArea').on('click', '.listing', function (){
	$(this).toggleClass('listing-expand');
	$(this).hasClass('listing-expand') ?
		$(this).children().css('display', 'block') :
		$(this).children().css('display', 'none');
});



$('.searchButton').on('click', function() {
	var zipToSearch = $('.zipSearch').val();
	yelpSearch(zipToSearch);
	$('.zipSearch').val('');
	setTimeout(renderResults, 800);
});
$('.zipForm').on('submit', function() {
	var zipToSearch = $('.zipSearch').val();
	yelpSearch(zipToSearch);
	$('.zipSearch').val('');
	setTimeout(renderResults, 800);
});













});// End of Doc Ready