function onDeviceReady(){
    cordova.ThemeableBrowser.open('http://www.plupload.com/examples', '_blank', {
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
        console.log('back pressed');
    }).addEventListener('helloPressed', function(e) {
        console.log('hello pressed');
    }).addEventListener('sharePressed', function(e) {
        console.log(e.url);
    }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
        console.error(e.message);
    }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
        console.warn(e.message);
    });
}

document.addEventListener('deviceready', onDeviceReady, false);