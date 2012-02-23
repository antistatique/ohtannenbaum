ot.views.DrawOwner = Ext.extend(Ext.Panel, {
  styleHtmlContent: true,
  scroll: 'vertical',
  form: null,

  initComponent: function() {
    var that = this;
    this.dockedItems = [{
      xtype: 'toolbar',
      title: 'Organisteur',
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
          text: 'Go',
          ui: 'action',
          listeners: {
            tap: function () {
              Ext.Msg.confirm('Tirage au sort', 'En lançant le tirage au sort, tous les participants reçoivent un message. Cette action est irréversible. Voulez-vous continuer?', 
                function(btn){
                  if(btn == 'yes'){
                    var name = that.form.getValues().ownerName;
                    var email = that.form.getValues().ownerEmail;
                    var phone = that.form.getValues().ownerPhone;

                    if(!name || !email || !phone){
                      ot.pushNotification('Tous les champs sont obligatoires.');
                      return false;
                    }
                    
                    //If new circle title is unique
                    Ext.dispatch({
                      controller: ot.controllers.circles,
                      action: 'doDraw'
                    });
                  }
                }
              );
            }
          }
        }
      ]
    }];

    this.form = new Ext.form.FormPanel({
      items: [
          {
            id: 'ownerName',
            xtype: 'textfield',
            name : 'ownerName',
            label: 'Nom'
          },
          {
            id: 'ownerEmail',
            xtype: 'textfield',
            name : 'ownerEmail',
            label: 'Email'
          },
          {
            id: 'ownerPhone',
            xtype: 'textfield',
            name : 'ownerPhone',
            label: 'Mobile'
          }
      ]
    });

    var textPanel = new Ext.Panel({
      tpl: new Ext.XTemplate('Veuillez entrer vos informations d\'organisateur')
    });

    this.items = [textPanel, this.form];

    ot.views.ManuallyAddMember.superclass.initComponent.apply(this, arguments);
  },
  reset: function() {
    this.form.reset();
  },
});