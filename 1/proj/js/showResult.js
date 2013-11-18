;(function ( $, window, document, undefined ) {
 
    var pluginName = "showResult",
        defaults = {
            resultsJson: '../data/results.json',
            data: [],
            resultsMarkup: '<div class="alert alert-block">' +
                                '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                                '<h4>Ваш результат</h4>' +
                                '<div style="text-align: center;">' +
                                    '<strong class="lead">%SCORE% баллов</strong>' +
                                    '<p class="text-info lead">%DESCRIPTION%</p>'+
                                '</div>'+
                            '</div>',
            score: 0
        };
 
    function Plugin( element, options ) {
        this.element = element;
        
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }
 
    Plugin.prototype.init = function () {
        this.getData(this.options.resultsJson);
    };

     Plugin.prototype.getData = function (resultJson) {
        var self = this;
        $.getJSON(resultJson, function(data){
            self.options.data = data;
            self.showResults();
        });
    };

    Plugin.prototype.showResults = function () {
        var score = this.options.score,
            lessTo = false,
            description,
            resultHTML;
        $(this.options.data).each(function(index, value){ 
            if(lessTo === false && score <= value.to) {
                description = value.status;
                lessTo = true;
            }
        });
        resultHTML = this.options.resultsMarkup.replace('%SCORE%', score).replace('%DESCRIPTION%', description);
        $(this.element).html(resultHTML);
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