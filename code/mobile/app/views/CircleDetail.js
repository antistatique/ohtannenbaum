ot.views.CircleDetail = Ext.extend(Ext.Panel, {
  styleHtmlContent: true,
  scroll: 'vertical',
  form: null,
  actionSheet: null,
  drawButton: null,
  initComponent: function() {
    var me = this;
    var morebutton, titlebar, bottomDock, backButton, tirage, drawButton, drawPanel;

    this.actionSheet = new Ext.ActionSheet({
      items: [{
        text : 'Ajouter via le carnet d\'adresse',
        scope: me,
        handler : function(){
          this.onAddViaAddressBookAction();
          this.actionSheet.hide();
        }
      },{
        text : 'Ajouter manuellement',
        scope: me,
        handler : function(){
          this.onAddManuallyAction();
          this.actionSheet.hide();
        }
      },{
        text : 'Cancel',
        scope : me,
        handler : function(){
          this.actionSheet.hide();
        }
      }]
    });

    moreButton = {
      itemId: 'moreButton',
      iconCls: 'add',
      iconMask: true,
      ui: 'plain',
      handler: function(){this.actionSheet.show()},
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

    var infoPanel = this.infoPanel = new Ext.Panel({
      tpl: new Ext.XTemplate('{infoText}'),
      style: "text-align:center"
    });

    
    /** FormPanel **/
    this.drawButton = new Ext.Button({
      applyTo:'button-div',
      text: 'Tirage au sort',
      handler: function(){
        Ext.dispatch({
          controller: ot.controllers.circles,
          action: 'drawOwnerEdit',
          animation: { type:'slide', direction:'right' }
        });
      },
      scope: this
    });

    drawPanel = new Ext.form.FormPanel({applyTo:Ext.getBody(),
      xtype : 'panel',
      title : 'draw Panel',
      frame : true,
      items : [this.drawButton]
    });

    this.drawButton.disable();

    Ext.apply(this, {
      scroll: 'vertical',
      dockedItems: [ titlebar ],
      items: [ infoPanel, drawPanel , listMember ]
    });

    ot.views.CircleDetail.superclass.initComponent.apply(this, arguments);
  },

  updateWithRecord: function(record) {
    this.record = record;
    console.log(this.items);
    
    var toolbar = this.getDockedItems()[0];
    toolbar.setTitle(record.get('title'));

    var memberListLength = Ext.StoreMgr.get('ot.stores.Member').getCount();

    if(memberListLength >= 3){
          
      this.infoPanel.update({
        infoText: 'Vous pouvez ajouter d\'autres participants ou faire le tirage au sort'
      });
      this.drawButton.enable();
    }else{
      this.infoPanel.update({
        infoText: 'Ajoutez encore ' + (3 - memberListLength) + ' membre(s) minimum pour faire le tirage au sort'
      });
      this.drawButton.disable();
    }
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