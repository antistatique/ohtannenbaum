Ext.data.ProxyMgr.registerType("contactstorage",
    Ext.extend(Ext.data.Proxy, {
        create: function(operation, callback, scope) {
        },
        read: function(operation, callback, scope) {
            var thisProxy = this;
            navigator.contacts.find(
                ['id', 'name', 'emails', 'phoneNumbers', 'addresses'],
                function(deviceContacts) {
                    //loop over deviceContacts and create Contact model instances
                    var contacts = [];
                    for (var i = 0; i < deviceContacts.length; i++) {
                        var deviceContact = deviceContacts[ i ];
                        var contact = new thisProxy.model({
                            id: deviceContact.id,
                            givenName: deviceContact.name.givenName,
                            familyName: deviceContact.name.familyName,
                            emails: deviceContact.emails,
                            phoneNumbers: deviceContact.phoneNumbers
                        });
                        contact.deviceContact = deviceContact;
                        contacts.push(contact);
                    }
                    //return model instances in a result set
                    operation.resultSet = new Ext.data.ResultSet({
                        records: contacts,
                        total  : contacts.length,
                        loaded : true
                    });
                    //announce success
                    operation.setSuccessful();
                    operation.setCompleted();
                    //finish with callback
                    if (typeof callback == "function") {
                        callback.call(scope || thisProxy, operation);
                    }
                },
                function (e) { console.log('Error fetching contacts'); },
                {multiple: true}
            );
        },
        update: function(operation, callback, scope) {
        },
        destroy: function(operation, callback, scope) {
        }
    })
);

ot.models.Contact = Ext.regModel("ot.models.Contact", {
    fields: [
        {name: "id", type: "int"},
        {name: "givenName", type: "string"},
        {name: "familyName", type: "string"},
        {name: "emails", type: "auto"},
        {name: "phoneNumbers", type: "auto"},
    ],
    proxy: {
        type: "contactstorage"
    }
});

ot.stores.contacts = new Ext.data.Store({
    model: "ot.models.Contact",
    sorters: 'familyName',
    getGroupString : function(record) {
        if('' == record.get('familyName')) {
            return '-';
        }
        return record.get('familyName')[0];
    }
});