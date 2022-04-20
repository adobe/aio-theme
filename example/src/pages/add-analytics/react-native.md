---
title: Add Analytics - React Native
---

#### JavaScript

Install Adobe Analytics.

```bash
npm install @adobe/react-native-acpanalytics
```

Link the module and the application.

For React Native versions 0.6 and above, you can use the [CLI autolink feature](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) to link the module while building the app.

For React Native versions less than or equal to 0.59, you can use the following scripts:

```bash
react-native link @adobe/react-native-acpanalytics
```

If you are using iOS and `cocoapods`, run:

```bash
cd ios/ && pod install
```

Import the extension.

```jsx
import {ACPAnalytics} from '@adobe/react-native-acpanalytics';
```

Get the extension version.

```jsx
ACPAnalytics.extensionVersion().then(version => console.log("AdobeExperienceSDK: ACPAnalytics version: " + version));
```