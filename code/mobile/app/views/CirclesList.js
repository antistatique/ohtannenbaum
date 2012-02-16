ot.views.CirclesList = Ext.extend(Ext.Panel, {
  styleHtmlContent: true,
  scroll: 'vertical',
  form: null,

  initComponent: function() {
    var that = this;
    this.dockedItems = [{
      xtype: 'toolbar',
      title: 'Oh Tannenbaum',
      record: null,
      items: [
        { xtype: 'spacer' },
        {
          xtype: 'button',
          ui: 'plain',
          iconMask: true,
          iconCls: 'add',
          handler: function() {
            Ext.dispatch({
              controller: ot.controllers.circles,
              action: 'add' 
            });
          }
        }
      ]
    }];

    this.items = [{
      xtype: 'list',
      store: Ext.getStore('ot.stores.Circle'),
      itemTpl: '{title}',
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
    }];
    ot.views.CircleCreate.superclass.initComponent.apply(this, arguments);
  },
});