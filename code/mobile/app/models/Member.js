ot.models.Member = Ext.regModel('ot.models.Member', {
    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'angelOf', type: 'int' },
        { name: 'luckyOf', type: 'int' },
        { name: 'circle_id', type: 'int' }
    ],
    Associations: [
        {type: 'belongsTo', model: 'ot.models.Circle'}
    ]
});

Ext.regStore('ot.stores.Member', {
    model: 'ot.models.Member',
    autoLoad: true,
    sorters: 'name',
    proxy: {
        type: 'localstorage',
        url: '/members',
        id: 'ot-members'
    }
});
