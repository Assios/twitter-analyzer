Template.simpleSentiment.onRendered(function() {

	Session.set('tweetList', []);

});

Template.simpleSentiment.helpers({

	simpleSentiment: function() {
		return Session.get('simpleSentiment');
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
                    y: 4
                }, {
                    name: 'Neutral',
                    y: 20
                }, {
                    name: 'Negative',
                    y: 13                	
                }]
            }]
        };
	},
});

Template.simpleSentiment.events({
    'click .run-sentiment': function() {
        var text = $(".sentiment-text").val();

		Meteor.call('getSimpleSentiment', text, function(err, response) {
			Session.set('currText', text);
			Session.set('simpleSentiment', response.sentiment);
		});

    },

    'click .run-sentiment-tweets': function() {
        var query = $(".sentiment-tweets").val();

		Meteor.call('getTwitterSearch', query, function(err, response) {
			Session.set('tweetList', response.array);
		});

    },
});
