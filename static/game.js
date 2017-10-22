var timer = null;
var time = 10.0;
var score = 0;
var playing = false;
var settings = {};

var numASelector = $("#num_a");
var numAMinSelector = $("#a_min_value");
var numAMaxSelector = $("#a_max_value");
var operatorSelector = $("#operator");
var numBSelector = $("#num_b");
var numBMinSelector = $("#b_min_value");
var numBMaxSelector = $("#b_max_value");
var timerSelector = $('#timer_value')
var inputSelector = $("#submission");
var scoreSelector = $("#score");

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

validateSettings = function(){
	
	if (isNaN(settings['a_min'])) {
		settings['a_min'] = 0;
	}

	if (isNaN(settings['a_max'])) {
		settings['a_max'] = 42;
	}

	if (isNaN(settings['b_min'])) {
		settings['b_min'] = 0;
	}

	if (isNaN(settings['b_max'])) {
		settings['b_max'] = 42;
	}

	if (settings['operators'] == null) {
		settings['operators'] = ['+', '-'];
	}

}

loadSettings = function(b64Code){
	if(b64Code == "" || b64Code == null) {
		settings['a_min'] = b10(numAMinSelector.val());
		settings['a_max'] = b10(numAMaxSelector.val());
		settings['b_min'] = b10(numBMinSelector.val());
		settings['b_max'] = b10(numBMaxSelector.val());
	} else {
		settings = JSON.parse(b64Code);
	}
	validateSettings();
	newProblem();
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

newProblem = function() {
	genA = getRandomInt(settings['a_min'], settings['a_max']);
	genB = getRandomInt(settings['b_min'], settings['b_max']);
	numASelector.text(b12(genA));
	numBSelector.text(b12(genB));
	opNum = settings['operators'].length;
	operatorSelector.text(settings['operators'][getRandomInt(0, opNum)]);
}

answer = function(expected, actual) {
	if (expected == actual && playing) {
		score = score + 1;
	}
	
	scoreSelector.text(score);
	inputSelector.val("");
	newProblem();
}

check = function(){
	if (!playing) {
		playing = true;
	}
	num_a = b10(numASelector.text());
	operator = operatorSelector.text();
	num_b = b10(numBSelector.text());
	input = inputSelector.val();
	if (operator == '+') {
		answer(b12(num_a + num_b), input);
	}
	if (operator == '-') {
		answer(b12(num_a - num_b), input);
	}
	if (operator == '*') {
		answer(b12(num_a * num_b), input);
	}
	if (operator == '/') {
		answer(b12(num_a / num_b), input);
	}
	inputSelector.focus();
}

updateBase12Elements = function() {
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
		loadSettings(load);
	}
	catch(err){

	}
	if (settings == null) {
		settings = {}
	}
	validateSettings();
	newProblem();

	document.getElementById("submission").onkeyup = function(e){
		if(e.keyCode == 13){
			check();
		}
		updateBase12Elements();
	}


});

