urlParam = function(name){
	    var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
	    if (results == null){
		    return null;
	    } else {
		    return results[1] || 0;
	    }
}

validate = function(settings){
	
	if (settings['a_min'] == null) {
		settings['a_min'] = 0;
	}

	if (settings['a_max'] == null) {
		settings['a_max'] = 42;
	}

	if (settings['b_min'] == null) {
		settings['b_min'] = 0;
	}

	if (settings['b_max'] == null) {
		settings['b_max'] = 42;
	}

	if (settings['operators'] == null) {
		settings['operators'] = ['+', '-'];
	}

	if (settings['time'] == null) {
		settings['time'] = 10;
	}
}

b12 = function(num){
	return (num).toString(12).replace(/a/g, "X").replace(/b/g, "E");
}

$(document).ready(function() {
	var load = '' + atob(urlParam('load'));
	var settings = JSON.parse(load);
	validate(settings);
});

