define(function(require){
  var
    $            = require('jquery'),
    _            = require('underscore'),
    Backbone     = require('backbone'),
    Marionette   = require('marionette'),    
    Handlebars   = require('handlebars'),
    Spinner      = require('spin'),
    NoItemsView  = require('../noItemsView'),
    constants    = require('constants'),
    util         = require('util'),
    async        = require('async'),
    service      = require('service'),
    File         = require('models/file'),
    nicescroll   = require('nicescroll'),
    FriendsItemView = require('./friendsItemView'),
    Friends      = require('models/friends'),    
    jqueryui     = require('jqueryui'),
    postalWrapper= require('postalWrapper'),    
    Application  = require('application'),
    
    FriendsItemListView = Marionette.CollectionView.extend({
      className: 'friends-item-container',
      itemView: FriendsItemView,      

      initialize: function(){   
        _.bindAll(this, 'getWatchingList', 'addWatch', 'removeItemView', 'onDomRefresh');
        this.collection = new Friends;      
        Application.reqres.setHandler(constants.ADD_TO_WATCH, this.addWatch)
        this.on('itemview:close', this.removeItemView);
      },

      removeItemView: function(childView, model){
        this.collection.remove(model);
        console.log('collection length=' + this.collection.length);
      },

      getWatchingList: function(){
        var self = this;
        // this.collection.add([{}, {}, {}, {}]);
        var friends = new Friends({mode: 'watch'});
        friends.fetch().done(function(res){
          self.collection.set(res);
          self.setFirstItemSelect();
        });
      },

      setFirstItemSelect: function(){
        var self = this;
        // self.$el.find('.row-fluid').first().trigger('click');
        if (self.collection.length > 0) {
          this.children.findByModel(self.collection.at(0)).viewClicked(self.collection.at(0));
        }
      },

      addWatch: function(model){
        this.isAddedFromFriends = true;
        var beforeLength = this.collection.length;
        var after = this.collection.add(model);
        if(beforeLength !== after.length){
          return true;
        }else{
          return false;
        }
      },

      onAfterItemAdded: function(itemView){
        if (this.isAddedFromFriends){
          itemView.$el.hide().show('bounce');
          var list = document.querySelector('.friends-item-list');
          list.scrollTop = list.scrollHeight;
          this.isAddedFromFriends = false;
        }
      },

      onDomRefresh: function(){
        var self = this;
        var firstIndex, updateIndex;

        $('.friends-item-container' ).sortable({
          delay: 100, 
          distance: 15, 
          tolerance: 'pointer',
          revert: 'invalid',
          placeholder: 'placeholder',
          forceHelperSize: true,
          update: function(event, ui){
            var index = self.$el.find('.row-fluid').index(self.$el.find('.row-fluid.selected'));
            console.log('update=' + index);
            var loginId = self.$el.find('.row-fluid.selected .friends-item').attr('data-login');
            console.log('loginId=' + loginId);
          }
        });
        $('.friends-item-container' ).disableSelection();
      },

      onRender : function(){
        $('.friends-item-list').niceScroll({cursorcolor: '#eee'});
      },

      onClose: function(){
        Application.reqres.removeHandler(constants.ADD_TO_WATCH);
      }
    })
  ;

  return FriendsItemListView;
});