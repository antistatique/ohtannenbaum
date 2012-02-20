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
              var firstname = that.form.getValues().first;
              var lastname = that.form.getValues().last;
              var email = that.form.getValues().email;
              var phone = that.form.getValues().phone;

              if(!firstname){
                ot.pushNotification('Le champ prénom est obligatoire');
                return false;
              }

              if(!lastname){
                ot.pushNotification('Le champ nom est obligatoire');
                return false;
              }

              var fullname = firstname + ' ' + lastname;
              //If new circle title is unique
              Ext.dispatch({
                controller: ot.controllers.members,
                action: 'insertManually',
                name: fullname,
                email: email,
                phone: phone
              });
            }
          }
        }
      ]
    }];

    this.form = new Ext.form.FormPanel({
      items: [
          {
            id: 'first',
            xtype: 'textfield',
            name : 'first',
            label: 'First name'
          },
          {
            id: 'last',
            xtype: 'textfield',
            name : 'last',
            label: 'Last name'
          },
          {
            id: 'email',
            xtype: 'textfield',
            name : 'email',
            label: 'Email'
          },
          {
            id: 'phone',
            xtype: 'textfield',
            name : 'phone',
            label: 'Phonenumber'
          },
      ]
    });
    this.items = [this.form];


    ot.views.ManuallyAddMember.superclass.initComponent.apply(this, arguments);
  },
  reset: function() {
    this.form.reset();
  },
});