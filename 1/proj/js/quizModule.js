var quizApp = quizApp || {};

// module-literal
quizApp.quiz = (function (quizApp, $, undefined) {
 
    // private vars and methods
    var defaultOptions = {
            element: {},
            questions: '../data/questions.json',
            answerElementMarkup: '<label class="radio"><input type="radio" value="%VALUE%" class="userAnswer" data-id="%ID%">%VALUE%</label>',
            questionHolder: '.question',
            answersHolder: '.answers',
            resultScore: 0,
            questionIndex: 0,
            questionsLength: 0,
            data: [],
            complete: null
        };

    return function (inputOptions) {
        // public vars and methods
        var options = {},
            element;
        var init = function (inputOptions) {
            element = inputOptions.element;
            console.log(inputOptions, element);
            setOptions(inputOptions);
            drawQuestions();
        }
        var setOptions = function (inputOptions) {
            $.extend(options, defaultOptions, options, inputOptions);
            console.log(options, element);
        };
        var drawQuestions = function(){
            console.log(options);
                questionHolder = element.find(options.questionHolder);
                answersHolder = element.find(options.answersHolder);
                addClickEvent();
                getData(options.questions);
        }
        var getData = function (questions) {
                var self = this;
                console.log(questions);
                $.getJSON(questions, function(data){
                    options.data = data;
                    options.questionsLength = data.length;
                    showQuestion(options.questionIndex);
                });
            };

        var showQuestion = function () {    

            var data = options.data,
                questionIndex = options.questionIndex,
                answer = '';

            answersHolder.html('');

            questionHolder.text(data[questionIndex].question);

            for (var i = 0, len = data[questionIndex].answers.length; i < len; i += 1) {
                answer += options.answerElementMarkup.replace(/%VALUE%/g, data[questionIndex].answers[i]).replace(/%ID%/g, i);
            };
            answersHolder.html(answer);
        };

        var addClickEvent = function () {
            var self = this;
            answersHolder.on('click','.userAnswer', function(){
                countScores(options.data[options.questionIndex].points[$(this).data('id')]);
            });
        };

        var countScores = function (points) {
            options.resultScore += points;
            options.questionIndex += 1;
            if(options.questionIndex < options.questionsLength){
                    showQuestion();
                } else {
                    element.html('');
                    console.log('complete');
                    if (typeof options.complete === 'function') {
                        options.complete({score: options.resultScore});
                    }
                }
        };
        init(inputOptions);
        return this;
    };
 
})(quizApp, jQuery);