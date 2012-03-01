Ext.namespace('ot.views');

ot.views.Viewport = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    cardSwitchAnimation: 'slide',
    initComponent: function() {
        //put instances of cards into ot.views namespace
        Ext.apply(ot.views, {
            circlesList: new ot.views.CirclesList(),
            circleDetail: new ot.views.CircleDetail(),
            manuallyAddMember: new ot.views.ManuallyAddMember(),
            circleCreate: new ot.views.CircleCreate(),
            welcomeScreen: new ot.views.WelcomeScreen(),
            contactsList: new ot.views.ContactsList(),
            drawOwner: new ot.views.DrawOwner(),
            circleDrawSummary: new ot.views.CircleDrawSummary()
        });
        
        //put instances of cards into viewport
        if(Ext.getStore('ot.stores.Circle').getCount() > 0){
          Ext.apply(this, {
            items: [
                ot.views.circlesList
            ]
          });
        }else{
          Ext.apply(this, {
            items: [
                ot.views.welcomeScreen
            ]
          });
        }
        
        ot.views.Viewport.superclass.initComponent.apply(this, arguments);
    }
});