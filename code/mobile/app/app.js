/**
 * Oh Tannenbaum project
 * OT Application
 *
 * @author Gilles Doge <gde@antistatique.net>
 */
Ext.regApplication({
  name: 'ot', // this will create a global namespace ot (= Oh Tannenbaum)
  defaultUrl: 'circles/index',
  useHistory: true,
  currentCircleId: null,

  pushNotification: function(message){
    if(navigator.notification){
      navigator.notification.alert(message, function(){}, 'Une erreur est survenue', 'Ok');
    }else{
      alert(message);
    }
    return false;
  },

  launch: function() {
    this.launched = true;
    this.mainLaunch();
  },
  mainLaunch: function() {
    // ensure that PhoneGap is ready
    // or we are on a Desktop (for developing & debugging)
    if (true !== Ext.is.Desktop && (!device || !this.launched)) {
      return;
    }
    this.views.viewport = new this.views.Viewport();
  }
});
