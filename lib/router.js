Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound'
});

Router.map( function () {
	this.route('sentiment', {
	  path: '/'
	});
	this.route('topics', {
	  path: '/topics'
	});
	this.route('hashtags', {
	  path: '/hashtags'
	});
	this.route('author', {
	  path: '/author'
	});
});
