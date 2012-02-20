ot.views.CircleDetail = Ext.extend(Ext.Panel, {
  styleHtmlContent: true,
  scroll: 'vertical',
  form: null,
  initComponent: function() {
    var me = this;
    console.log('Ok, my detail circle informations can be now displayed');

    var morebutton, titlebar, bottomDock, backButton;

    var actionSheet = new Ext.ActionSheet({
      items: [{
        text : 'Ajouter via le carnet d\'adresse',
        scope: this,
        handler : function(){
          me.onAddViaAddressBookAction();
          actionSheet.hide();
        }
      },{
        text : 'Cancel',
        scope : this,
        handler : function(){
          actionSheet.hide();
        }
      }]
    });

    moreButton = {
      itemId: 'moreButton',
      iconCls: 'add',
      iconMask: true,
      ui: 'plain',
      handler: function(){actionSheet.show()},
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

    var listMember = {
      xtype: 'list',
      store: Ext.StoreMgr.get('ot.stores.Member'),
      itemTpl: '{name}',
      listeners: {
        itemtap: function (list, index, item, e) {
          var record = list.getStore().getAt(index);
          Ext.dispatch({
            controller: ot.controllers.circles,
            action: 'show',
            id: record.getId()
          });
        }
      }
    };

    Ext.apply(this, {
      scroll: 'vertical',
      dockedItems: [ titlebar, moreButton ],
      items: [ listMember, actionSheet ]
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