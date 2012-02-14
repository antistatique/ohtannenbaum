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
            circleCreate: new ot.views.CircleCreate()
            //contactsList: new ot.views.ContactsList(),
            //contactDetail: new ot.views.ContactDetail(),
            //contactForm: new ot.views.ContactForm()
        });
        
        //put instances of cards into viewport
        Ext.apply(this, {
            items: [
                ot.views.circlesList
            ]
        });
        
        ot.views.Viewport.superclass.initComponent.apply(this, arguments);
    }
});