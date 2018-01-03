importScripts('./service-worker.js');
if (self.location.hostname != 'localhost') {
    importScripts('https://cdn.onesignal.com/sdks/OneSignalSDK.js');
}
