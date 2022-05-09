---
title: Overview - Adobe Analytics
description: This is the overview page of Adobe Analytics
contributors:
  - https://github.com/simonwex
  - https://github.com/davidbenge
keywords:
  - Creative Cloud
  - API Documentation
  - UXP
  - Plugins
  - JavaScript
  - ExtendScript
  - SDK
  - C++
  - Scripting
---

import Overview from '../transclusions/overview.md'
import AddAnalyticsIos from './add-analytics/ios.md'
import AddAnalyticsAndroid from './add-analytics/android.md'
import AddAnalyticsCordova from './add-analytics/cordova.md'
import AddAnalyticsFlutter from './add-analytics/flutter.md'
import AddAnalyticsUnity from './add-analytics/unity.md'
import AddAnalyticsReactNative from './add-analytics/react-native.md'
import AddAnalyticsXamarin from './add-analytics/xamarin.md'

<Hero slots="image, heading, text" background="rgb(64, 34, 138)" hideBreadcrumbNav={false}/>

![Hero image](hero-illustration.png)
# Adobe Analytics

Adobe Product API offers limitless ways to integrate your most important customer data into key business processes. Adobe Product API offer limitless ways. -->

<Resources slots="heading, links"/>

#### Resources

* [Quickstart Guide](https://adobe.io?aio_internal)
* [Adobe Analytics Github Repo](https://github.com/AdobeDocs/analytics-2.0-apis)
* [Adobe InDesign](/AdobeInDesign.pdf)

<Overview />

## Discover

<DiscoverBlock slots="heading, link, text"/>

### Get Started

[Quickstart Guide](guides/index.md)

Get started with the Adobe Analytics APIs.

<DiscoverBlock slots="heading, link, text"/>

### Guides

[Calculated Metrics API](/src/pages/guides/Calculated%20Metrics%20API/index.md)

Returns information on the user's company that is necessary for making other Adobe Analytics API calls.

<DiscoverBlock slots="link, text"/>

[Segments API](guides/segments_api/)

Provides configuration guidance and best practices for the /segments endpoint.

<DiscoverBlock slots="link, text"/>

[Reporting Guide API](/apis/experiencecloud/analytics/docs#!AdobeDocs/analytics-2.0-apis/master/migration-guide.md)

Provides configuration guidance and best practices for the /reports endpoint.

<DiscoverBlock slots="link, text"/>

[Migrating from 1.4 to 2.0](guides/migrating/)

For help migrating from the 1.4 versions of the Analytics API to the newer and more capable /reports API.   

<DiscoverBlock slots="heading, link, text"/>

### API References

[Try the API](api/)

Try the Analytics API with Swagger UI. Explore, make calls, with full endpoint descriptions.

## Contributing

We encourage you to participate in our open documentation initiative, if you have suggestions, corrections, additions
or deletions for this documentation, check out the source from [this github repo](https://github.com/AdobeDocs/dev-site-documentation-template), and submit a pull
request with your contribution. For more information, refer to the [contributing page][].

[contributing page]: /support/contribute

## API Requests & Rate Limits

The timeout for API requests through adobe.io is currently *60 seconds*.

The default rate limit for an Adobe Analytics Company is *120 requests per minute*. (The limit is enforced as *12 requests every 6 seconds*).
When rate limiting is being enforced you will get `429` HTTP response codes with the following response body: `{"error_code":"429050","message":"Too many requests"}`    
