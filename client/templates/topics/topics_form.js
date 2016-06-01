Template.topicsForm.onRendered(function() {

	$('[data-toggle="tooltip"]').tooltip();


    Meteor.call('getLdaTopics', function(err, response) {
    	console.log(response);
        Session.set('lda_topics', response);
    });


});

Template.topicsForm.events({
    'click .run-lda': function() {
        var passes = $(".number-of-passes-input").val();
        var topics = $(".number-of-topics-input").val();
        var filename = $("#fileName").val().split(".")[0];

        Session.set('lda_string', '');
        Session.set('wait', true);

		Meteor.call('getLdaTopics', passes, topics, filename, function(err, response) {
			Session.set('lda_topics', response);
			Session.set('lda_string', "(file: " + filename + ", passes: " + passes + ", topics: " + topics + ")");
            Session.set('wait', false);
		});

    },

    'click .run-hdp': function() {
        var topics = $(".number-of-topics-input").val();
        var filename = $("#fileName").val().split(".")[0];

        Session.set('hdp_string', '');
        Session.set('wait', true);

		Meteor.call('getHdpTopics', topics, filename, function(err, response) {
			Session.set('hdp_topics', response);
			Session.set('hdp_string', "(file: " + filename + ", " + "topics: " + topics + ")");
            Session.set('wait', false);
		});

    },
});
