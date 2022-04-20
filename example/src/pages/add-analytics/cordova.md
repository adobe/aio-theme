---
title: Add Analytics - Cordova
---

<TextBlock slots="heading, text" hasCodeBlock/>

#### Cordova

After creating your Cordova app and adding the Android and iOS platforms, add the Analytics extension.

```bash
cordova plugin add https://github.com/adobe/cordova-acpanalytics.git
```

Get the extension version.

```jsx
ACPAnalytics.extensionVersion(function(version) {  
    console.log("ACPAnalytics version: " + version);
}, function(error) {  
    console.log(error);  
});
```