require.config({
  baseUrl: './',
  paths: {
    jquery: './vendor/jquery/dist/jquery.min',
    underscore: './vendor/underscore/underscore.min',
    backbone: './vendor/backbone/backbone.min',
    'backbone.radio': './vendor/backbone-radio/backbone.radio.min',
    marionette: './vendor/backbone-marionette/backbone.marionette.min',
    text: './vendor/require-text/text.min',

    layouts: './layouts/',
    app: './app',
    modules: './modules/',
    controllers: './controllers/',
    models: './models/',
    collections: './collections/',
    views: './views/'
  },
  map: {
    '*': {
      css: './vendor/require-css/css.min' // Or whatever the path to require-css is
    }
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'backbone.radio': {
      deps: ['backbone'],
      exports: 'Backbone.Radio'
    },
    marionette: {
      deps: ['backbone', 'backbone.radio'],
      exports: 'Marionette'
    },
  }
});

require([
  'backbone',
  'app'
], function (Backbone, App) {
  // Init the app
  var app = new App();

  // Start the app
  app.start();
});
