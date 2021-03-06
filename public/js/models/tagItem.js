define(function(require) {
  var
  Backbone = require('backbone'),

    TagItem = Backbone.Model.extend({
      initialize: function(options) {
        this.id = options ? options.id || null : null;
      },

      url: function() {
        if (this.id)
          return "/api/gist/tags/" + this.id;

        return "/api/gist/tags";
      }
    });

  return TagItem;
});
