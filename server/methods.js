var URL_PREFIX = "http://localhost:8888"

Meteor.methods({

    getLdaTopics: function(passes, num_topics, filename) {
        var url = URL_PREFIX + "/lda?passes=" + passes + "&num_topics=" + num_topics + "&json=" + filename;

        var result = Meteor.http.get(url);
            
        return JSON.parse(result.content);
    },

    getHdpTopics: function(num_topics, filename) {
        var url = URL_PREFIX + "/hdp?num_topics=" + num_topics + "&json=" + filename;

        var result = Meteor.http.get(url);

        return JSON.parse(result.content);
    },

    getMostCommonHashtags: function(num_hashtags, filename) {
        var url = URL_PREFIX + "/hashtags/common?num_hashtags=" + num_hashtags + "&json=" + filename;

        var result = Meteor.http.get(url);

        return JSON.parse(result.content);
    },

    getTopicDistributionForAuthor: function(author) {
        var url = URL_PREFIX + "/author?user=" + author;

        var result = Meteor.http.get(url);

        return JSON.parse(result.content);
    },

    getSimpleSentiment: function(text, classifier) {
        var url = URL_PREFIX + "/sentiment?text=" + text + "&classifier=" + classifier;

        var result = Meteor.http.get(url);

        return JSON.parse(result.content);
    },

    getTwitterSearch: function(query, count, classifier, result_type) {
        var url = URL_PREFIX + "/sentiment/search?query=" + query + "&count=" + count + "&classifier=" + classifier + "&result_type=" + result_type;

        var result = Meteor.http.get(url);

        console.log(result.content);

        return JSON.parse(result.content);
    },

});
