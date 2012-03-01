ot.views.CirclesList = Ext.extend(Ext.Panel, {
  scroll: 'vertical',
  // layout: {
  //   type: "vbox",
  //   align: "stretch"
  // },
  layout: 'fit',
  totiti: null,
  initComponent: function() {
    var that = this;
    var dockedItems = [{
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


    Ext.apply(this, {
      dockedItems: dockedItems,
      items: [{
        flex: 1,
        xtype: 'list',
        store: Ext.getStore('ot.stores.Circle'),
        itemTpl: '{title}',
        grouped: true,
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
      }]
    });

    ot.views.CirclesList.superclass.initComponent.apply(this, arguments);
  },
});