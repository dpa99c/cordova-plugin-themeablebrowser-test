var testUrl = 'iab_content_page.html';
var outputEl;

function log(msg){
    console.log(msg);
    logToPage(msg);
}

function warn(msg){
    console.warn(msg);
    logToPage("WARN: "+msg);
}

function error(msg){
    console.error(msg);
    logToPage("ERROR: "+msg);
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
    iab.addEventListener('message', function(e) {
        log("Message received: " + JSON.stringify(e));
    });
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

function onDeviceReady(){
    outputEl = document.getElementById('log');
    console.log("deviceready");
}
document.addEventListener('deviceready', onDeviceReady, false);