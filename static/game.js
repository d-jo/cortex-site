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

var timer = null;
var time = 10.0;
var score = 0;
var playing = false;
var numASelector = $("#num_a");
var numAMinSelector = $("a_min_selector");
var numAMaxSelector = $("a_max_selector");
var operatorSelector = $("#operator");
var numBSelector = $("#num_b");
var numBMinSelector = $("b_min_selector");
var numBMaxSelector = $("b_max_selector");
var inputSelector = $("#submission");
var scoreSelector = $("#score");
var timeSelector = $("#time");
var settings = {"operators": ['+', '-']};

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
}

answer = function(expected, actual) {
	console.log("got " + actual);
	console.log("expected " + expected);
	if (expected == actual) {
		score = score + 1;
	} else {
		score = score - 1;
	}
	scoreSelector.text(score);
	inputSelector.val("");
	newProblem();
}

startTicker = function() {
	timer = setInterval(function() {
		if (time < 0) {
			clearTimeout(timer);
			playing = false;
		}
		time = time - 0.1;
		timeSelector.text(Math.round(time * 10) / 10);
	}, 100);
}

check = function(){
	if (!playing) {
		playing = true;
		startTicker();
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

	document.getElementById("time").onkeyup = function(e){
		b12check();
	}

	

});

