---
title: Add Analytics - Flutter
---

<TextBlock slots="heading, text" hasCodeBlock/>

#### Flutter

Install Analytics.

Instructions on installing the Analytics SDK in Flutter can be found in the [official Flutter documentation](https://pub.dev/packages/flutter_acpanalytics#-installing-tab-).

Import the extension.

```dart
import 'package:flutter_acpanalytics/flutter_acpanalytics.dart';
```

Get the extension version.

```dart
String version = await FlutterACPAnalytics.extensionVersion;
```