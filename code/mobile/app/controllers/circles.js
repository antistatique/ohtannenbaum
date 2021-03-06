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
            drawSummaryView = ot.views.circleDrawSummary,
            id = parseInt(options.id) || ot.currentCircleId,
            circle = store.getById(id);
        if (circle) {
            ot.currentCircleId = id;
            var memberStore = Ext.StoreMgr.get('ot.stores.Member');
            memberStore.clearFilter();
            memberStore.filter({
              property: 'circle_id',
              value: id,
              exactMatch: true
            });

            if(store.getById(id).get('drawDate') != null){
              drawSummaryView.updateWithRecord(circle);
              ot.views.viewport.setActiveItem(
                drawSummaryView,
                options.animation
              );
            }else{
              detailView.updateWithRecord(circle);
              ot.views.viewport.setActiveItem(
                detailView,
                options.animation
              );
            }
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

    doDraw: function(options){

      options = options || {}

      var store = Ext.getStore('ot.stores.Owner'),
            newRecord;       
        
      //Add the owner of the draw
      newRecord = {
          name: options.ownerName,
          email: options.ownerEmail,
          phone: options.ownerPhone,
          circle_id: ot.currentCircleId
      };

      store.add(newRecord);
      store.sync();

      var memberStore = Ext.StoreMgr.get('ot.stores.Member');
      memberStore.clearFilter();

      memberStore.filter({
        property: 'circle_id',
        value: ot.currentCircleId,
        exactMatch: true
      });

      var membersArray = memberStore.data.items;

      membersArray.sort(function(){return Math.round(Math.random())-0.5});
      memberStore.clearFilter();

      var owner = Ext.StoreMgr.get('ot.stores.Owner');
      owner.clearFilter();
      owner.filter('circle_id', ot.currentCircleId);
      owner = owner.getAt(0).data;
      var jsonData = {
        members: new Array(),
        circle: Ext.StoreMgr.get('ot.stores.Circle').getById(ot.currentCircleId).data,
        owner: owner
      };

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

        jsonData.members[i] = membersArray[i].data; 
      }

      var circleStore = Ext.StoreMgr.get('ot.stores.Circle');
      var circleIndex = circleStore.find('id', ot.currentCircleId);
      var circleRecord = circleStore.getAt(circleIndex);
      circleRecord.set('drawDate', new Date());
      circleRecord.dirty = true;
      circleStore.sync();

      Ext.Ajax.request({
        url: ot.config.notificationServerUrl,
        method: 'GET',
        params: {json: JSON.stringify(jsonData)},
        failure : function(response){
            alert('failure')
        },
        success: function(response, opts) {                
            navigator.notification.alert('Un message à été envoyé aux participants leur indiquant à qui ils devonr offrir leurs cadeaux.', function(){}, 'Bravo', 'Super!');
        }
      });

      this.show();
    },
    resendNotifications: function(){
      Ext.Msg.confirm('Renvoi des notifiations', 'Vous êtes sur le point de renvoyer les notifications aux membres du cercle. Cette action est irréversible. Voulez-vous continuer?', 
        function(btn){
          if(btn == 'yes'){
            var memberStore = Ext.StoreMgr.get('ot.stores.Member');
            memberStore.clearFilter();

            memberStore.filter({
              property: 'circle_id',
              value: ot.currentCircleId,
              exactMatch: true
            });

            var membersArray = memberStore.data.items;

            var owner = Ext.StoreMgr.get('ot.stores.Owner');
            owner.clearFilter();
            owner.filter('circle_id', ot.currentCircleId);
            owner = owner.getAt(0).data;
            var jsonData = {
              members: new Array(),
              circle: Ext.StoreMgr.get('ot.stores.Circle').getById(ot.currentCircleId).data,
              owner: owner
            };

            for(var i = 0; i < membersArray.length; i++){
              jsonData.members[i] = membersArray[i].data; 
            }

            Ext.Ajax.request({
              url: ot.config.notificationServerUrl,
              method: 'GET',
              params: {json: JSON.stringify(jsonData)},
              failure : function(response){
                  alert('failure')
              },
              success: function(response, opts) {                
                  navigator.notification.alert('Un message à été envoyé aux participants leur indiquant à qui ils devonr offrir leurs cadeaux.', function(){}, 'Bravo', 'Super!');
              }
            });
          }
        }
      );
    }
});