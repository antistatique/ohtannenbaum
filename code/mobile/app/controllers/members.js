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
    console.log('Call to inser manually controller of member');
    //Recherche globale de chaque occurence du caractère @
    var containEmail = new RegExp("@", "g");
    //Contient la valeur du champ "Email ou mobile" du formulaire d'ajout manuel de membre.
    var emailorphone = options.emailorphone;

    var email = '';
    var phone = '';

    //Définit si la valeur entrée dans le champ "Email ou mobile" du formulaire d'ajout manuel de membre contient une adresse email ou un numero de téléphone
    //Assigne une valeur à l'une ou l'autre des variables en fonction du résultat de l'expression régulière.
    if(containEmail.test(emailorphone)){
      email = emailorphone;
    }else{
      phone = emailorphone;
    }

    console.log(options);
    var circle_id = ot.currentCircleId;
    var circleModel = Ext.ModelMgr.create({id: circle_id}, 'ot.models.Circle');
    var myUser = new ot.models.Member({name: options.name, email: email, phone: phone});
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
