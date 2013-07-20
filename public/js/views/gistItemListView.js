define(function(require){
	var
		$ 				= require('jquery'),
		_ 				= require('underscore'),
		Backbone		= require('backbone'),
		Marionette 		= require('marionette'),
		Handlebars      = require('handlebars'),
		GistItemView	= require('./gistItemView'),
		NoItemsView		= require('./NoItemsView'),
		GistItemList	= require('models/gistItemList'),
		
		GistItemListView = Marionette.CollectionView.extend({
			className: 'gist-item-container',
			itemView: GistItemView,
			emptyView: NoItemsView,
			collection: new GistItemList,
			initialize: function(){
				
			},
			getGistList: function(){
				var self = this;
				var gistItemList = new GistItemList;
				gistItemList.fetch({ data: $.param({page:100})}).done(function(res){
					self.collection.set(res.data);
					self.setFirstItemSelected();
					console.log('has next page : ' + res.hasNextPage);
				});
			},
			setFirstItemSelected: function(){
		    	$('.gist-item').first().addClass('selected');
		    },
		    events : {
				'click .gist-item' : 'onGistItemSelected'
			},
			onGistItemSelected : function(e){
				$('.gist-item').removeClass('selected');
				$(e.currentTarget).addClass('selected');
				$('.comments-badge').hide().show(500);
			}
		})
	;

	return GistItemListView;
});