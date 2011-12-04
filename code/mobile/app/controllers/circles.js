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
    
    add: function (options) {
        var store = Ext.getStore('ot.stores.Circle'),
            newRecord;
                
        // here add a random item, normally: display a form
        newRecord = {
            title: "Random title (" + parseInt(Math.random()*100 + 1) + ")",
            created_at: new Date()
        };
        
        store.add(newRecord);
        store.sync();
        
        // return to list
        this.index();
    },
    
    edit: function (options) {
        // ...
    }
});