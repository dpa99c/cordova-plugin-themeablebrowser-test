var testUrl = 'http://www.bbc.co.uk/news';

function openInAppBrowser(){
    cordova.InAppBrowser.open(testUrl, '_blank', 'location=no,footer=yes', null, {footerText: "Custom text"});
}

function onDeviceReady(){
    console.log("deviceready");
}
document.addEventListener('deviceready', onDeviceReady, false);