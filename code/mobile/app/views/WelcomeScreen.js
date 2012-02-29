ot.views.WelcomeScreen = Ext.extend(Ext.Panel, {
  fullscreen: true,
  scroll: 'vertical',
  layout: {
    type: "vbox"
  },
  initComponent: function() {
    var addButton, titlebar, welcomeText, formPanel, AddCircleBigButton;

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

    var bigButton =  new Ext.Button({
      applyTo:'circleCreateButton',
      text: 'Créer mon premier cercle',
      handler:this.onAddAction,
      scope: this
    });

    var firstPanel = new Ext.Panel({
      html: 'Bienvenue sur l\'application<br />Oh Tannenbaum.<br />Créez simplement vos groupes<br />pour le tirage au sort.',
      style: "width:100%; background:url('ressources/images/sapin.jpg') no-repeat center 10px; padding-top:220px; text-align:center; padding-bottom:50px;",
    });

    var secondPanel = new Ext.Panel({
      items: [bigButton]
    });

    this.items = [firstPanel, secondPanel];
    this.dockedItems = [ titlebar ];

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