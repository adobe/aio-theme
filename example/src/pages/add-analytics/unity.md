---
title: Add Analytics - Unity
---


<TextBlock slots="heading, text" hasCodeBlock/>

#### C#

After importing the [ACPAnalytics.unitypackage](https://github.com/adobe/unity-acpanalytics/blob/master/bin/ACPAnalytics-0.0.1-Unity.zip), add the Analytics extension for Unity.

```csharp
using com.adobe.marketing.mobile;
```

Get the extension version.

```csharp
ACPAnalytics.extensionVersion();
```