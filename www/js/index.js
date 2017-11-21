var testUrl = 'http://www.bbc.co.uk/news';

function openInAppBrowser(){
    cordova.InAppBrowser.open(testUrl, '_blank', 'location=no,closebutton=yes,closebuttoncaption=Custom text', null);
}

function onDeviceReady(){
    console.log("deviceready");
}
document.addEventListener('deviceready', onDeviceReady, false);