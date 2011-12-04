ot.views.CirclesList = Ext.extend(Ext.Panel, {
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Circles',
        items: [{
            xtype: 'spacer'
        }, {
            xtype: 'button',
            //text: "Add",
            ui: 'plain',
            iconMask: true,
            iconCls: 'add',
            handler: function() {
                Ext.dispatch({
                   controller: ot.controllers.circles,
                   action: 'add' 
                });
            }
        }]
    }],
    layout: 'fit',
    items: [{
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
    }],
    initComponent: function() {
        
        //ot.stores.circles.load();
        ot.views.CirclesList.superclass.initComponent.apply(this, arguments);
    }
});