ot.views.WelcomeScreen = Ext.extend(Ext.Panel, {
  styleHtmlContent: true,
  scroll: 'vertical',
  form: null,
  initComponent: function() {
    var addButton, titlebar, welcomeText, formPanel, AddCircleBigButton;

    //*Toolbar*//
    addButton = {
      itemId: 'addCircleButton',
      iconCls: 'add',
      iconMask: true,
      ui: 'plain',
      handler: this.onAddAction,
      scope: this
    };

    titlebar = {
      dock: 'top',
      xtype: 'toolbar',
      title: 'Oh Tannenbaum',
      items: [{xtype: 'spacer'}, addButton]      
    };

    /** Text panel **/
    welcomeText = '<div class="welcomeScreen"><img src="ressources/images/sapin.jpg"/><br />Bienvenue sur l\'application<br />Oh Tannenbaum.<br />Créez simplement vos groupes<br />pour le tirage au sort.</div>';
    var textPanel = new Ext.Panel({
      title: 'My Text panel',
      html: welcomeText,
      style: {
        "text-align": "center"
      }
    });


    /** FormPanel **/
    AddCircleBigButton = new Ext.Button({
      applyTo:'button-div',
      text: 'Créer mon premier cercle',
      handler:this.onAddAction,
      scope: this
    });

    formPanel = new Ext.form.FormPanel({applyTo:Ext.getBody(),
      xtype : 'panel',
      title : 'Child Panel 1',
      frame : true,
      items : [AddCircleBigButton]
    });

    Ext.apply(this, {
      scroll: 'vertical',
      dockedItems: [ titlebar, addButton ],
      items: [ textPanel, formPanel ]
    });

    ot.views.CircleCreate.superclass.initComponent.apply(this, arguments);
  },
  onAddAction: function(){
    console.log('AQdd');
    Ext.dispatch({
      controller: ot.controllers.circles,
      action: 'add' 
    })
  }
});