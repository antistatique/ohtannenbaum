ot.views.CircleCreate = Ext.extend(Ext.Panel, {
  styleHtmlContent: true,
  scroll: 'vertical',
  form: null,

  initComponent: function() {
    var that = this;
    this.form = new Ext.form.FormPanel({
      id: "circleForm",
      items: [{
        id: 'circleTitle',
        name: 'circleTitle',
        label: 'Titre',
        xtype: 'textfield' 
      }],
    });
    this.dockedItems = [{
      xtype: 'toolbar',
      title: 'Créer un cercle',
      record: null,

      items: [
        {
          text: 'Back',
          ui: 'back',
          listeners: {
            tap: function () {
              Ext.dispatch({
                controller: ot.controllers.circles,
                action: 'index',
                animation: { type:'slide', direction:'right' }
              });
            }
          }
        },
        { xtype: 'spacer' },
        {
          id: 'save',
          text: 'Sauver',
          ui: 'action',
          listeners: {
            tap: function () {
              //Get title from new circle form
              var circleTitle = that.form.getValues().circleTitle;
              var titleAlreadyExist = false;
              if(!!circleTitle){
                //If new circle title is unique
                Ext.dispatch({
                  controller: ot.controllers.circles,
                  action: 'insert',
                  title: circleTitle
                });
              }else{
                ot.pushNotification('Le champ titre est obligatoire');
              }
            }
          }
        }
      ]
    }];
    this.items = [this.form];
    // call parent method
    ot.views.CircleCreate.superclass.initComponent.apply(this, arguments);
  },

  reset: function() {
    this.form.reset();
  },

  updateWithRecord: function(record) {
    var form = Ext.getCmp('circleForm');
    console.log('Ahhhh');
    this.load(record);
  }
});