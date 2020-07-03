---
title: Overview - Adobe Analytics
description: This is an overview page of Adobe Analytics 
hero: 
  - heading: Adobe Analytics
    text: Adobe Product API offers limitless ways to integrate your most important customer data into key business processes. Adobe Product API offer limitless ways.
    background: rgb(64, 39, 138)
    illustration: /illustration.png 
resources:
  - text: Adobe Analytics Product Docs
    link: https://adobe.io
  - text: Adobe Analytics Github Repo 
    link: https://adobe.io
contributors:
  - icaraps
  - macdonst
  - simonwex
  - schaulinsan
  - duynguyen
---

## Overview

This documentation provides instructions for Adobe Analytics 2.0 APIs. For working with Analytics 1.4 APIs, see [Analytics 1.4 API Documentation](https://adobe.io).

The Adobe Analytics APIs are a collection of APIs that power Adobe Analytics products like Analysis Workspace. 
The APIs allow for the creation of data rich user interfaces that you can use to manipulate and integrate data.
You can also create reports to explore, get insights, or answer important questions about your data.

## Discover 

### Get Started

<ContentBlock>
         
[Quickstart Guide](https://adobe.io) 
   
Get started with the Adobe Analytics APIs.
</ContentBlock> 

### Guides

<Flex gap="size-200" wrap alignItems="bottom"> 
  <ContentBlock>
         
  [Calculated Metrics API](https://adobe.io) 
     
  Returns information on the user's company that is necessary for making other Adobe Analytics API calls.
  </ContentBlock> 
  
  <ContentBlock>
       
  [Segments API](https://adobe.io) 
     
  Provides configuration guidance and best practices for the /segments endpoint.
  </ContentBlock> 
    
  <ContentBlock>
     
  [Reporting Guide API](https://adobe.io) 
     
  Provides configuration guidance and best practices for the /reports endpoint.
  </ContentBlock> 
  
  <ContentBlock>
   
  [Migrating from 1.4 to 2.0](https://adobe.io) 
   
  For help migrating from 1.3/1.4 versions of the Analytics API to the newer and more capable /reports API.
  </ContentBlock>     
</Flex>

### API References

<ContentBlock>
 
[Try the API](https://adobe.io) 
 
Try the Analytics API with Swagger UI. Explore, make calls, with full endpoint descriptions.
</ContentBlock>      

## Contributing 

We encourage you to participate in our open documentation initiative, if you have suggestions, corrections, additions 
or deletions for this documentation, check out the source from [this github repo](https://adobe.io), and submit a pull 
request with your contribution. For more information, refer to the [contributing page](https://adobe.io).

## API Requests & Rate Limits

The timeout for API requests through adobe.io is currently *60 seconds*.

The default rate limit for an Adobe Analytics Company is *120 requests per minute*. (The limit is enforced as *12 requests every 6 seconds*).
When rate limiting is being enforced you will get `429` HTTP response codes with the following response body: `{"error_code":"429050","message":"Too many requests"}`    