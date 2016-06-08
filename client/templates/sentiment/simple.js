Template.simpleSentiment.onRendered(function() {

	Session.set('tweetList', []);

});

Template.simpleSentiment.helpers({

	simpleSentiment: function() {
		return Session.get('simpleSentiment');
	},

    sentimentSmiley: function(sentiment) {
        if (sentiment=="positive")
            return "fa-smile-o";
        else if (sentiment=="neutral")
            return "fa-meh-o";
        else if (sentiment=="negative")
            return "fa-frown-o";
    },

	currText: function() {
		return Session.get('currText');
	},

	notEmpty: function(string) {
		return !(string == "");
	},

	twitterSearchList: function() {
		return Session.get('tweetList');
	},

	labelBasedOnSentiment: function(s) {
		console.log(s);
		if (s=="positive")
			return "list-group-item-success";
		else if (s=="negative")
			return "list-group-item-danger";
		else
			return "list-group-item-info";
	},

	tweetUrlById: function(_id) {
		return "http://twitter.com/statuses/" + _id;
	},

    genderRatio: function() {
    	Highcharts.setOptions({
    		colors: ["#5cb85c", "#5bc0de", "#d9534f"]
    	});

    	var num_positive = Session.get("sentiment_count")[0]
    	var num_neutral = Session.get("sentiment_count")[1]
    	var num_negative = Session.get("sentiment_count")[2]

        return {
            credits: false,
            chart: {
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: ""
            },
            tooltip: {
                pointFormat: '<b>{point.y}</b>'
            },
            plotOptions: {
                pie: {
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        },
                        connectorColor: 'silver'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Sentiment',
                data: [{
                    name: 'Positive',
                    y: num_positive
                }, {
                    name: 'Neutral',
                    y: num_neutral
                }, {
                    name: 'Negative',
                    y: num_negative                	
                }]
            }]
        };
	},
});

Template.simpleSentiment.events({
    'click .run-sentiment': function() {
        var text = $(".sentiment-text").val();
        var classifier = $("#classifier-text").val();

		Meteor.call('getSimpleSentiment', text, classifier, function(err, response) {
			Session.set('currText', text);
			Session.set('simpleSentiment', response.sentiment);
		});

    },

    'click .run-sentiment-tweets': function() {
        var query = $(".sentiment-tweets").val();
        var count = $(".count-filter").val();
        var classifier = $("#classifier-search").val();

        if (!($('input.link-filter').is(':checked'))) {
            query = query + " -filter:links";
        }

        if (!($('input.retweet-filter').is(':checked'))) {
            query = query + " -filter:retweets";
        }

        if (!($('input.reply-filter').is(':checked'))) {
            query = query + " -filter:replies";
        }

		Meteor.call('getTwitterSearch', query, count, classifier, function(err, response) {
			Session.set('tweetList', response.array);
			Session.set('sentiment_count', [response.num_positive, response.num_neutral, response.num_negative])
		});

    },
});
