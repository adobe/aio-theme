---
title: Add Analytics - Xamarin
---

<TextBlock slots="heading, text" hasCodeBlock/>

#### C#

After adding the iOS or Android ACPAnalytics NuGet package, add the Analytics extension.

```csharp
using Com.Adobe.Marketing.Mobile;
```

Get the extension version.

```csharp
ACPAnalytics.ExtensionVersion();
```