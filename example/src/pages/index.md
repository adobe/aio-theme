---
title: Overview - Adobe Analytics
description: This is an overview page of Adobe Analytics 
contributors:
  - https://github.com/icaraps
  - https://github.com/macdonst
  - https://github.com/simonwex
---

<Hero slots="image, heading, text" background="rgb(64, 34, 138)"/>

![Hero image](./illustration.png) 

# Adobe Analytics 

Adobe Product API offers limitless ways to integrate your most important customer data into key business processes. Adobe Product API offer limitless ways.

<Resources slots="heading, links"/>

#### Resources

* [Quickstart Guide](https://adobe.io)
* [Adobe Analytics Github Repo](https://adobe.io)

## Overview

This documentation provides instructions for Adobe Analytics 2.0 APIs. For working with Analytics 1.4 APIs, see [Analytics 1.4 API Documentation](https://adobe.io).

The Adobe Analytics APIs are a collection of APIs that power Adobe Analytics products like Analysis Workspace. 
The APIs allow for the creation of data rich user interfaces that you can use to manipulate and integrate data.
You can also create reports to explore, get insights, or answer important questions about your data.

## Discover 

<ContentBlock width="100%" slots="heading, link, text"/>

### Get Started

[Quickstart Guide](https://adobe.io)
    
Get started with the Adobe Analytics APIs.

<ContentBlock slots="heading, link, text"/> 

### Guides

[Calculated Metrics API](https://adobe.io) 
     
Returns information on the user's company that is necessary for making other Adobe Analytics API calls.

<ContentBlock slots="link, text"/>

[Segments API](https://adobe.io) 

Provides configuration guidance and best practices for the /segments endpoint.

<ContentBlock slots="link, text"/>

[Reporting Guide API](https://adobe.io)

Provides configuration guidance and best practices for the /reports endpoint.  

<ContentBlock width="100%" slots="heading, link, text"/>

### API References

[Try the API](https://adobe.io) 

Try the Analytics API with Swagger UI. Explore, make calls, with full endpoint descriptions.

## Contributing 

We encourage you to participate in our open documentation initiative, if you have suggestions, corrections, additions 
or deletions for this documentation, check out the source from [this github repo](https://adobe.io), and submit a pull 
request with your contribution. For more information, refer to the [contributing page](https://adobe.io).

## API Requests & Rate Limits

The timeout for API requests through adobe.io is currently *60 seconds*.

The default rate limit for an Adobe Analytics Company is *120 requests per minute*. (The limit is enforced as *12 requests every 6 seconds*).
When rate limiting is being enforced you will get `429` HTTP response codes with the following response body: `{"error_code":"429050","message":"Too many requests"}`    