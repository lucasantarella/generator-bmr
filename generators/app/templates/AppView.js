// Filename: /views/AppView.js

define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'views/sidebar/sidebar',
  'models/sidebar/entry',
  'models/sidebar/entries'
], function ($, _, Backbone, Marionette) {
  const AppView = Marionette.View.extend({

    tagName: 'div',

    id: 'main-wrapper',

    template: _.template(''),

    regions: {},

    onRender: function () {
    }

  });

  return AppView;
});
