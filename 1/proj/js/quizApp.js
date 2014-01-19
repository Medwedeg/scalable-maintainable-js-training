$(function() {
    quizApp.quiz({
    	element: $('#quizForm'),
        complete : function (data) {
        	console.log(data.score);
            quizApp.showResult({
            	element: $('#quizForm'),
           		score: data.score
           	});
        }
    });
    
    quizApp.quiz({
    	element: $('#quizForm2'),
        complete : function (data) {
        	console.log(data.score);
            quizApp.showResult({
            	element: $('#quizForm2'),
           		score: data.score
           	});
        }
    });
});