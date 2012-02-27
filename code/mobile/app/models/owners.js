ot.models.Owner = Ext.regModel('ot.models.Owner',{
    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'circle_id', type: 'id' }
    ]
});

Ext.regStore('ot.stores.Owner', {
    model: 'ot.models.Owner',
    autoLoad: true,
    sorters: 'name',
    proxy: {
        type: 'localstorage',
        id: 'ot-owners'
    }
});