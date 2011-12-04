ot.views.CircleDetail = Ext.extend(Ext.Panel, {
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Circle detail',
        record: null,
        items: [
            {
                text: 'Back',
                ui: 'back',
                listeners: {
                    tap: function () {
                        Ext.dispatch({
                            controller: ot.controllers.circles,
                            action: 'index',
                            animation: { type:'slide', direction:'right' }
                        });
                    }
                }
            },
            { xtype: 'spacer' },
            {
                id: 'edit',
                text: 'Edit',
                ui: 'action',
                listeners: {
                    tap: function () {
                        Ext.dispatch({
                            controller: ot.controllers.circles,
                            action: 'edit',
                            id: this.record.getId()
                        });
                    }
                }
            }
        ]
    }],
    styleHtmlContent: true,
    scroll: 'vertical',
    items: [
        {
            id: "circleInfo",
            tpl:[
                '<h4>Circle detail panel</h4>',
                '<p>{title} (id: {id})</p>',
                '<p>created on: {created_at}</p>',
            ]
        }
    ],
    
    updateWithRecord: function(record) {
        
        this.record = record;
        console.log(this.items);
        this.items.items[0].update(record.data);
        
        var toolbar = this.getDockedItems()[0];
        toolbar.setTitle(record.get('title'));
        toolbar.getComponent('edit').record = record;
    }
});