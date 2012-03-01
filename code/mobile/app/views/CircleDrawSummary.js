ot.views.CircleDrawSummary = Ext.extend(Ext.Panel, {
  styleHtmlContent: true,
  scroll: 'vertical',
  form: null,
  actionSheet: null,
  drawButton: null,
  initComponent: function() {
    var me = this;
    var morebutton, titlebar, bottomDock, backButton, tirage, drawButton, drawPanel;

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
      title: 'current circle name',
      items: [backButton, {xtype: 'spacer'}]
    };

    var listMember = {
      id: 'circleMembersList',
      xtype: 'list',
      store: Ext.StoreMgr.get('ot.stores.Member'),
      itemTpl: 
        '<div style="float:left"><span style="line-height:20px;">{name}</span>' +
          '<p style="font-size:7pt; margin:0; padding:0">{email}{phone}</p>' +
        '</div>'
      ,
    };

    var infoPanel = this.infoPanel = new Ext.Panel({
      tpl: new Ext.XTemplate('Tirage au sort effectué le {FormattedDrawDate}')
    });

    
    /** FormPanel **/
    this.drawButton = new Ext.Button({
      applyTo:'button-div',
      text: 'Ré-envoyer les messages',
      handler: function(){
        Ext.dispatch({
          controller: ot.controllers.circles,
          action: 'resendNotifications',
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

    Ext.apply(this, {
      scroll: 'vertical',
      dockedItems: [ titlebar ],
      items: [ infoPanel, drawPanel , listMember ]
    });

    ot.views.CircleDrawSummary.superclass.initComponent.apply(this, arguments);
  },

  updateWithRecord: function(record) {
    console.log('Mise a jour de la vue summaryDraw');
    this.record = record;
    console.log(this.items);
    
    var toolbar = this.getDockedItems()[0];
    toolbar.setTitle(record.get('title'));

    var recordDate = record.get('drawDate');

    var recordDate = recordDate.format('d/m/Y à H:i');

    this.items.items[0].update({
      FormattedDrawDate: recordDate
    });
  },
  onBackAction: function(){
     Ext.dispatch({
      controller: ot.controllers.circles,
      action: 'index',
      animation: { type:'slide', direction:'right' }
    });
  }
});