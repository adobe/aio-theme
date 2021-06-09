---
title: Overview - Adobe Analytics
description: This is the overview page of Adobe Analytics
contributors:
  - https://github.com/simonwex
---

import Overview from '../transclusions/overview.md'

<Hero slots="image, heading, text" background="rgb(64, 34, 138)"/>

![Hero image](hero-illustration.png)

# Adobe Analytics

Adobe Product API offers limitless ways to integrate your most important customer data into key business processes. Adobe Product API offer limitless ways.

```xml
<additional_data>
    <item name="uploaderConfig" xsi:type="array">
        <item name="maxFileSize" xsi:type="object">ImageMaxFileSizeDesktop</item>
        <item name="allowedExtensions" xsi:type="string">jpg jpeg gif png</item>
        <item name="component" xsi:type="string">Magento_PageBuilder/js/form/element/image-uploader</item>
        <item name="componentType" xsi:type="string">imageUploader</item>
        <item name="dataScope" xsi:type="string">image</item>
        <item name="formElement" xsi:type="string">imageUploader</item>
        <item name="uploaderConfig" xsi:type="array">
            <item name="url" xsi:type="object">Magento\PageBuilder\Model\Config\ContentType\AdditionalData\Provider\Uploader\SaveUrl</item>
        </item>
        <item name="previewTmpl" xsi:type="string">Magento_PageBuilder/form/element/uploader/preview</item>
        <item name="template" xsi:type="string">Magento_PageBuilder/form/element/uploader/preview/image</item>
        <item name="mediaGallery" xsi:type="array">
            <item name="openDialogUrl" xsi:type="object">Magento\PageBuilder\Model\Config\ContentType\AdditionalData\Provider\Uploader\OpenDialogUrl</item>
            <item name="openDialogTitle" xsi:type="string" translate="true">Insert Images...</item>
            <item name="initialOpenSubpath" xsi:type="string">wysiwyg</item>
            <item name="storeId" xsi:type="object">\Magento\PageBuilder\Model\Config\ContentType\AdditionalData\Provider\StoreId</item>
        </item>
        <item name="validation" xsi:type="array">
            <item name="required-entry" xsi:type="boolean">true</item>
        </item>
    </item>
</additional_data>
```

<Resources slots="heading, links"/>

#### Resources

* [Quickstart Guide](https://adobe.io?aio_internal)
* [Adobe Analytics Github Repo](https://github.com/AdobeDocs/analytics-2.0-apis)

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

[Reporting Guide API](guides/reporting_api/)

Provides configuration guidance and best practices for the /reports endpoint.

<DiscoverBlock slots="link, text"/>

[Migrating from 1.4 to 2.0](guides/migrating/)

For help migrating from the 1.4 versions of the Analytics API to the newer and more capable /reports API.   
```html
<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

declare(strict_types=1);

namespace Magento\PageBuilder\Model\Config\ContentType\AdditionalData;

/**
 * Provides runtime-specific data for additional data content types configuration
 */
interface ProviderInterface
{
    /**
    * Get data from the provider
    * @param string $itemName - the name of the item to use as key in returned array
    * @return array
    */
    public function getData(string $itemName) : array;
}
```

<DiscoverBlock slots="heading, link, text"/>

### API References

[Try the API](api/)

Try the Analytics API with Swagger UI. Explore, make calls, with full endpoint descriptions.

## Contributing

We encourage you to participate in our open documentation initiative, if you have suggestions, corrections, additions
or deletions for this documentation, check out the source from [this github repo](https://github.com/adobe/gatsby-theme-spectrum-example), and submit a pull
request with your contribution. For more information, refer to the [contributing page][].

[contributing page]: /support/contribute

## API Requests & Rate Limits

The timeout for API requests through adobe.io is currently *60 seconds*.

The default rate limit for an Adobe Analytics Company is *120 requests per minute*. (The limit is enforced as *12 requests every 6 seconds*).
When rate limiting is being enforced you will get `429` HTTP response codes with the following response body: `{"error_code":"429050","message":"Too many requests"}`    
