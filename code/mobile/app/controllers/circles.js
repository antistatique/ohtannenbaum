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
    
    drawOwnerEdit: function(options){
      var drawOwner = ot.views.drawOwner;
      ot.views.viewport.setActiveItem(
          drawOwner,
          options.animation
      );
    },
    doDraw: function(){
      console.log('On effectue le tirage au sort');

      var memberStore = Ext.StoreMgr.get('ot.stores.Member');
      memberStore.clearFilter();

      memberStore.filter({
        property: 'ot.models.circle_id',
        value: ot.currentCircleId,
        exactMatch: true
      });

      var membersArray = memberStore.data.items;

      membersArray.sort(function(){return Math.round(Math.random())-0.5});

      memberStore.clearFilter();

      for(var i = 0; i < membersArray.length; i++){
        //Récupération de l'angel
        if(i == 0){
          var angel = membersArray[membersArray.length - 1];
        }else{
          var angel = membersArray[i - 1];
        }
        //Récupération de l'id de l'angel
        angelId = angel.get('id');
        var angelIndex = memberStore.find('id', angelId);
        var luckyIndex = memberStore.find('id', membersArray[i].get('id'));

        var angelRecord = memberStore.getAt(angelIndex);
        var luckyRecord = memberStore.getAt(luckyIndex);

        angelRecord.set('angelOf', membersArray[i].get('id'));
        luckyRecord.set('luckyOf', angelId);

        /**
         * Readonly flag - true if this Record has been modified.
         * @type Boolean
        */
        angelRecord.dirty = luckyRecord.dirty = true;

        memberStore.sync();
      }


      var circleStore = Ext.StoreMgr.get('ot.stores.Circle');
      var circleIndex = circleStore.find('id', ot.currentCircleId);
      var circleRecord = circleStore.getAt(circleIndex);
      circleRecord.set('drawDate', new Date());
      circleRecord.dirty = true;
      circleStore.sync();
    }
});