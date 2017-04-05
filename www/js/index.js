var testUrl = 'http://www.google.co.uk';
var outputEl;

function log(msg){
    console.log(msg);
    logToPage(msg);
}

function warn(){
    console.warn(msg);
    logToPage(msg);
}

function error(){
    console.error(msg);
    logToPage(msg);
}

function logToPage(msg){
    outputEl.innerHTML += '<p>' + msg + '</p>';
}

function onLoadEvent(name, browserName) {
    log(browserName + " load event: " + name);
}

function addLoadEventListeners(iab, browserName){
    iab.addEventListener("loadstart", onLoadEvent.bind(this, "loadstart", browserName));
    iab.addEventListener("loadstop", onLoadEvent.bind(this, "loadstop", browserName));
    iab.addEventListener("loaderror", onLoadEvent.bind(this, "loaderror", browserName));
}

function openThemeableBrowser(){
    var iab = cordova.ThemeableBrowser.open(testUrl, '_blank', {
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
        backButton: {
            wwwImage: 'img/chevron-left.png',
            wwwImageDensity: 4,
            imagePressed: 'back_pressed',
            align: 'left',
            event: 'backPressed'
        },
        closeButton: {
            wwwImage: 'img/cross-mark-on-a-black-circle-background.png',
            wwwImageDensity: 4,
            imagePressed: 'close_pressed',
            align: 'right',
            event: 'closePressed'
        },
        backButtonCanClose: true
    }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
        error(e.message);
    }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
        warn(e.message);
    });
    addLoadEventListeners(iab, "themable");
}

function openInAppBrowser(){
    var iab = cordova.InAppBrowser.open(testUrl, '_blank', 'location=yes');
    addLoadEventListeners(iab, "iab");
}

function onDeviceReady(){
    outputEl = document.getElementById('output');
    log("deviceready");
}
document.addEventListener('deviceready', onDeviceReady, false);