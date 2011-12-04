ot.models.Circle = Ext.regModel('ot.models.Circle', {
    fields: [
        { name: 'id', type: 'int' },
        { name: 'title', type: 'string' },
        { name: 'created_at', type: 'date', dateFormat: 'c' }
    ]
    
    //validations: [...]
});

Ext.regStore('ot.stores.Circle', {
    model: 'ot.models.Circle',
    autoLoad: true,
    sorters: 'title',
    proxy: {
        type: 'localstorage',
        id: 'ot-circles'
    }
});