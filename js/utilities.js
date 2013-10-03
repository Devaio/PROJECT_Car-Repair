// Utility Functions
//
//

/**Supplant - {index of array/object} in a string will interpolate when you use .supplant( [array or object of variables] )*/
if (!String.prototype.supplant) {
    String.prototype.supplant = function (o) {
        return this.replace(
            /\{([^{}]*)\}/g,
            function (a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        );
    };
}

/**Map Function*/
var map = function(arr, f) {                //--takes array as first param, function as second
	var output =[];
	for(var i=0; i<arr.length; i++){
		output.push(f(arr[i]));            //-- calls function and passes the item, loops through items in array
	}
	return output;
};

/**Cap Function*/
var cap = function(s) {							
	var firstLetter = s[0];
	var rest = s.slice(1);
	return firstLetter.toUpperCase() + rest;
};

/**Filter Function*/
var filter = function(arr, f) {
	var output = [];

	for(var i=0; i<arr.length; i++){
		if( f(arr[i]) ){
			output.push(arr[i]);
		}
	}
	return output;
};

/**Pluck Function*/
var pluck = function(arr, propertyName) {
	var output = [];
	for(var i=0; i<arr.length; i++) {
		output.push(arr[i][propertyName]);
	}
	return output;
}

/**String Format Function*/
var printObject = function(o, valueFormatter) {
	for(var key in o){
		var formattedValue = valueFormatter(o[key]);
		console.log(key + " = " + formattedValue);
	}
};

/**Formate Seconds Function*/
var formatSeconds = function(milliseconds) {
	return milliseconds/1000 + ' sec';
};

/** Converts an object into a readable string. */
var formatObj = function(o, valueFormatter) {
	valueFormatter = valueFormatter || function(x) { return x; };  //--identity function, will just return same values passed to it if valueFormatter is falsey ie) no valueFormatter passed
	var s = "";
	for(var key in o) {
		s += "  {0}: {1}\n".supplant([key, valueFormatter(o[key])]);
	}
	return s;
};

/* Rounds a number to the given decimel place. */
var roundToPlace = function(n, place) {
	place = place || 0
	var multiplier = Math.pow(10, place);
	return Math.round(n * multiplier) / multiplier;
};


/* Picks out longest word in string, ignores special characters*/
var longestWord = function(sen) { 
  var senArray = sen.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(" "); 
  var longestLength = 0;
  var longestWord;

    for (var i = 0; i < senArray.length; i++) {
        if (longestLength < senArray[i].length) {
            longestLength = senArray[i].length;
            longestWord = senArray[i];
        }
    }
  return longestWord;     
}

/**Takes a number and returns it in min:sec*/
function timeConvert(num) { 
var hours = 0;
var minutes = 0;
        
    var withHours = function() {
    	hours = Math.floor(num/60);
    	minutes = num%60;
    	convTime = hours + ":" + minutes;
    };

    var noHours = function() {
    	minutes = num;
    	convTime = hours + ":" + minutes;
    };
  
    (num >= 60) ? withHours() : noHours();

  return convTime; 
         
}

/**Returns number of vowels in a string*/
function vowelCount(str) { 
var vowelMatch = str.match(/[aeiou]/gi);
var vowelCount = vowelMatch ? vowelMatch.length : 0;
 
  return vowelCount; 
}

/* creates substring */
var subString = function(str, start, end) {
	var output = ""
	end = end || str.length
	for(var i=start; i<end; i++) {
		output += str[i];
	}
	return output;
}

/**For picking random quotes from an object!*/

function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}















