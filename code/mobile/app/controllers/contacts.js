ot.controllers.contacts = new Ext.Controller({
  index: function(options) {
    options = options || {};
    ot.views.viewport.setActiveItem(
      ot.views.contactsList,
      options.animation
    );
  },
  add: function(options){
    options = options || {};
    //Récupération du circle id
    var circle_id = ot.currentCircleId;
    var emailAddress = '';
    var phoneNumber = '';
    if(options.record.data.emails && options.selected == 'email'){
      emailAddress = options.record.data.emails[0].value;
    }else{
      phoneNumber = options.record.data.phoneNumbers[0].value;
    }

    var circleModel = Ext.ModelMgr.create({id: circle_id}, 'ot.models.Circle');
    var myUser = new ot.models.Member({name: options.record.data.givenName + ' ' + options.record.data.familyName, email: emailAddress, phone: phoneNumber, circle_id: ot.currentCircleId });
    circleModel.Members().add(myUser);

    var store = Ext.getStore('ot.stores.Member');

    store.add(myUser);
    store.sync();

    store = Ext.getStore('ot.stores.Circle');

    var detailView = ot.views.circleDetail,
        circle = store.getById(circle_id);

    if (circle) {
      detailView.updateWithRecord(circle);
      ot.views.viewport.setActiveItem(
        detailView,
        options.animation
      );
    }
  }
});
