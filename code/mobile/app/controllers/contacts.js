ot.controllers.contacts = new Ext.Controller({
  index: function(options) {
    console.log('Here we go!');
    console.log(options);
    options = options || {};
    ot.views.viewport.setActiveItem(
      ot.views.contactsList,
      options.animation
    );
  }
});
