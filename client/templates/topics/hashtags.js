Template.hashtags.onRendered(function() {

        //Session.set("most_common_hashtags", [["halla", 1], ["yo", 3]]);

        Meteor.call('getMostCommonHashtags', 10, "27jan_tweets", function(err, response) {
            console.log(response);
            Session.set('most_common_hashtags', response);
        });

});

Template.hashtags.helpers({

	mostCommonHashtagsChart: function() {
        var most_common_hashtags_object = Session.get("most_common_hashtags");
        var number_of_hashtags = most_common_hashtags_object.number_of_hashtags

	    return {
	    credits: false,
        chart: {
            type: 'column'
        },
        title: {
            text: 'Most common hashtags'
        },
        subtitle: {
            text: 'Based on ' + most_common_hashtags_object.number_of_tweets + ' tweets from file ' + most_common_hashtags_object.json_file
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Frequency'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Frequency: <b>{point.y}</b>'
        },
        series: [{
            name: 'Hashtag',
            data: most_common_hashtags_object.most_common,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y}',
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
	    };
	}
});
