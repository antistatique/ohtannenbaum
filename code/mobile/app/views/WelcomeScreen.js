ot.views.WelcomeScreen = Ext.extend(Ext.Panel, {
  fullscreen: true,
  scroll: 'vertical',
  style: "background-color:#024259",
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
      style: "width:100%; background:url('ressources/images/homepage.png') no-repeat center top; background-size:cover",
      flex:1
    });

    var secondPanel = new Ext.Panel({
      items: [bigButton],
      flex:0.2,
      style: "padding-top:25px"
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