b12 = function(num){
	return (num).toString(12).replace(/a/g, "X").replace(/b/g, "E");
}

b10 = function(num) {
	return parseInt(num.replace(/X/g, "a").replace(/E/g, "b"), 12);
}

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
		settings['time'] = 10.0;
	}
}

var score = 0;
var playing = false;
var numASelector = $("#num_a");
var operatorSelector = $("#operator");
var numBSelector = $("#num_b");
var inputSelector = $("#submission");
var settings = {};

answer = function(expected, actual) {
	alert("expected: " + expected);
	alert("actual: " + actual);
	if (expected == actual) {
		alert('right');
	} else {
		alert('wrong');
	}
}

check = function(){
	num_a = b10(numASelector.text());
	operator = operatorSelector.text();
	num_b = b10(numBSelector.text());
	input = inputSelector.val();
	if (operator == '+') {
		answer(num_a + num_b, input);
	}
	if (operator == '-') {
		answer(num_a - num_b, input);
	}
	if (operator == '*') {
		answer(num_a * num_b, input);
	}
	if (operator == '/') {
		answer(num_a / num_b, input);
	}
	inputSelector.focus();
}

b12check = function() {
	$(".base12").each(function(i) {
		if($(this).val() != "") {
			$(this).val($(this).val().replace(/\//g, "X").replace(/\*/g, "E"));
		}
		if($(this).text() != "") {
			$(this).text($(this).text().replace(/\//g, "X").replace(/\*/g, "E"));
		}
	});
}

$(document).ready(function() {
	try {
		var load = '' + atob(urlParam('load'));
		settings = JSON.parse(load);
	}
	catch(err){

	}
	if (settings == null) {
		settings = {}
	}
	validate(settings);
	document.getElementById("submission").onkeyup = function(e){
		if(e.keyCode == 13){
			check();
		}
		b12check();
	}

	document.getElementById("timer_value").onkeyup = function(e){
		b12check();
	}

	

});

