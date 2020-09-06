# Gatsby Theme Parliament

A [Gatsby Theme](https://gatsbyjs.org/docs/themes) for building markdown powered Adobe I/O sites.

**Why Gatsby ?**

For many reasons : 
* Static site 
* Single Page Application  
* React Server Side Rendered at build time
* Blazing fast
* Large and active community
* Huge ecosystem of plugins
* Open source

and more ... see https://www.gatsbyjs.com/why-gatsby/.    

**Why Gatsby theme ?**

[Gatsby themes](https://www.gatsbyjs.com/docs/themes/what-are-gatsby-themes/) allow Gatsby site functionality to be packaged as a standalone product for others to easily reuse.
Using a theme, all of your default configuration lives in an npm package.

**View the demos of Gatsby sites using Gatsby Theme Parliament:** 

* [Documentation site](https://adobedocs.github.io/gatsby-theme-parliament-documentation/)
* [Product site]() TODO
* [Platform site]() TODO

## Contents

* [Getting started](#getting-started)
* [Configuration](#configuration)
* [Building](#building-the-gatsby-site)
* [Publishing](#publishing-the-gatsby-site)
* [Customizations](#customizations)
* [Issue tracker](#issue-tracker)
* [Contributing](#contributing)

## Getting started

This section will help you get started building a Gatsby site with Gatsby Theme Parliament.

**Pre-requisites**

* Install [Node.js LTS](https://nodejs.org/en/download/)
* Install a package manager like [npm](https://docs.npmjs.com/cli/npm) or [yarn]() 

### Using the Adobe I/O CLI

First install the Adobe I/O CLI via the Terminal

```bash
npm install -g @adobe/aio-cli
```

Then install the Doc Plugin by running.  

```bash
aio discover -i
```

Select the `@adobe/aio-cli-plugin-doc` plugin by pressing the *Spacebar* and finally press *Enter* to install it.

For more information about the Doc plugin, see https://github.com/adobe/aio-cli-plugin-doc.

Now you can create your site by running 

```bash
aio doc init path/to/site/folder
```

which will use by default the [Documentation site template](https://github.com/AdobeDocs/gatsby-theme-parliament-documentation). 

You can specify another template with 

```bash
aio doc init path/to/doc/folder --template URL_TO_TEMPLATE_GIT_REPO
```

### Using Github repository templates

To initialize a site repository, you can also use one of the available templates in Github: 

* [Documentation site template](https://github.com/adobe/gatsby-theme-parliament-documentation/)
* [Product site template]() TODO
* [Platform site template]() TODO  

Simply click on the “Use this template” button to create a new GitHub repository of the template.

## Configuration

To make sure you don't run into troubles during the site build process, please follow the below configuration steps.

### .env file   

Follow these steps to configure your `.env` file. 

1. Copy `.env.example` to `.env`
2. Add the appropriate values in the `.env` file

**The .env should not be committed.** 

Github's API is being called during the site build phase to retrieve the authors of every markdown page under `src/pages`.
The build will currently fail if the Github information is missing.

To retrieve your Github personal access token, you can follow these [steps](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).
Only `READ` permissions on repositories are required for the token.

### .env settings for Github Contributors

For example, if your doc site repo was at https://github.com/adobe/gatsby-theme-parliament using the `main` branch, this would be what your `.env` would look like:

```properties
GITHUB_TOKEN=YOUR_PERSONAL_ACCESS_TOKEN_HERE
GITHUB_REPO_OWNER=adobe
GITHUB_REPO_NAME=gatsby-theme-parliament
GITHUB_REPO_BRANCH=main
ROOT=example
```

By default, you can omit the `ROOT` env var, and it should use the root folder as the source of the documentation pages. If your site is in a sub-folder, add the relative path as the `ROOT`.

### .env settings for the Feedback Component and Analytics

- You need to set up [Adobe Launch](https://launch.adobe.com), with an Adobe Analytics Reporting Suite
- In Adobe Analytics, add a custom eVar (Text String type) to capture the feedback. This eVar will contain either "yes" or "no".
- In Adobe Launch, create two Data Elements:
  1. Feedback-Yes: edit the code and paste in `return document.querySelectorAll('button.feedback-yes')[0].innerText`
  2. Feedback-No: edit the code and paste in `return document.querySelectorAll('button.feedback-no')[0].innerText`
- In Adobe Launch, for the two Data Elements, make sure these checkboxes are checked:
  1. Enable Default Value
  2. Force lowercase value
  3. Clean text
- In Adobe Launch, create three Rules:
  1. Feedback-Yes: On click, it will set variables in Adobe Analytics (set the custom eVar to value of the Feedback-Yes Data Element), and then Send the Beacon
  2. Feedback-No: On click, it will set variables in Adobe Analytics (set the custom eVar to the value of the Feedback-No Data Element), and then Send the Beacon
  3. Analytics: On library loaded (page top), Send the Beacon
- In Adobe Launch:
  1. Go through the `Publishing Flow`, don't forget to `Add All Resources`
  2. In `Environments`, select the appropriate environment, and under the `Install` column, select the icon
  3. Copy the url displayed in the `script` tag

This last value will be the value you put in `GATSBY_LAUNCH_SRC`.
`GATSBY_LAUNCH_SRC_INCLUDE_IN_DEVELOPMENT` is a boolean value, set to `true` if you want to enable the script to run in development.

Example:
```properties
GATSBY_LAUNCH_SRC=https://your.adobe.launch.url.here
GATSBY_LAUNCH_SRC_INCLUDE_IN_DEVELOPMENT=true
```

### Global Navigation

The Global navigation links are configurable in `gatsby-config.js` under `pages`. 

```
pages: [
  {
    title: 'Adobe Analytics',
    path: '/'
  },
  {
    title: 'Guides',
    path: '/guides/'
  },
  {
    title: 'API Reference',
    path: '/api/'
  },
  {
    title: 'JS Doc',
    path: '/jsdoc/'
  },
  {
    title: 'Support',
    path: '/support/'
  }
]
```   

### Side Navigation

The Side navigation links are configurable in `gatsby-config.js` under `subPages` and the paths should map to a path defined in `pages`. 

```
subPages: [
  {
    title: 'Get Started',
    path: '/guides/',
    pages: [
      {
        title: 'Overview',
        path: '/guides/'
      },
      {
        title: 'Creating an OAuth Client',
        path: '/guides/creating_oauth_client/'
      },
      {
        title: 'OAuth using cURL',
        path: '/guides/oauth_using_curl/'
      },
      {
        title: 'OAuth using POSTMAN',
        path: '/guides/oauth_using_postman/'
      },
      {
        title: 'JWT Authentication',
        path: '/guides/jwt_authentication/'
      }
    ]
  }
]
```

### Versions

You can specify multiple versions for your site in `gatsby-config.js` under `versions`. 
The first entry is the selected version by default. 

```
versions: [
  {
    title: 'v2.0'
  },
  {
    title: 'v1.4',
    path: 'https://github.com/AdobeDocs/analytics-1.4-apis'
  }
], 
```

## Building the Gatsby site

You can generate a production version of the site using following commands:

With the CLI:

```bash
aio doc generate
```

Or run following commands: 

* To build and preview a production version of the site: `yarn start`.
* To build and preview a production version of the site with path prefix: `yarn start:prefix`.
* To build and preview a development version of the site with hot reloading: `yarn dev`.  

### Adding a Path Prefix

Many applications are hosted at something other than the root (`/`) of their domain.
For example, a Gatsby blog could live at `example.com/blog/`, or a site could be hosted on GitHub Pages at `example.github.io/my-gatsby-site/`.

To add a Path Prefix, go to your `gatsby-config.js` file and specify the prefix with:

```
pathPrefix: process.env.PATH_PREFIX || '/MY_PREFIX' 
```

## Publishing the Gatsby site

TODO

## Writing content

The content of the site is written in [Markdown](https://daringfireball.net/projects/markdown/) which is both easy to read and easy to learn.

As in most cases, the markdown content is stored in GitHub, we also support [GitHub Flavored Markdown (GFM)](https://help.github.com/categories/writing-on-github/), which provides additional functionality for common formatting needs. 
Additionally, Adobe extended Markdown in a few ways to support certain features. 

Make sure the markdown content is located  under `src/pages` and please follow below guidelines for writing content.

### Content structure

Use a folder structure to define your site pages e.g. :
 
```
root
├- index.md
├- hero.png
├- api
│  └- index.md   
├- guides 
│   ├─ index.md
│   └- nested_guides
│      └- index.md
├- .env
├─ gatsby-config.js
└─ package.json 
```   

### Internal links

Use relative links between markdown pages e.g. with the example folder structure you can add a link from `/guides/index.md` to `/api/index.md` with:

```
[Link to API](../api/) 
```    

### Front matter support

Front matter allows an author to specify metadata for a page. For example, you can define the page meta title and description by adding front matter to the beginning of your markdown file: 

<pre>
---
title: Guides - Adobe Analytics
description: This is the guides overview page of Adobe Analytics 
---
</pre>

### Specifying external contributors

In addition to the Github contributors of a markdown file, you can specify external contributors with front matter.
They'll show up first before the Github contributors.

<pre>
---
contributors:
  - https://github.com/simonwex 
---
</pre>

### OpenAPI spec

We use [Redoc](https://github.com/Redocly/redoc) to render OpenAPI specs. Simply use front matter to define the spec URL.

<pre>
---
openAPISpec: https://raw.githubusercontent.com/AdobeDocs/analytics-2.0-apis/master/docs/swagger.json
---
</pre>

### JSDoc

We currently recommend to use the [jsdoc to markdown](https://github.com/jsdoc2md/jsdoc-to-markdown) converter and annotate your markdown to render JSDoc.
Use front matter to specify a JSdoc markdown document.

<pre>
---
jsDoc: true
---
</pre>

And annotate your JS parameters with `<JsDocParameters/>` to render them nicely.  

### MDX support 

[MDX](https://mdxjs.com/) is supported out of the box. MDX enables writing [JSX React components](https://reactjs.org/docs/introducing-jsx.html) in markdown giving authors new powers.
Despite the markdown files having all an `md` extension, they are actually treated as MDX files. You can use `md` and `mdx` extensions interchangeably.

As we try to limit the use of MDX in favor of pure markdown, we have come up with a way to couple the use of basic markdown syntax with JSX see examples below.  

### Writing a Hero block

A Hero block should be used on every home page. **Only 1 Hero block per page is allowed**.
 
There are currently 2 ways to write a Hero block.

1) Using magic rules. If the markdown document starts with an image named `hero` followed by a heading level 1 and a paragraph, the Hero block will be created automatically. 

2) If you need more flexibility e.g. you need to define a specific background color for the Hero, you can use the following syntax: 

```
<Hero slots="image, heading, text" background="rgb(64, 34, 138)"/>

![Hero image](./illustration.png) 

# Adobe Analytics 

Adobe Product API offers limitless ways to integrate your most important customer data into key business processes. Adobe Product API offer limitless ways. 
``` 

*Use `slots` to identify the markdown content to be used by the Hero block. The `image` slot is optional.*

### Writing a Resources List 

Use Resources List to display a side list of links. Those links can point to internal or external documents or pages.
**Only 1 Resources List per page is allowed**.

```
<Resources slots="heading, links"/>

#### Resources

* [Quickstart Guide](https://www.adobe.io/apis/experiencecloud/analytics/docs.html)
* [Adobe Analytics Github Repo](https://github.com/AdobeDocs/analytics-2.0-apis) 
```

*Use `slots` to identify the markdown content to be used by the Resources List.*

### Writing a Discover Block
 
A Discover Block is a section of content that can be used to emphasize certain areas of the page. Multiple Discover Blocks can be displayed in a row. 


**Single Discover Block**
```
<DiscoverBlock width="100%" slots="heading, link, text"/>

### Get Started

[Quickstart Guide](guides/)
    
Get started with the Adobe Analytics APIs.
```

**Multiple Discover Blocks in a row**

```
<DiscoverBlock slots="heading, link, text"/> 

### Guides

[Calculated Metrics API](guides/calculated_metrics_api/) 
     
Returns information on the user's company that is necessary for making other Adobe Analytics API calls.

<DiscoverBlock slots="link, text"/>

[Segments API](guides/segments_api/) 

Provides configuration guidance and best practices for the /segments endpoint.

<DiscoverBlock slots="link, text"/>

[Reporting Guide API](guides/reporting_api/)

Provides configuration guidance and best practices for the /reports endpoint.

<DiscoverBlock slots="link, text"/> 
```

**Discover Block with image**

```
<DiscoverBlock slots="image, heading, link, text"/>

![Adobe Experience Cloud](experience_cloud.png)

### Developer forum

[Get started](https://adobe.io)

Open discussion and support with community experts and Adobe staff.

<DiscoverBlock slots="link, text"/>

[Experience league](https://adobe.io) 

Tutorials and videos for the community.
```

*Use `slots` to identify the markdown content to be used by the Discover Block. The `heading` and `image` slots are optional.*

### Writing a Code Block

A Code Block is an enhanced code section which supports additional features like request/response format, multiple languages etc.

```
<CodeBlock slots="heading, code" repeat="3" languages="JSON, CURL, JSON" /> 
```
<pre>
#### Request

```json
{
  "rsid":"adbedocrsid",
  "globalFilters":[
    {
      "type":"dateRange",
      "dateRange":"2017-12-31T00:00:00.000/2018-01-06T23:59:59.999"
    }
  ]
}
```

#### Request

```bash
curl -X POST \
  https://analytics.adobe.io/api/{COMPANYID}/reports \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
  -d '{REQUESTJSON}'
```

#### Response

```json
{
  "totalPages":1,
  "numberOfElements":7,
  "number":0,
  "totalElements":7
}
```
</pre>     

*Use `repeat` to define how many code sections are part of the Code Block. 
Use `languages` to define a language name for each code section. Code sections with the same heading are automatically grouped together.*

### Writing an Inline Alert

You can use the Inline Alert to visually inform the reader of important content. 

```
<InlineAlert variant="info" slots="text"/>

The refresh token grant type is automatically added to OAuth clients created after September 18, 2019 
```

## Embedding external markdown documents and filter with Variant Blocks

You can use MDX transclusion to embed markdown documents into other markdown documents and because Gatsby sites are using `npm` to define
dependencies, we can also include external markdown documents. 

Together with Variant Blocks, the author can query what should be rendered from external sources.
 
**This allows to write content once, and reuse it everywhere.**

For example, let's say there are 2 repositories named http://github.com/adobedocs/repo1 and http://github.com/adobedocs/repo2. 
Both are Gatsby sites using the theme `@adobe/gatsby-theme-parliament` and have markdown content defined under `src/pages`.

1) repo1 has reusable markdown content written with Variant Blocks under `/src/pages/debugging/index.md`: 

```
## How to Debug Your Plugin

Bugs happen! In this tutorial, you will learn how to debug your plugin.

<Variant product="XD" repeat="2" />

First launch the XD console, by clicking Developer > Console

[XD link](https://adobe.io)

<Variant product="Photoshop" repeat="2" />

First launch the Photoshop console, by clicking Developer > Console

[Photoshop link](https://adobe.io)

<Variant test="image" repeat="2" />

#### Image

![image](../test/image.png) 
```

*Use `repeat` to define how many elements are part of the Variant Block. Use any `key=value` property to mark your Variant Block.*

2) repo2 added repo1 as dependency with `yarn add adobedocs/repo1` to be able to reference its markdown content.

3) repo2 embeds repo1 content by using the `import` statement and inserts the content in its own markdown together with a `query` filter to only display what is needed.

```
import Debugging from 'repo1/src/pages/debugging/index.md'

# Debugging

<Debugging query="product=Photoshop" />

More content
``` 
  
will be rendered as:

``` 
# Debugging

## How to Debug Your Plugin

Bugs happen! In this tutorial, you will learn how to debug your plugin.

First launch the Photoshop console, by clicking Developer > Console

[Photoshop link](https://adobe.io)

More content
```  

You can query multiple elements, for example you can add the section with the image by adding it to the `query`.

```
 <Debugging query="product=Photoshop&image=test" />
``` 

## Customizations

When using Gatsby themes, you can take advantage of something called [Gatsby shadowing](https://www.gatsbyjs.com/docs/themes/shadowing/). This allows you to override the default component included in the theme with a custom one you’ve created.

The Gatsby Theme Parliament package has a component to render code using the [Prism syntax highlighter](https://prismjs.com/).
With shadowing, you can override the component to provide your own.

If you look at the file tree of your site, you’ll see it looks something like this:

```
root
├─ src/pages
│   ├- index.md
│   └- etc.
├- .env
├─ gatsby-config.js
└─ package.json 
```

To enable shadowing, you need to add a folder called `@adobe/gatsby-theme-parliament`. 
Any file placed in that directory with a path that matches the path of a file from the theme will completely shadow the file.  

So the new folder structure with shadowing enabled will look like following:

```
root
├─ src
│  ├- pages
│  │  ├- index.md
│  │  └- etc.
│  └- @adobe
│     └- gatsby-theme-parliament
│        └- components
│           └- Code
│              └- index.js        
├- .env
├─ gatsby-config.js
└─ package.json 
```

You can define your own `Code` components under `src/@adobe/gatsby-theme-parliament/components/Code/index.js`.

*Notice omitting the `src` directory in the shadow folder.*    

### Theming

Currently, you can only define a light or dark theme for Code blocks. By default, Code blocks are displayed in `dark` theme.
To change Code blocks from `dark` to `light` theme, you have to shadow the `theme/index.js` file:

```
export default {
  code: 'light'
}; 
```     

## Issue tracker

Use the [GitHub issue tracker](https://github.com/adobe/gatsby-theme-parliament/issues) to report issues, ask questions or log feature requests.
Any feedback is welcome !
   
Please check existing issues before filing anything new.

## Contributing

Contributions are welcomed! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.