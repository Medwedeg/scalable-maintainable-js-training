$(function() {
    quizApp.quiz(, {
    	element: $('#quizForm'),
        complete : function (data) {
        	console.log(data.score);
            quizApp.showResult({element: $('#quizForm'),
           	score: data.score});
        }
    });
    //quizApp.eventBus.bind('showResult', 'complete', quizApp.quiz);
    // quizApp.quiz({
    //         element: $('#inquirer2'),
    //         callback: quizApp.showResult({
    //                 'element': $('#output')
    //         }).draw();
    // });
});