ot.controllers.contacts = new Ext.Controller({
  index: function(options) {

    console.log('Call contactsList view from contacts controller');
    console.log(ot.currentCircleId);

    options = options || {};
    ot.views.viewport.setActiveItem(
      ot.views.contactsList,
      options.animation
    );
  },
  add: function(options){
    options = options || {};
    console.log(options);
    //Récupération du circle id
    var circle_id = ot.currentCircleId;
    //Récupération du cercle stocké
    //var myCircle = new ot.models.Circle({id: circle_id});

    var emailAddress = '';
    if(options.record.data.emails){
      emailAddress = options.record.data.emails[0].value;
    }
    var phoneNumber = '';
    if(options.record.data.phoneNumbers){
      phoneNumber = options.record.data.phoneNumbers[0].value;
    }

    var circleModel = Ext.ModelMgr.create({id: circle_id}, 'ot.models.Circle');
    var myUser = new ot.models.Member({name: options.record.data.givenName + ' ' + options.record.data.familyName, email: emailAddress, phone: phoneNumber});
    circleModel.Members().add(myUser);

    var store = Ext.getStore('ot.stores.Member');

    store.add(myUser);
    store.sync();

    var detailView = ot.views.circleDetail,
        circle = store.getById(circle_id);

    if (circle) {
      //detailView.updateWithRecord(circle);
      ot.views.viewport.setActiveItem(
          detailView,
          options.animation
      );
    }
  }
});
