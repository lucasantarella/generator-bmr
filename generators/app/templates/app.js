// Filename: app.js

define([
  'require',
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'views/AppView',
  'modules/info',
  'modules/authentication',
  'modules/reports'
], function (require, $, _, Backbone, Marionette, AppView) {
  var App = Marionette.Application.extend({

    // Provide a helper function for navigating within modules
    navigate: function (route, options) {
      options || (options = {});
      Backbone.history.navigate(route, options);
    },

    // Helper method for getting the current route
    getCurrentRoute: function () {
      return Backbone.history.fragment;
    },

    // Define the element where the application will exist
    region: 'body',

    onStart: function () {
      // Show the root view
      this.showView(new AppView());

      // Init modules:
      var info = new InfoModule({app: this});
      var authentication = new AuthenticationModule({app: this});
      var reports = new ReportsModule({app: this});

      // Start history
      Backbone.history.start({
        // PushState: true,
        // root: '/',
      });
    }

  });

  return App;
});
