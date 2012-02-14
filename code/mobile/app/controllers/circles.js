ot.controllers.circles = new Ext.Controller({
    index: function(options) {
      options = options || {};
      if(Ext.getStore('ot.stores.Circle').getCount() > 0){
        ot.views.viewport.setActiveItem(
          ot.views.circlesList,
          options.animation
        );
      }else{
        ot.views.viewport.setActiveItem(
          ot.views.welcomeScreen,
          options.animation
        );
      }
      
      
    },

    show: function(options) {
        var store = Ext.getStore('ot.stores.Circle'),
            detailView = ot.views.circleDetail,
            id = parseInt(options.id),
            circle = store.getById(id);
        console.log(detailView)
        
        if (circle) {
            // ...
            console.log("circle id %i", id);
            detailView.updateWithRecord(circle);
            ot.views.viewport.setActiveItem(
                detailView,
                options.animation
            );
        }
    },
    
    insert: function(options){
        if(Ext.getStore('ot.stores.Circle').findRecord('title',options.title, 0, false, true, true) !== null){
          ot.pushNotification('Un cercle portant le même nom existe déja');
          return false;
        }
        var store = Ext.getStore('ot.stores.Circle'),
            newRecord;
                
        //Add the circle width title receiving in options
        newRecord = {
            title: options.title,
            created_at: new Date()
        };
        
        store.add(newRecord);
        store.sync();
        
        // return to list
        this.index();
    },

    add: function (options) {
        var addView = ot.views.circleCreate;

        addView.reset();

        ot.views.viewport.setActiveItem(
            addView,
            options.animation
        );
    },
    
    edit: function (options) {
        // ...
    }
});