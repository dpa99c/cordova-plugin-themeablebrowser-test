var testUrl = 'iab_content_page.html';

function openThemeableBrowser(){
    cordova.ThemeableBrowser.open(testUrl, '_blank', {
        statusbar: {
            color: '#ffffffff'
        },
        toolbar: {
            height: 44,
            color: '#f0f0f0ff'
        },
        title: {
            color: '#003264ff',
            showPageTitle: true
        },
        backButtonCanClose: true
    }).addEventListener('backPressed', function(e) {
        log('back pressed');
    }).addEventListener('helloPressed', function(e) {
        log('hello pressed');
    }).addEventListener('sharePressed', function(e) {
        log(e.url);
    }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
        error(e.message);
    }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
        warn(e.message);
    }).addEventListener('message', function(e) {
        log("Message received: " + JSON.stringify(e));
    });
}

function openInAppBrowser(){
    cordova.InAppBrowser.open(testUrl, '_blank', 'location=yes');
}

function log(msg) {
    $('#log').append("<p>" + msg + "</p>");
    console.log(msg);
}

function warn(msg){
    log("WARN: " + msg);
    console.warn(msg);
}

function error(msg){
    log("ERROR: " + msg);
    console.error(msg);
}

function onDeviceReady(){
    log("deviceready");
}
document.addEventListener('deviceready', onDeviceReady, false);