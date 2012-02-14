ot.controllers.circles = new Ext.Controller({
    index: function(options) {
        options = options || {};
        ot.views.viewport.setActiveItem(
            ot.views.circlesList,
            options.animation
        );
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
        ot.views.viewport.setActiveItem(
            addView,
            options.animation
        );
    },
    
    edit: function (options) {
        // ...
    }
});