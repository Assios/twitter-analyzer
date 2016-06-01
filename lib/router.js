Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound'
});

Router.map( function () {
	this.route('topics', {
	  path: '/'
	});
	this.route('hashtags', {
	  path: '/hashtags'
	});
	this.route('author', {
	  path: '/author'
	});
	this.route('simpleSentiment', {
	  path: '/sentiment'
	});
});
