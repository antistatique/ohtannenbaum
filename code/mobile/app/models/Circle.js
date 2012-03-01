ot.models.Circle = Ext.regModel('ot.models.Circle', {
    fields: [
        { name: 'id', type: 'int' },
        { name: 'title', type: 'string' },
        { name: 'created_at', type: 'date', dateFormat: 'c' },
        { name: 'drawDate', type: 'date', dateFormat: 'c'}
    ],
    
    associations: [
        { type: 'hasMany', model: 'ot.models.Member', name: 'Members' }
    ]
});

Ext.regStore('ot.stores.Circle', {
    model: 'ot.models.Circle',
    autoLoad: true,
    sorters: 'title',
    proxy: {
        type: 'localstorage',
        id: 'ot-circles'
    },
    getGroupString: function (record) {
        if (record && (record.data.drawDate != null)) {
            return 'Déjà tirés au sort'
        } else {
            return 'En cours';
        }
    }
});