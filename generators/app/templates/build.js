({
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
  name: './main',
  out: 'main-built.js'
});