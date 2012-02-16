ot.views.CircleDetail = Ext.extend(Ext.Panel, {
  styleHtmlContent: true,
  scroll: 'vertical',
  form: null,
  initComponent: function() {
    console.log('Ok, my detail circle informations can be now displayed');

    var morebutton, titlebar, bottomDock, backButton;

    moreButton = {
      itemId: 'moreButton',
      iconCls: 'add',
      iconMask: true,
      ui: 'plain',
      handler: this.displayBottonDock,
      scope: this
    };

    backButton = {
      itemId: 'backButton',
      ui: 'back',
      text: 'Retour',
      handler: this.onBackAction,
      scope: this
    };

    titlebar = {
      dock: 'top',
      xtype: 'toolbar',
      title: 'Oh Tannenbaum',
      items: [backButton, {xtype: 'spacer'}, moreButton]
    };


    /*Bottomdock items*/
    var bottomDocksButtons = [
      new Ext.Button({
        applyTo:'addViaAddressBookButton',
        text: 'Ajouter vie le carnet d\'adresse',
        handler:this.onAddViaAddressBookAction,
        scope: this
      }),
      new Ext.Button({
        applyTo:'addManually',
        text: 'Ajouter manuellement',
        handler:this.onAddViaAddressBookAction,
        scope: this
      }),
      new Ext.Button({
        applyTo:'cancelButton',
        text: 'Annuler',
        handler:this.onAddViaAddressBookAction,
        scope: this
      })
    ];

    bottomDock = new Ext.Panel({
      xtype : 'panel',
      title : 'Child Panel 1',
      frame : true,
      html : 'Dock du bas',
      style : {
        'margin' : '0 auto',
        'background-color' : '#c00'
      },
      items: bottomDocksButtons
    });

    Ext.apply(this, {
      scroll: 'vertical',
      dockedItems: [ titlebar, moreButton ],
      items: [bottomDock]
    });
    
    ot.views.CircleDetail.superclass.initComponent.apply(this, arguments);
  },
  updateWithRecord: function(record) {
    this.record = record;
    console.log(this.items);
    //this.items.items[0].update(record.data);
    
    var toolbar = this.getDockedItems()[0];
    toolbar.setTitle(record.get('title'));
    //toolbar.getComponent('edit').record = record;
  },
  displayBottonDock: function(){
    console.log('Ok, now i can display the bottom dock');
  },
  onBackAction: function(){
     Ext.dispatch({
      controller: ot.controllers.circles,
      action: 'index',
      animation: { type:'slide', direction:'right' }
    });
  },
  onAddViaAddressBookAction: function(){
    console.log('Call contacts controller');
    Ext.dispatch({
      controller: ot.controllers.contacts,
      action: 'index',
      animation: { type:'slide', direction:'right' }
    });
  }
});