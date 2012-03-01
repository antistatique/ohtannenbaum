ot.controllers.circles = new Ext.Controller({
    index: function(options) {
      options = options || {};
      if(Ext.getStore('ot.stores.Circle').getCount() > 0){
        ot.views.viewport.setActiveItem(
          ot.views.circlesList
        );
      }else{
        ot.views.viewport.setActiveItem(
          ot.views.welcomeScreen
        );
      }
      
      
    },

    show: function(options) {
        options = options || {};
        var store = Ext.getStore('ot.stores.Circle'),
            detailView = ot.views.circleDetail,
            id = parseInt(options.id) || ot.currentCircleId,
            circle = store.getById(id);
        if (circle) {
            ot.currentCircleId = id;

            var memberStore = Ext.StoreMgr.get('ot.stores.Member');
            memberStore.clearFilter();

            memberStore.filter({
              property: 'ot.models.circle_id',
              value: id,
              exactMatch: true
            });

            detailView.updateWithRecord(circle);

            ot.views.viewport.setActiveItem(
                detailView
            );
        }
    },
    
    insert: function(options){
        options = options || {};
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
        options = options || {};
        var addView = ot.views.circleCreate;

        addView.reset();

        ot.views.viewport.setActiveItem(
            addView
        );
    },
    
    drawOwnerEdit: function(options){
      options = options || {};
      
      var drawOwner = ot.views.drawOwner;
      ot.views.viewport.setActiveItem(
          drawOwner
      );
    },
    doDraw: function(){
      options = options || {};

      var memberStore = Ext.StoreMgr.get('ot.stores.Member');
      memberStore.clearFilter();

      memberStore.filter({
        property: 'ot.models.circle_id',
        value: ot.currentCircleId,
        exactMatch: true
      });

      var membersArray = memberStore.data.items;

      membersArray.sort(function(){return Math.round(Math.random())-0.5});

    }
});