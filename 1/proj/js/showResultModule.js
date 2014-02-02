define("showResult",["jquery"], function($) {
 
    // private vars and methods
    var defaultOptions = {
        element: {},
        resultsJson: '../data/results.json',
        data: [],
        // resultsMarkup: '<div class="alert alert-block">' +
        //                     '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
        //                     '<h4>Ваш результат</h4>' +
        //                     '<div style="text-align: center;">' +
        //                         '<strong class="lead">%SCORE% баллов</strong>' +
        //                         '<p class="text-info lead">%DESCRIPTION%</p>'+
        //                     '</div>'+
        //                 '</div>',
        resultsMarkup: _.template('<div class="alert alert-block">' +
                            '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                            '<h4>Ваш результат</h4>' +
                            '<div style="text-align: center;">' +
                                '<strong class="lead"><%= score %> баллов</strong>' +
                                '<p class="text-info lead"><%= description %></p>'+
                            '</div>'+
                        '</div>'),
        score: 0
    };



    	
    
    return function (inputOptions) {
        // public vars and methods
        var options = {},
            element;

        var getData = function (resultJson) {
            $.getJSON(resultJson, function(data){
                options.data = data;
                showResults();
            });
        };

        var showResults = function () {
            var score = options.score,
                lessTo = false,
                description,
                resultHTML;
            $(options.data).each(function(index, value){ 
                if(lessTo === false && score <= value.to) {
                    description = value.status;
                    lessTo = true;
                }
            });
            //resultHTML = options.resultsMarkup.replace('%SCORE%', score).replace('%DESCRIPTION%', description);
            resultHTML = options.resultsMarkup({score: score, description: description});
            element.html(resultHTML);
        };

        var init = function(inputOptions) {
            element = inputOptions.element;
            options = $.extend({}, defaultOptions, options, inputOptions);
            getData(options.resultsJson);
        };

        init(inputOptions);
        return this;
    };
 
});