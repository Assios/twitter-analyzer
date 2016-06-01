Template.topics.onRendered(function() {

	$('[data-toggle="tooltip"]').tooltip();


	/*
    Meteor.call('getLdaTopics', function(err, response) {
    	console.log(response);
        Session.set('lda_topics', response);
    });

    Meteor.call('getHdpTopics', function(err, response) {
    	console.log(response);
        Session.set('hdp_topics', response);
    });

	*/

});

Template.topics.helpers({
	lda_topics: function() {
		return Session.get("lda_topics").topics;
	},

	hdp_topics: function() {
		return Session.get("hdp_topics").topics;
	},

	inc: function(index) {
		$('[data-toggle="tooltip"]').tooltip();
		return ++index;
	},

	lda_string: function() {
		return Session.get("lda_string");
	},

	hdp_string: function() {
		return Session.get("hdp_string");
	},

	processing: function() {
		return Session.get("wait");
	},
});
