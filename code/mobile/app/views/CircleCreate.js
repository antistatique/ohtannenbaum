ot.views.CircleCreate = Ext.extend(Ext.Panel, {
  styleHtmlContent: true,
  scroll: 'vertical',
  form: null,
  pushNotification: function(message){
    if(navigator.notification){
      navigator.notification.alert(message, function(){}, 'Erreur lors de la création du cercle', 'Ok');
    }else{
      alert(message);
    }
    return false;
  },
  initComponent: function() {
    var that = this;
    this.form = new Ext.form.FormPanel({
      id: "circleForm",
      items: [{
        id: 'circleTitle',
        name: 'circleTitle',
        label: 'Titre du cercle',
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
              var existingCircles = window.localStorage.getItem("ot-circles");
              var existingCirclesSplitted = existingCircles.split(',');
              //If title input is empty, break
              if(!circleTitle){
                that.pushNotification('Le champ titre est obligatoire');
                return false;
              }
              var titleAlreadyExist = false;
              if(!!existingCircles){
                //Loop on each existing circle
                Ext.each(existingCirclesSplitted, function(index, title){
                  //Get current existing circle title
                  var storedTitle = JSON.parse(window.localStorage.getItem('ot-circles-'+index)).title;
                  //If new circle title already exists, break
                  if(circleTitle == storedTitle){
                    titleAlreadyExist = true;
                    return false;
                  }
                });
              }
              
              if(titleAlreadyExist){
                that.pushNotification('Un cercle portant le même titre existe déjà');
                return false;
              }

              //If new circle title is unique
              Ext.dispatch({
                controller: ot.controllers.circles,
                action: 'insert',
                title: circleTitle
              });
            }
          }
        }
      ]
    }];
    this.items = [this.form];
    // call parent method
    ot.views.CircleCreate.superclass.initComponent.apply(this, arguments);
  },

  updateWithRecord: function(record) {
    var form = Ext.getCmp('circleForm');
    console.log('Ahhhh');
    this.load(record);
  }
});