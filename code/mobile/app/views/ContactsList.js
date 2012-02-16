ot.views.ContactsList = Ext.extend(Ext.Panel, {
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Contacts'
    }],
    layout: 'fit',
    items: [{
      xtype: 'list',
      store: ot.stores.contacts,
      itemTpl: '{givenName} {familyName}',
      grouped: true,
      indexBar: true,
      onItemDisclosure: function(record) {
        this.actions = null;
        var ActionSheetItems = new Array();

        ActionSheetItems.push({
          text : 'Cancel',
          scope : this,
          handler : function(record){
            this.actions.hide();
          }
        });

        if(record.data.emails.length > 0){
          ActionSheetItems.push({
            text: 'Utiliser ' + record.data.emails[0].value,
            scope: this,
            handler: function(record){
            }
          });
        }

        if(record.data.phoneNumbers.length > 0){
          ActionSheetItems.push({
            text: 'Utiliser ' + record.data.phoneNumbers[0].value,
            scope: this,
            handler: function(record){
            }
          });
        }

        if (!this.actions) {
          this.actions = new Ext.ActionSheet({
            items: ActionSheetItems
          });
        }

        this.actions.show();
      }
    }],
    initComponent: function() {
        ot.stores.contacts.load();
        ot.views.ContactsList.superclass.initComponent.apply(this, arguments);
    }
});