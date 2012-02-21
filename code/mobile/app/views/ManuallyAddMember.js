ot.views.ManuallyAddMember = Ext.extend(Ext.Panel, {
  styleHtmlContent: true,
  scroll: 'vertical',
  form: null,

  initComponent: function() {
    var that = this;
    this.dockedItems = [{
      xtype: 'toolbar',
      title: 'Ajouter un contact',
      record: null,
      items: [
        {
          text: 'Back',
          ui: 'back',
          listeners: {
            tap: function () {
              Ext.dispatch({
                controller: ot.controllers.circles,
                action: 'show',
                animation: { type:'slide', direction:'right' }
              });
            }
          }
        },
        { xtype: 'spacer' },
        {
          id: 'saveManually',
          text: 'Sauver',
          ui: 'action',
          listeners: {
            tap: function () {
              console.log('Sauvegarde du contact crée manuellement');
              console.log(that.form);
              var name = that.form.getValues().name;
              var emailorphone = that.form.getValues().emailorphone;

              if(!name){
                ot.pushNotification('Le champ "nom" est obligatoire');
                return false;
              }

              if(!emailorphone){
                ot.pushNotification('Le champ "Email ou mobile" est obligatoire');
                return false;
              }

              //If new circle title is unique
              Ext.dispatch({
                controller: ot.controllers.members,
                action: 'insertManually',
                name: name,
                emailorphone: emailorphone
              });
            }
          }
        }
      ]
    }];

    this.form = new Ext.form.FormPanel({
      items: [
          {
            id: 'name',
            xtype: 'textfield',
            name : 'name',
            label: 'First name'
          },
          {
            id: 'emailorphone',
            xtype: 'textfield',
            fieldLabel: 'Entrez l\'email ou le numéro de téléphone mobile',   // = label de description du champ
            name : 'emailorphone',
            label: 'Email ou mobile'
          }
      ]
    });
    this.items = [this.form];


    ot.views.ManuallyAddMember.superclass.initComponent.apply(this, arguments);
  },
  reset: function() {
    this.form.reset();
  },
});