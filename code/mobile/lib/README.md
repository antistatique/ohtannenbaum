Installing Sencha Touch & PhoneGap
----------------------------------

Sencha Touch
============

Download the Sencha Touch v1.1 SDK from [here](http://www.sencha.com/products/touch/download/) and place (or symlink) the unzipped directory, renamed to `touch`, into this `lib` folder.

IMPORTANT: When deploying, make sure that only the required JavaScript and CSS files remain in that folder, and remove the rest of the SDK. You do not want to compile and distribute the entire Sencha Touch SDK within your PhoneGap app.


PhoneGap
========

Download the PhoneGap v1. SDK form [here](http://phonegap.com/download/) and place the javascript file `phonegap-1.2.0.js` into the `lib` folder.