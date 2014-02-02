requirejs.config({
    "baseUrl": "js",
    "paths": {
      "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
      "eventBus": "eventBuz",
      "modernizr": "modernizr",
      "yepNope": "yepNope",
      "quizModule": "quizModule",
      "showResult": "showResultModule",
      "underscore": "underscore-min"
    }
});
require(["jquery", "eventBus", "quizModule", "modernizr", "yepNope"], function($, eventBus, Quiz, m, y) {
	console.log(arguments);

	yepnope({
	  test : Modernizr.json,
	  nope : ['js/json3.js']
	});
	var quiz = new Quiz(),
		quiz2 = new Quiz();
    quiz.init({
    	element: $('#quizForm'),
    });
    quiz2.init({
    	element: $('#quizForm2')
    });  

    eventBus.bind('showResult', function (data) {
    	require(["showResult"], function(showResult){
    		console.log(data);
        	showResult({
        		element: data.resultContainer,
       			score: data.score
       		});
    	});

    });
});