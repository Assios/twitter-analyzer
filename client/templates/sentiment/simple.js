Template.sentiment.onRendered(function() {

	Session.set('tweetList', []);
    Session.set("topicText", "");
    Session.set("tweetTopicMixture", []);
    Session.set("tweetTopicText", "");

});

Template.sentiment.helpers({

	simpleSentiment: function() {
		return Session.get('simpleSentiment');
	},

    topicText: function() {
        return Session.get("topicText");
    },

    tweetTopicText: function() {
        return Session.get("tweetTopicText");
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

    twitterTopicList: function() {
        return Session.get("tweetTopicMixture");
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

    tweetTopicMixture: function() {
      var categ = Session.get("tweetTopicCategories");
      var topicMix = Session.get("tweetTopicMixture");
      var subtitle_text = "Average topic mixture over tweets retrieved by query: " + Session.get("tweetTopicText");

      return {
        credits: false,
        chart: {
            type: 'column'
        },
        title: {
            text: 'Topic distribution',
        },
        subtitle: {
            text: subtitle_text
        },
        xAxis: {
            categories: categ,
        },

        yAxis: {

        },

        series: [{
            showInLegend: false,
            name: "fraction",
            data: topicMix,
        }]
    }
    },

    topicMixture: function() {

    var chart_data = Session.get("topic_chart_data");
    var categ = Session.get('topicCategories');
    var topicMix = Session.get('topicMixture');
    var subtitle_text = Session.get("topicText");

    return {
        credits: false,
        chart: {
            type: 'column'
        },
        title: {
            text: 'Topic distribution',
        },
        subtitle: {
            text: subtitle_text
        },
        xAxis: {
            categories: categ,
        },

        series: [{
            showInLegend: false,
            name: "fraction",
            data: topicMix,
        }]
    }
    },

    sentimentPieChart: function() {
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

Template.sentiment.events({
    'click .run-topic-mixture': function() {
        var text = $(".topic-text").val();
        var topic_model = $("#topic-model-select").val();

        Meteor.call('getTopicMixture', text, topic_model, function(err, response) {
            Session.set('topicText', text);
            Session.set('topicCategories', response.categories);
            Session.set('topicMixture', response.topic_mixture);
        });

    },

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
        var result_type = $('input:radio[name=result_type]:checked').val();
        var analyze_type = $('input:radio[name=analyze_type]:checked').val();

        if (!($('input.link-filter').is(':checked'))) {
            query = query + " -filter:links";
        }

        if (!($('input.retweet-filter').is(':checked'))) {
            query = query + " -filter:retweets";
        }

        if (!($('input.reply-filter').is(':checked'))) {
            query = query + " -filter:replies";
        }

        if (analyze_type=="sentiment") {
    		Meteor.call('getTwitterSearch', query, count, classifier, result_type, function(err, response) {
    			Session.set('tweetList', response.array);
    			Session.set('sentiment_count', [response.num_positive, response.num_neutral, response.num_negative])
    		});
        } else if (analyze_type=="topic") {
            Meteor.call('getTopicTweetMixture', query, count, result_type, function(err, response) {
                Session.set("tweetTopicText", query);
                Session.set("tweetTopicMixture", response.topic_mixture);
                Session.set("tweetTopicCategories", response.categories);
            });            
        } else if (analyze_type=="both") {
            Meteor.call('getSentimentAndTopic', query, count, classifier, result_type, function(err, response) {
                Session.set('tweetList', response.array);
                Session.set('sentiment_count', [response.num_positive, response.num_neutral, response.num_negative]);
                Session.set("tweetTopicText", query);
                Session.set("tweetTopicMixture", response.topic_mixture);
                Session.set("tweetTopicCategories", response.categories);
            });            
        }
    },
});
