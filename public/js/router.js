define(function(require){
	var 
		Marionette = require('marionette'),
		Controller = require('controller'),

		Router = Marionette.AppRouter.extend({
			appRoutes: {
				''            : 'home',
				'friends'   : 'friends',
				'mygists'     : 'myGists',
				'starred'     : 'starred',
				'tagged/:id/:tag_url' : 'tagged',
				'newgist'     : 'newGist',
				'chat'        : 'chat'
			},

			controller: new Controller
		})
	;

	return Router;
});