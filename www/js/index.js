var testUrl = 'iab_content_page.html';
var outputEl, iab;

var opts = {
    A: {
        statusbar: {
            color: '#ffffffff'
        },
        toolbar: {
            height: 44,
            color: '#f0f0f0ff',
            paddingX: 10
        },
        title: {
            color: '#003264ff',
            showPageTitle: true,
            fontSize: 24
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
    },
    B: {
        statusbar: {
            color: "#000000",
            style: "lightcontent"
        },
        toolbar: {
            height: 73,
            color: "#ff00000",
            paddingX: 10
        },
        title: {
            color: '#ffffff',
            showPageTitle: true,
            fontSize: 24
        },
        closeButton: {
            wwwImage: 'img/cross.png',
            wwwImageDensity: 12,
            imagePressed: 'close_pressed',
            align: 'right',
            event: 'closePressed'
        },
        backButtonCanClose: true
    }
};

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

function onLoadEvent(name) {
    log("load event: " + name);
    if(name === "loadstart"){
        onIABLoaded();
    }
}

function addLoadEventListeners(){
    iab.addEventListener("loadstart", onLoadEvent.bind(this, "loadstart"));
    iab.addEventListener("loadstop", onLoadEvent.bind(this, "loadstop"));
    iab.addEventListener("loaderror", onLoadEvent.bind(this, "loaderror"));
    iab.addEventListener('message', function(e) {
        log("Message received: " + JSON.stringify(e));
    });
}

function onIABLoaded(){
    iab.executeScript({
        code: "(function() { " +
        "return window.location.href;" +
        "})();"
    }, function (returnValue) {
        returnValue = returnValue[0];
        log("executeScript for window.location returned : " + returnValue);
    });
}

function openThemeableBrowser(){
    var iabOpts = opts[$('#opts').val()];
    iabOpts.fullscreen = $('#fullscreen')[0].checked;
    iab = cordova.ThemeableBrowser.open(testUrl, '_blank', iabOpts).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
        error(e.message);
    }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
        warn(e.message);
    });
    addLoadEventListeners();
}

function onDeviceReady(){
    outputEl = document.getElementById('log');
    console.log("deviceready");
}
document.addEventListener('deviceready', onDeviceReady, false);
