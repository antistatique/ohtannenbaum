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
        text : 'Ajouter manuellement',
        scope: this,
        handler : function(){
          me.onAddManuallyAction();
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
      id: 'circleMembersList',
      xtype: 'list',
      store: Ext.StoreMgr.get('ot.stores.Member'),
      //itemTpl: '{name}',
      itemTpl: 
          '<div style="float:left"><span style="line-height:20px;">{name}</span>' +
            '<p style="font-size:7pt; margin:0; padding:0">{email}{phone}</p>' +
          '</div>' + 
            '<img src="ressources/images/trash-can.png" style="vertical-align: middle; float:right" onclick="Ext.getCmp(\'circleMembersList\').deleteMember({[xindex-1]})"/>' +
          '</span>'
      ,
      deleteMember: function (index) {
          console.log(index);
          var thatList = this;
          Ext.Msg.confirm('Confirmation', 'Êtes-vous sûr de vouloir supprimer ce membre?', 
            function(btn){
              if(btn == 'yes'){
                console.log('Choose yes');
                var store = thatList.getStore();
                var record = store.getAt(index);
                store.remove(record);
                Ext.dispatch({
                  controller: ot.controllers.circles,
                  action: 'show'
                });
              }
            }
          );
          // var store = this.getStore();
          // var record = store.getAt(index);
          // console.log('removing ' + record.data.myName);
          // store.remove(record);
      },
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
    Ext.dispatch({
      controller: ot.controllers.contacts,
      action: 'index',
      animation: { type:'slide', direction:'right' }
    });
  },
  onAddManuallyAction: function(){
    Ext.dispatch({
      controller: ot.controllers.members,
      action: 'manuallyAdd',
      animation: { type:'slide', direction:'right' }
    });
  }
});