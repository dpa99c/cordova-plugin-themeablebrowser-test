var outputEl, iab;

var testUrl = {
  'page': 'https://dpa99c.github.io/cordova-plugin-inappbrowser-test/iab_content/iab.html'
};

var toc = "WMR";
var tocSettings = {
    SR: {
        "brandcolour": "#0e3271",
        "statusbarcolour": "#001E4F",
    },
    WMR: {
        "brandcolour": "#3C1053",
        "statusbarcolour": "#ffffff"
    }
};
var settings = tocSettings[toc];

var opts = {};
function createIabOptions(isIos){
    opts.A = {
        statusbar: {
            color: settings.statusbarcolour,
            style: "lightcontent"
        },
        toolbar: {
            height: 73,
            color: settings.brandcolour,
            paddingX: isIos ? 10 : 20
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
        fullscreen: isIos,
        backButtonCanClose: true
    };
    opts.B = {
        statusbar: {
            color: settings.statusbarcolour,
            style: "darkcontent"
        },
        toolbar: {
            height: 73,
            color: settings.brandcolour
        },
        title: {
            color: '#ffffff',
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
            wwwImage: 'img/cross.png',
            wwwImageDensity: 8,
            imagePressed: 'close_pressed',
            align: 'left',
            event: 'closePressed'
        },
        menu: {
            wwwImage: 'img/vertical-ellipsis-with-padding.png',
            wwwImageDensity: 6,
            title: 'Options',
            cancel: 'Cancel',
            align: 'right',
            items: [
                {
                    event: 'btnOpenBrowserPressed',
                    label: 'Open in Browser'
                }
            ]
        },
        fullscreen: isIos,
        backButtonCanClose: true
    };
}

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

function onPressOpenBrowser(url, e){
    window.open = cordova.ThemeableBrowser.open;
    window.open(testUrl.page, '_system');
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
    var url = testUrl[$('#url').val()];
    var iabOpts = opts[$('#opts').val()];
    iabOpts.fullscreen = $('#fullscreen')[0].checked;
    iab = cordova.ThemeableBrowser.open(url, '_blank', iabOpts)
    .addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
        error(parseMessage(e));
    }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
        warn(parseMessage(e));
    });
    addLoadEventListeners();
    iab.addEventListener("btnOpenBrowserPressed", onPressOpenBrowser.bind(this, url));
}

function parseMessage(e){
    var msg = e.message;
    if(e.code && e.code !== "undefined") msg += "; code="+e.code;
    return msg;
}

function onDeviceReady(){
    outputEl = document.getElementById('log');
    console.log("deviceready");
    var isIos = cordova.platformId === 'ios';
    createIabOptions(isIos);
}
document.addEventListener('deviceready', onDeviceReady, false);
