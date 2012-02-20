ot.controllers.members = new Ext.Controller({
  index: function(options) {

    console.log('Call contactsList view from contacts controller');
    console.log(ot.currentCircleId);

    options = options || {};
    ot.views.viewport.setActiveItem(
      ot.views.contactsList,
      options.animation
    );
  },

  manuallyAdd: function(options){

    var manuallyAddMemberView = ot.views.manuallyAddMember;
    manuallyAddMemberView.reset();

    options = options || {};
    ot.views.viewport.setActiveItem(
      ot.views.manuallyAddMember,
      options.animation
    );
  },

  insertManually: function(options){
    console.log(options);
    var circle_id = ot.currentCircleId;
    var circleModel = Ext.ModelMgr.create({id: circle_id}, 'ot.models.Circle');
    var myUser = new ot.models.Member({name: options.name, email: options.email, phone: options.phone});
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
