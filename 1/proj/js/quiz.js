;(function ( $, window, document, undefined ) {
 
    var pluginName = "quiz",
        defaults = {
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
 
    function Plugin( element, options ) {
        this.element = element;
        
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }
 
    Plugin.prototype.init = function () {
        this.questionHolder = $(this.element).find(this.options.questionHolder);
        this.answersHolder = $(this.element).find(this.options.answersHolder);
        
        this.addClickEvent();
        this.getData(this.options.questions);
    };

    Plugin.prototype.getData = function (questions) {
    	var self = this;
        $.getJSON(questions, function(data){
        	self.options.data = data;
        	self.options.questionsLength = data.length;
        	self.showQuestion(self.options.questionIndex);
        });
    };

    Plugin.prototype.showQuestion = function () {	

    	var data = this.options.data,
            questionIndex = this.options.questionIndex,
            answer = '';

        this.answersHolder.html('');

    	this.questionHolder.text(data[questionIndex].question);

    	for (var i = 0, len = data[questionIndex].answers.length; i < len; i += 1) {
    		answer += this.options.answerElementMarkup.replace(/%VALUE%/g, data[questionIndex].answers[i]).replace(/%ID%/g, i);
    	};
        this.answersHolder.html(answer);
    };

    Plugin.prototype.addClickEvent = function () {
    	var self = this;
    	this.answersHolder.on('click','.userAnswer', function(){
            self.countScores(self.options.data[self.options.questionIndex].points[$(this).data('id')]);
    	});
    };

    Plugin.prototype.countScores = function (points) {
        this.options.resultScore += points;
        this.options.questionIndex += 1;
        if(this.options.questionIndex < this.options.questionsLength){
                this.showQuestion();
            } else {
                $(this.element).html('');
                console.log('complete');
                //$(this.element).showResult({'score': this.options.resultScore});
                if (typeof this.options.complete === 'function') {
                    this.options.complete({score: this.options.resultScore});
                }
            }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if ( !$.data(this, "plugin_" + pluginName )) {
                $.data( this, "plugin_" + pluginName, 
                new Plugin( this, options ));
            }
        });
    }
 
})( jQuery, window, document );