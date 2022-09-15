# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.5.8](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.5.7...@adobe/gatsby-theme-aio@4.5.8) (2022-09-15)

### Features

* Added local search alpha for testing. WIP.

## [4.5.7](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.5.6...@adobe/gatsby-theme-aio@4.5.7) (2022-09-14)

* Fix package version [051012d](https://github.com/adobe/aio-theme/commit/910f3e6c36478d7a026baa5541a98c73012209f7).

## [4.5.6](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.5.5...@adobe/gatsby-theme-aio@4.5.6) (2022-09-14)

* Fix package version [051012d](https://github.com/adobe/aio-theme/commit/910f3e6c36478d7a026baa5541a98c73012209f7).

## [4.5.5](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.5.4...@adobe/gatsby-theme-aio@4.5.5) (2022-09-14)

* Reopen theme's custom schema for automatic type inference from other projects [051012d](https://github.com/adobe/aio-theme/pull/1090/commits/051012dc5652cf2bff9614888aad208d4b0876ae).

## [4.5.4](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.5.3...@adobe/gatsby-theme-aio@4.5.4) (2022-09-13)

* Adds a `path` key to all the search record objects for use on the frontend.
* Refactors our custom graphql schema code in `gatsby-node.js` to return defaults and ensure our custom types are being resolved correctly.
* Adds default return values (currently null) to `getProductFromIndex()` and `getIndexesFromProduct()` when there is no matching product or index passed.
* Removes the product and index names of the theme's example project from the list of AdobeDocs products and indexes.

## [4.5.3](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.5.2...@adobe/gatsby-theme-aio@4.5.3) (2022-09-08)

### Fixes 

* Fixed slug for search result urls.

## [4.5.2](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.5.1...@adobe/gatsby-theme-aio@4.5.2) (2022-09-07)

### Fixes 

* Fixed description and title errors.

## [4.5.1](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.5.0...@adobe/gatsby-theme-aio@4.5.1) (2022-09-07)

### Features

* Added `isNew` search property that tags a markdown file as new as long as its creation date is within the last 60 days.
* Added `howRecent` search property that tags a markdown file as recently updated. Each search result is tagged with one of the following four values used to influence the search result ranking:

  `3` — the file was updated within the last 30 days,

  `2` — the file was updated within the last 60 days,

  `1` — the file was updated within the last 120 days,

  `0` — the file was updated more than 120 days ago.

* Added `icon` search property for future implementation. The icon will be used to display a product or category icon to help identify the product or type of search result returned. ([4b8f284](https://github.com/adobe/aio-theme/commit/4b8f284c6a72468c2fd74bacded7ed0f956f3ddc))

### Fixes

* Updated Algolia index settings to increase timeouts. This fixed an issue in which Algolia indexing could time out and fail when upload speeds are slow and indexes are large. ([4b8f284](https://github.com/adobe/aio-theme/commit/4b8f284c6a72468c2fd74bacded7ed0f956f3ddc))

## [4.5.1-rc0](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.5.0...@adobe/gatsby-theme-aio@4.5.1-rc0) (2022-09-07)

### Features

* Products filter list now shows all available products based on current query. ([0196aceeb](https://github.com/adobe/aio-theme/commit/0196aceeb344fbc6df09f7f75813124296c61b20))

* Added product selection based on new algolia indexing. ([f96dc93af](https://github.com/adobe/aio-theme/commit/f96dc93af222b517e4725e2e3d33335d65a7e0de))

## [4.5.0](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.4.4...@adobe/gatsby-theme-aio@4.5.0) (2022-09-06)

### Features

* Rewrite of the search backend to generate more accurate, detailed, relevant, and organized search results for the frontend.

## [4.4.4](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.4.3...@adobe/gatsby-theme-aio@4.4.4) (2022-08-25)

### Features

* Fix analytics feedback typo([0e8bb2a](https://github.com/adobe/aio-theme/commit/0e8bb2ab118a0039373d24412cf06086980f809f))


## [4.4.3](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.4.2...@adobe/gatsby-theme-aio@4.4.3) (2022-08-25)

### Features

* Update feedback analytics to be more descriptive ([c807f9252](https://github.com/adobe/aio-theme/commit/c807f9252da78879a9f1b76ecdd558406ebd5d2c))

* Re-added gatsby-remark-images-remote to work with gatsby v4 ([02a0c77](https://github.com/adobe/aio-theme/commit/02a0c77e76e61603b8c7667ee6ad7d540efac885))

* Fix layout in vertical tab ([031a16b](https://github.com/adobe/aio-theme/commit/031a16ba46b5fbd0a2630b093f321e7af1470d8b))

* Fix new env vars and search results cleanup([6b28c2a](https://github.com/adobe/aio-theme/commit/6b28c2a27d4c7319e2509c0c0e88c78d59e27194))

## [4.4.2](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.4.1...@adobe/gatsby-theme-aio@4.4.2) (2022-08-02)

### Features

* Fixed wrong env variable in layout for search([7fc0092](https://github.com/adobe/aio-theme/commit/7fc00927b131e0688633acd56b0c5f189d4809dc))

## [4.4.1](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.4.0...@adobe/gatsby-theme-aio@4.4.1) (2022-07-29)

### Features

* Fixed missing parameter in search results error. aka the 'photoshop' query bug([03d1c57](https://github.com/adobe/aio-theme/commit/03d1c576fc8b68823ade66f8aa14e545e99c5c2f))

* Fixed search bar and search button not showing in example site ([bc7a655](https://github.com/adobe/aio-theme/commit/bc7a65521affba21b6d8408f7c800d2cefe3bae7))

## [4.4.0](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.3.0...@adobe/gatsby-theme-aio@4.4.0) (2022-07-28)

### Features

* Added option to create custom anchor links for markdown headings ([110a9bf](https://github.com/adobe/aio-theme/commit/110a9bf1ab0e9998b7a58ab03ee1760ad4c76821)). See [Anchor links for headings](https://github.com/adobe/aio-theme/blob/main/README.md#anchor-links-for-headings) for instructions on how to customize a heading's default anchor link.

* Updated Gatsby to version 4.19 in preparation for the release of MDX v2 ([1daa35e](https://github.com/adobe/aio-theme/commit/1daa35e5e0ec6d23f1231f4918e2a6c7ab26492f)).

### Fixed

* Prevented search indexing from duplicating records in the Algolia indexes ([1daa35e](https://github.com/adobe/aio-theme/commit/1daa35e5e0ec6d23f1231f4918e2a6c7ab26492f)). We updated the Algolia plugin to the latest version and adapted our search code to remove old stale records before adding new records to a repo's index.

## [4.3.0-rc6](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.3.0-rc5...@adobe/gatsby-theme-aio@4.3.0-rc6) (2022-07-11)

### Features

* Fixed stage target origin to be * since helix stage origins are dynamic([d45df7b](https://github.com/adobe/aio-theme/commit/d45df7b7fbcc63f1cd95fcf30e4f2b0a3a108253))


## [4.3.0-rc5](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.3.0-rc4...@adobe/gatsby-theme-aio@4.3.0-rc5) (2022-07-11)

### Features

* Fixed context switching for dev, stage, and prod ([2c654ab](https://github.com/adobe/aio-theme/commit/2c654ab9626b14593f3f72ebb430e650da9feedf))

## [4.3.0-rc4](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.3.0-rc3...@adobe/gatsby-theme-aio@4.3.0-rc4) (2022-07-11)

### Features

* Fixed wrong origin for postMessage ([bde3cde](https://github.com/adobe/aio-theme/commit/bde3cde5a978c97e8127699534e85878df0c79e8))

## [4.3.0-rc3](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.3.0-rc2...@adobe/gatsby-theme-aio@4.3.0-rc3) (2022-07-11)

### Features

* Added communication of query string parameters to parent from search when iframed ([cdb0504](https://github.com/adobe/aio-theme/commit/cdb0504b56ce85bb781aa3a9d1bcf2947c1395e7))


## [4.3.0-rc2](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.3.0-rc1...@adobe/gatsby-theme-aio@4.3.0-rc2) (2022-06-22)

### Features

* Add top level access to search result links and styles ready for iframe ([63f2538](https://github.com/adobe/aio-theme/commit/63f25384400a30a0a2035780dbc335b72bb4a545))


## [4.3.0-rc1](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.3.0-rc0...@adobe/gatsby-theme-aio@4.3.0-rc1) (2022-05-17)


### Fix

* Check by path prefix instead and remove package-lock ([e3d7e30](https://github.com/adobe/aio-theme/commit/e3d7e30dcd6374845864a2f76c54ec96f861ea26))


## [4.3.0-rc0](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.2.0...@adobe/gatsby-theme-aio@4.3.0-rc0) (2022-05-09)


### Features

* Add search widget into its own page via special path ([8dc75c8](https://github.com/adobe/aio-theme/commit/8dc75c8f926e307c4475ba13b9fd654022ceb414))

## [4.3.0](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.2.2...@adobe/gatsby-theme-aio@4.3.0) (2022-06-29)

### Features

* Update theme to use yarn version 3.2.1 ([4215464](https://github.com/adobe/aio-theme/commit/4215464eab10227b01253b0a7e12538ff802d211))

* Update to new version of spectrum css ([4879eff](https://github.com/adobe/aio-theme/commit/4879eff321e4ba849461899e163a69a47cd943b8))

### Fix

* attach analytics to feedback ([ef1e08c](https://github.com/adobe/aio-theme/commit/ef1e08c205d353b7693d42e829962a782c786fa9))


## [4.2.2](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.2.1...@adobe/gatsby-theme-aio@4.2.2) (2022-05-18)

### Fix

* Fix attributes ([128535d](https://github.com/adobe/aio-theme/commit/128535db5f233f1f38da5f14957fb235dff1f52c))


## [4.2.1](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.2.0...@adobe/gatsby-theme-aio@4.2.1) (2022-05-11)

### Features

* Attribution and Edition features ([495f298](https://github.com/adobe/aio-theme/commit/495f2987f8d0963775105d229aae5f74ef491e30))
* Accessibility fixes in theme components and layout ([6e58d76](https://github.com/adobe/aio-theme/commit/6e58d765f9f5c539c7b93a6ee58963ae2a1b3afb))



## [4.2.0](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.1.1...@adobe/gatsby-theme-aio@4.2.0) (2022-05-03)


### Features

* Add feature to hide bread crumbs. ([d6e56aa](https://github.com/adobe/aio-theme/commit/d6e56aa9ff58a7f1d40b4ff3d96afce6a2d5b029))



## [4.1.1](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.1.0...@adobe/gatsby-theme-aio@4.1.1) (2022-04-28)


### Bug Fixes

* add prettier option bracketSameLine and format code ([c8ece66](https://github.com/adobe/aio-theme/commit/c8ece665fd35b87e43bc900cb897853b83d24639))
* clean up gdocs leftovers and add CODEOWNERS ([cc9c576](https://github.com/adobe/aio-theme/commit/cc9c576408d4706aecc8da09e10b5a1f71263499))
* header search button aria label ([#835](https://github.com/adobe/aio-theme/issues/835)) ([8b8d9fb](https://github.com/adobe/aio-theme/commit/8b8d9fbd0e67a6a788917015bac8a48d8aa33053))





# [4.1.0](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.1.0...@adobe/gatsby-theme-aio@4.0.0) (2022-04-27)


### Bug Fixes 

* Upgrade gatsby plugins to work with gatsby@4.13.0. Removed support for gatsby-source-gdocs2md since it was unused and uncompatible with gatsby 4 ([803fa62](https://github.com/adobe/aio-theme/commit/803fa6279df1294170468cbdc21537606b40303b))



# [4.0.0](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@4.0.0...@adobe/gatsby-theme-aio@3.24.2) (2022-04-21)


### Features 

* Upgrade to gatsby@4.12.1 ([3fef098](https://github.com/adobe/aio-theme/commit/3fef098226959b6ff87d6106983e48541effcd3))


# [3.24.2](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.24.2...@adobe/gatsby-theme-aio@3.24.1) (2022-04-20)


### Features & Bug Fixes

* Fixed tab width issue for documentation layout and enhanced horizontal variant's design ([789d292](https://github.com/adobe/aio-theme/commit/789d2929c3ede36af9c7d21897848246b73d4788))



# [3.24.1](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.24.0...@adobe/gatsby-theme-aio@3.24.1) (2022-04-20)


### Features

* **DEVSITE-378:** Fix penpal timeout in iFrame ([651398d](https://github.com/adobe/aio-theme/commit/651398dce38b03037e35dba2d08d43823608d206))



# [3.24.0](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.23.11...@adobe/gatsby-theme-aio@3.24.0) (2022-03-09)


### Features

* **SITES-5061:** enable adobe io parent frame to return client id ([#739](https://github.com/adobe/aio-theme/issues/739)) ([682c27a](https://github.com/adobe/aio-theme/commit/682c27a719734c147099b3bcd8d54089165bdad0))





## [3.23.11](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.23.10...@adobe/gatsby-theme-aio@3.23.11) (2022-03-07)


### Bug Fixes

* set analytics script to async ([3ed01b2](https://github.com/adobe/aio-theme/commit/3ed01b2ea4a12662b91ef8f3471fbe6869651f3a))


## [3.23.10](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.23.9...@adobe/gatsby-theme-aio@3.23.10) (2022-02-17)


### Bug Fixes

* fix dropdown nav not appearing on ios mobile ([210a15b](https://github.com/adobe/aio-theme/commit/210a15be3db11100293e70285d249b29ae9c6707))


## [3.23.9](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.23.8...@adobe/gatsby-theme-aio@3.23.9) (2022-02-17)


### Bug Fixes

* clean root fix in Hero's breadcrumb ([3f0a6fa](https://github.com/adobe/aio-theme/commit/3f0a6fa59ae62314d9c72ff04044d9ad9fda56b6))





## [3.23.8](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.23.7...@adobe/gatsby-theme-aio@3.23.8) (2022-02-08)


### Bug Fixes

* Pin prism-react-rendered to 1.2.1 as 1.3.0 is broken ([c4432d2](https://github.com/adobe/aio-theme/commit/c4432d24d77ae9f916f382be6ec2454eac678737))


## [3.23.7](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.23.6...@adobe/gatsby-theme-aio@3.23.7) (2022-02-08)


### Bug Fixes

* Update footer typo links ([9f067c7](https://github.com/adobe/aio-theme/commit/9f067c742ca40b70f602f5e9e1d35cedbdd713ce))



## [3.23.6](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.23.5...@adobe/gatsby-theme-aio@3.23.6) (2022-02-08)


### Bug Fixes

* Update footer links ([9c7c9a2](https://github.com/adobe/aio-theme/commit/9c7c9a2529795b4bb9a9df0bc0cdf6f7662ebc7c))



## [3.23.5](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.23.4...@adobe/gatsby-theme-aio@3.23.5) (2022-02-08)


### Bug Fixes

* Update 404 url ([09bafb5](https://github.com/adobe/aio-theme/commit/09bafb5ff2235fb14e364314c2d8cad70c937aaa))



## [3.23.4](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.23.3...@adobe/gatsby-theme-aio@3.23.4) (2022-01-06)


### Bug Fixes

* Fix logic again for analytics ([50d5e8d](https://github.com/adobe/aio-theme/commit/50d5e8d451859e03748cf749ec978d1af785ca14))



## [3.23.3](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.23.2...@adobe/gatsby-theme-aio@3.23.3) (2022-01-05)


### Bug Fixes

* Fix logic for injecting analytics bootstrap script ([d17a592](https://github.com/adobe/aio-theme/commit/d17a592380807f2e8e370449030d1dc1eba19bd4))



## [3.23.2](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.23.1...@adobe/gatsby-theme-aio@3.23.2) (2021-12-03)


### Features

* switch over to use adobe global analytics ([e6f360c](https://github.com/adobe/aio-theme/commit/e6f360c181d6788e6e882781735b48ca08df035f))





## [3.23.1](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.23.0...@adobe/gatsby-theme-aio@3.23.1) (2021-11-30)


### Bug Fixes

* heading querySelector error in OnThisPage component ([649943e](https://github.com/adobe/aio-theme/commit/649943e86a19900618003e03dc78ec289e00dfe3))
* webpack polyfill error ([#609](https://github.com/adobe/aio-theme/issues/609)) ([c5794f8](https://github.com/adobe/aio-theme/commit/c5794f84ef9f578adb9f665c6b0bd933a3a422ae))





# [3.23.0](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.22.1...@adobe/gatsby-theme-aio@3.23.0) (2021-10-21)


### Features

* use redoc-cli to render open api as html for algolia indexing ([#534](https://github.com/adobe/aio-theme/issues/534)) ([abbd479](https://github.com/adobe/aio-theme/commit/abbd479c22d6fb485d7e2a75bc2181b63b959b07))





## [3.22.1](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.22.0...@adobe/gatsby-theme-aio@3.22.1) (2021-10-20)


### Bug Fixes

* typo in Footer ([347f215](https://github.com/adobe/aio-theme/commit/347f2150b3a2350d87afecb86a48dad69a02d567))





# [3.22.0](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.21.2...@adobe/gatsby-theme-aio@3.22.0) (2021-10-19)


### Features

* update Footer with feds privacy ([a56c71e](https://github.com/adobe/aio-theme/commit/a56c71ed8bedeba2bbe8b852444f82492c8d6c99))





## [3.21.2](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.21.1...@adobe/gatsby-theme-aio@3.21.2) (2021-10-19)


### Bug Fixes

* update footer to point to App Builder ([8fbbfb7](https://github.com/adobe/aio-theme/commit/8fbbfb77ee58ef77d060517437c5339b4a6749b3))





## [3.21.1](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.21.0...@adobe/gatsby-theme-aio@3.21.1) (2021-10-13)


### Bug Fixes

* algolia indexer crashing on local open api path ([1d57228](https://github.com/adobe/aio-theme/commit/1d57228ff73228c913d7ea37214886275d1e5ddd))





# [3.21.0](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.20.3...@adobe/gatsby-theme-aio@3.21.0) (2021-10-08)


### Bug Fixes

* improve search relevance to provide better search results ([00bb241](https://github.com/adobe/aio-theme/commit/00bb2411b5a66e8b014d6c92b763b3284073cbb7)), closes [#461](https://github.com/adobe/aio-theme/issues/461)
* move swiper code into separate component ([0122a58](https://github.com/adobe/aio-theme/commit/0122a588da0fe44ba5c93cac0ae76626e13728f0))


### Features

* implemented Carousel component ([#515](https://github.com/adobe/aio-theme/issues/515)) ([bd61315](https://github.com/adobe/aio-theme/commit/bd613154509dc07843bb0bac240c80dfebeca38b))
* updated Tabs and implemented TabsBlock component ([#518](https://github.com/adobe/aio-theme/issues/518)) ([54b99a4](https://github.com/adobe/aio-theme/commit/54b99a4314e46000c96335071698aba0b1bc8321))





## [3.20.3](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.20.2...@adobe/gatsby-theme-aio@3.20.3) (2021-09-28)


### Bug Fixes

* code format ([d0835bc](https://github.com/adobe/aio-theme/commit/d0835bc3f3cf6daf322cf0ca7f6245ad2f9f4f39))
* keep sidenav open while navigating ([4f2aba7](https://github.com/adobe/aio-theme/commit/4f2aba7d52c80a8bbf33454c27a23526183fbbdd))





## [3.20.2](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.20.1...@adobe/gatsby-theme-aio@3.20.2) (2021-09-28)


### Bug Fixes

* **code:** only remove last token when the last token is blank. fixes [#505](https://github.com/adobe/aio-theme/issues/505) ([#506](https://github.com/adobe/aio-theme/issues/506)) ([4c4ed17](https://github.com/adobe/aio-theme/commit/4c4ed17a314a2c50d4056240435dd5820a846e5a))
* make sure link in api description has the right color ([bf03c24](https://github.com/adobe/aio-theme/commit/bf03c245cb7d42760810a3bab50a92f5a9292abf))
* **picker:** update picker options array when items changes. fixes [#503](https://github.com/adobe/aio-theme/issues/503) ([#504](https://github.com/adobe/aio-theme/issues/504)) ([242daf9](https://github.com/adobe/aio-theme/commit/242daf902136fa39a675b4172bd81e88aa60d91a))





## [3.20.1](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.20.0...@adobe/gatsby-theme-aio@3.20.1) (2021-08-30)


### Bug Fixes

* typo in GATSBY_ALGOLIA_APP_ID ([27ec5da](https://github.com/adobe/aio-theme/commit/27ec5da2ee785d17d082f7d1186b276279662faf))





# [3.20.0](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.19.1...@adobe/gatsby-theme-aio@3.20.0) (2021-08-26)


### Bug Fixes

* only render SideNav overlay if there is a SideNav ([729fe0d](https://github.com/adobe/aio-theme/commit/729fe0d5eb0d1b7fbd13f7d7503b31f101389cda))
* replace I/O console with Adobe Developer Console ([417a25c](https://github.com/adobe/aio-theme/commit/417a25cbcb716c59b37772cfa788be36909953cf))


### Features

* expand SideNav links without loading the actual page ([5aed64a](https://github.com/adobe/aio-theme/commit/5aed64a03db942ef4222b27c264dc83707afe29e))





## [3.19.1](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.19.0...@adobe/gatsby-theme-aio@3.19.1) (2021-08-24)


### Bug Fixes

* avoid fetching Algolia index src if none is set ([290ac8b](https://github.com/adobe/aio-theme/commit/290ac8bee86cace593d03e76a44e2723c3874026))





# [3.19.0](https://github.com/adobe/aio-theme/compare/@adobe/gatsby-theme-aio@3.18.3...@adobe/gatsby-theme-aio@3.19.0) (2021-08-24)


### Bug Fixes

* duplicated contributors (closes [#468](https://github.com/adobe/aio-theme/issues/468)) ([89ce80c](https://github.com/adobe/aio-theme/commit/89ce80cc1db44c300d2e2dec351482cf445c0c90))
* wrong font family on OpenAPIBlock headings (closes [#470](https://github.com/adobe/aio-theme/issues/470)) ([17873e7](https://github.com/adobe/aio-theme/commit/17873e72edc9c875504df48e413f4becc9a711d2))


### Features

* set docs layout by default ([85b1b4e](https://github.com/adobe/aio-theme/commit/85b1b4e3382dc49adfe4df046d135223a88f91ee))
* support dynamic Algolia indexes ([6d307c2](https://github.com/adobe/aio-theme/commit/6d307c2d9b1da61d79847ecdeb6a73525d83f3ce))
* update to latest redoc version ([7c880c0](https://github.com/adobe/aio-theme/commit/7c880c0af5fa7aef8e7e9dbeefc04a629a76f3cd))





## [3.18.3](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.18.2...@adobe/gatsby-theme-aio@3.18.3) (2021-08-12)


### Bug Fixes

* global header tabs margin for hidden home ([664245f](https://github.com/adobe/gatsby-theme-aio/commit/664245fa7244280cafc030875a694fab3978e55c))





## [3.18.2](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.18.1...@adobe/gatsby-theme-aio@3.18.2) (2021-08-12)


### Bug Fixes

* display url information in search suggestions ([1efe38a](https://github.com/adobe/gatsby-theme-aio/commit/1efe38a30ea2957fd793a21359730bbdc9aeee55))
* double click to close search overlay in some case ([95354bf](https://github.com/adobe/gatsby-theme-aio/commit/95354bf20841f8051d2e1238906abd446b5f0381))
* encode html entities in search results ([e85dedd](https://github.com/adobe/gatsby-theme-aio/commit/e85deddbaced0a17259e2623070b502202d496c0))
* nested links in search suggestions ([5d66daa](https://github.com/adobe/gatsby-theme-aio/commit/5d66daa869a9df1261a0fc0e4e4ce965ad628698))
* update console.adobe.io urls ([98bc2cd](https://github.com/adobe/gatsby-theme-aio/commit/98bc2cdc5fe2aec64247a7db5c67a422565c562d))





## [3.18.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.18.0...@adobe/gatsby-theme-aio@3.18.1) (2021-08-11)


### Bug Fixes

* **DEVSITE-124:** search-Broken Titles ([#459](https://github.com/adobe/gatsby-theme-aio/issues/459)) ([f23003f](https://github.com/adobe/gatsby-theme-aio/commit/f23003f93d8aeca7d35bc2bc4838fe97f8f9125c))





# [3.18.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.17.8...@adobe/gatsby-theme-aio@3.18.0) (2021-08-10)


### Bug Fixes

* update env variable GATSBY_ADOBE_LAUNCH_SRC ([2935eef](https://github.com/adobe/gatsby-theme-aio/commit/2935eeff6d3f556f1fad59e95b1ee1e1d55e93be))


### Features

* add Frame method setURL() ([133ff4f](https://github.com/adobe/gatsby-theme-aio/commit/133ff4f43dfc24df6c6f194653cc2d77c808e698))





## [3.17.8](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.17.7...@adobe/gatsby-theme-aio@3.17.8) (2021-08-09)


### Bug Fixes

* separate quick search from main search ([d65a838](https://github.com/adobe/gatsby-theme-aio/commit/d65a838f7ccfabd139c60abc1a929b225ecc952a))





## [3.17.7](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.17.6...@adobe/gatsby-theme-aio@3.17.7) (2021-08-09)


### Bug Fixes

* add corrupted record url check ([a2f724f](https://github.com/adobe/gatsby-theme-aio/commit/a2f724fb3b0cd26db8773856b1dedca911336307))





## [3.17.6](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.17.5...@adobe/gatsby-theme-aio@3.17.6) (2021-08-09)


### Bug Fixes

* increase search suggestion result max limit ([19b1b75](https://github.com/adobe/gatsby-theme-aio/commit/19b1b7563866cd1d013257c43ace5b24d4427677))





## [3.17.5](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.17.4...@adobe/gatsby-theme-aio@3.17.5) (2021-08-09)


### Bug Fixes

* add linebreak between title and content search suggestion ([4bbf689](https://github.com/adobe/gatsby-theme-aio/commit/4bbf68944dc25cd775a3274e8aed61ca2fab033b))





## [3.17.4](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.17.3...@adobe/gatsby-theme-aio@3.17.4) (2021-08-08)


### Bug Fixes

* highlight search suggestion results ([ae08942](https://github.com/adobe/gatsby-theme-aio/commit/ae0894223b534960026b7494bd5ad3888db7fc02))
* keyboard navigation for search suggestions ([9a8532f](https://github.com/adobe/gatsby-theme-aio/commit/9a8532f1508de847c427cf8b759e60ac634da863))
* keywords showed in filter should be unique ([504b79d](https://github.com/adobe/gatsby-theme-aio/commit/504b79d274ff535554797d2b80e1f7e3e95f9581))
* show keyword facet count ([d257755](https://github.com/adobe/gatsby-theme-aio/commit/d257755ba3333a757f13566fd2a5e47cd049def7))
* use all indexes for search suggestions but prioritize results ([64cabcf](https://github.com/adobe/gatsby-theme-aio/commit/64cabcf07a8f08f12b7b01e838c0c7b269cb2cca))





## [3.17.3](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.17.2...@adobe/gatsby-theme-aio@3.17.3) (2021-08-06)


### Bug Fixes

* keep search suggestion links navigation internal ([6e065bc](https://github.com/adobe/gatsby-theme-aio/commit/6e065bc0e49a4ce7dd670c2a5c93ec14b8156f0c))





## [3.17.2](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.17.1...@adobe/gatsby-theme-aio@3.17.2) (2021-08-06)


### Bug Fixes

* use absolute url links for search suggestions ([22bbb3a](https://github.com/adobe/gatsby-theme-aio/commit/22bbb3abe1f6ca143257ef43dcb1a46868ccd056))





## [3.17.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.17.0...@adobe/gatsby-theme-aio@3.17.1) (2021-08-06)


### Bug Fixes

* use absolute url links for search results ([f8f69eb](https://github.com/adobe/gatsby-theme-aio/commit/f8f69eb06a86d16eb12c30386c50f813972aaca6))





# [3.17.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.16.1...@adobe/gatsby-theme-aio@3.17.0) (2021-08-06)


### Bug Fixes

* algolia indexation ([#458](https://github.com/adobe/gatsby-theme-aio/issues/458)) ([957aec8](https://github.com/adobe/gatsby-theme-aio/commit/957aec82ac22fc558d4f7c47460d3d0b0e20f78d))


### Features

* dynamic keywords filter ([cbbd5ed](https://github.com/adobe/gatsby-theme-aio/commit/cbbd5ed72238bc0767900d4d9ccc5915cb4efd75))





## [3.16.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.16.0...@adobe/gatsby-theme-aio@3.16.1) (2021-08-05)


### Bug Fixes

* keywords filter should scroll ([2f1d103](https://github.com/adobe/gatsby-theme-aio/commit/2f1d103fbf7255cdfd9be57f6cbca616b010bf31))





# [3.16.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.15.0...@adobe/gatsby-theme-aio@3.16.0) (2021-08-05)


### Bug Fixes

* **DEVSITE-107:** remove duplicated index records ([#437](https://github.com/adobe/gatsby-theme-aio/issues/437)) ([5a9a6b9](https://github.com/adobe/gatsby-theme-aio/commit/5a9a6b9e57dbd48bdcd8e3034081b8718c43ed16))
* hide OpenAPI download button ([e8b0696](https://github.com/adobe/gatsby-theme-aio/commit/e8b06962222c6b810f9e919cb8bcacaf89fc84e8))


### Features

* **DEVSITE-43:** add Search UI ([#449](https://github.com/adobe/gatsby-theme-aio/issues/449)) ([44110b3](https://github.com/adobe/gatsby-theme-aio/commit/44110b3eedbde7c50e7ed2b33e062e31a5d32619))
* enable Algola partial updates ([#456](https://github.com/adobe/gatsby-theme-aio/issues/456)) ([0918f8e](https://github.com/adobe/gatsby-theme-aio/commit/0918f8e86b98f0620a6790c4919041092f970884))





# [3.15.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.14.3...@adobe/gatsby-theme-aio@3.15.0) (2021-07-20)


### Bug Fixes

* **env-variables:** renamed algolia suffix variable and simplified logic ([#436](https://github.com/adobe/gatsby-theme-aio/issues/436)) ([800a22e](https://github.com/adobe/gatsby-theme-aio/commit/800a22e4edf3835132f1ab6c4cf89b08db52fd74))


### Features

* **DEVSITE-93:** add support of "OpenAPI" directive ([#417](https://github.com/adobe/gatsby-theme-aio/issues/417)) ([3bfac27](https://github.com/adobe/gatsby-theme-aio/commit/3bfac279c79ee35a94f058a2cfdb6ccec88a60cb))
* record consistency ([#431](https://github.com/adobe/gatsby-theme-aio/issues/431)) ([3e38b92](https://github.com/adobe/gatsby-theme-aio/commit/3e38b92f0c26959d26d4d60dfe4232435f7dae33)), closes [#418](https://github.com/adobe/gatsby-theme-aio/issues/418)
* update search settings ([#418](https://github.com/adobe/gatsby-theme-aio/issues/418)) ([5ff6b27](https://github.com/adobe/gatsby-theme-aio/commit/5ff6b275c7fdd9e7dbb0f420262215d80f0fc035))





## [3.14.3](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.14.2...@adobe/gatsby-theme-aio@3.14.3) (2021-07-02)


### Bug Fixes

* increase space between docs and console buttons ([8f94111](https://github.com/adobe/gatsby-theme-aio/commit/8f94111fd77c48ab441ad98bd36c984acc16a83d))
* support non md internal links with hash or search params ([80a99d3](https://github.com/adobe/gatsby-theme-aio/commit/80a99d324d52eeff88cef74e115ae03626972b29))





## [3.14.2](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.14.1...@adobe/gatsby-theme-aio@3.14.2) (2021-07-02)


### Bug Fixes

* show selected menu in Breadcrumbs ([9b55fc1](https://github.com/adobe/gatsby-theme-aio/commit/9b55fc1d56e37f26769ed72bce9e6d6eb92503a3))
* show selected menu in GlobalHeader ([b4d8482](https://github.com/adobe/gatsby-theme-aio/commit/b4d84829f20c9319c90e0b609ef3370c2c081f32))





## [3.14.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.14.0...@adobe/gatsby-theme-aio@3.14.1) (2021-07-01)


### Bug Fixes

* hide empty OnThisPage ([3fa0838](https://github.com/adobe/gatsby-theme-aio/commit/3fa08383431f1078900f49f5e12caff29682993e))
* show sidenav for selected menus ([8da3af7](https://github.com/adobe/gatsby-theme-aio/commit/8da3af73372186a5ded105534b445944aa59603e))





# [3.14.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.13.0...@adobe/gatsby-theme-aio@3.14.0) (2021-07-01)


### Features

* add Media Block ([f4f6217](https://github.com/adobe/gatsby-theme-aio/commit/f4f6217c55798e5465aa612b448433801cbc711a))





# [3.13.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.12.2...@adobe/gatsby-theme-aio@3.13.0) (2021-06-28)


### Bug Fixes

* linked files missing path prefix ([5def1fc](https://github.com/adobe/gatsby-theme-aio/commit/5def1fc11b0ee88c74598ab6432bf1545543130c))
* move console button for mobile layouts ([75a3e09](https://github.com/adobe/gatsby-theme-aio/commit/75a3e09bd30063289cbc162795676a1b433814ae))
* support internal non folder structured links ([ae492da](https://github.com/adobe/gatsby-theme-aio/commit/ae492da19d3fa9e6481e32a6a8eca8216327f334))


### Features

* **DEVSITE-91, DEVSITE-93:** add support of "frame" and "OpenAPI" directive ([#415](https://github.com/adobe/gatsby-theme-aio/issues/415)) ([f3e4f98](https://github.com/adobe/gatsby-theme-aio/commit/f3e4f98b20d690d15eb5c9e157e95793497af8ab))





## [3.12.2](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.12.1...@adobe/gatsby-theme-aio@3.12.2) (2021-06-25)


### Bug Fixes

* center multi TextBlock by default ([4106d12](https://github.com/adobe/gatsby-theme-aio/commit/4106d1256ed8476dd818278184ec5b23c8989246))





## [3.12.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.12.0...@adobe/gatsby-theme-aio@3.12.1) (2021-06-24)


### Bug Fixes

* missing line break for single centered TextBlock ([d339189](https://github.com/adobe/gatsby-theme-aio/commit/d33918972581b43f06cd43c2c55b2b933b8224b3))





# [3.12.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.11.2...@adobe/gatsby-theme-aio@3.12.0) (2021-06-24)


### Bug Fixes

* added resolvers to extend MdxFrontmatter fields properly ([#403](https://github.com/adobe/gatsby-theme-aio/issues/403)) ([20a0f8b](https://github.com/adobe/gatsby-theme-aio/commit/20a0f8bd3e726d765300d817cec368cd6a1f231f))
* adjust ResourceCard width, gap and layout ([edf92f9](https://github.com/adobe/gatsby-theme-aio/commit/edf92f90cce7d02f9ecf0782a1ed4166f421fa01))
* refactor algolia env params ([53475ba](https://github.com/adobe/gatsby-theme-aio/commit/53475ba7532025aa715b6b4d54b52afdb274020c))
* update Breadcrumbs to display all paths ([06671db](https://github.com/adobe/gatsby-theme-aio/commit/06671dba06efa63f9d5f8a663b9b2c4b82186eba))
* update Gatsby peer dependency to ^3.6.0 ([f58b7a7](https://github.com/adobe/gatsby-theme-aio/commit/f58b7a76eda4d310cf6c65ebbc8ad64eca1df008))
* update header title to Adobe Developer ([397b955](https://github.com/adobe/gatsby-theme-aio/commit/397b955b65e45ace1f18718655c782fd6f647e47))


### Features

* **DEVSITE-47:** implementation of Algolia plugin ([#366](https://github.com/adobe/gatsby-theme-aio/issues/366)) ([2965d4f](https://github.com/adobe/gatsby-theme-aio/commit/2965d4f9f7f48367ed2370683524f6e804b46812))
* **DEVSITE-84:** add support of "transcluded content" indexing ([#368](https://github.com/adobe/gatsby-theme-aio/issues/368)) ([3d9773a](https://github.com/adobe/gatsby-theme-aio/commit/3d9773a6a8b2cd3d6dc35cca993304a037c5a976))
* **DEVSITE-91:** move algolia variables from "site" level to "theme" ([#400](https://github.com/adobe/gatsby-theme-aio/issues/400)) ([daccfd9](https://github.com/adobe/gatsby-theme-aio/commit/daccfd9f12440ffc8c33877316c20a9a7cceac47))





## [3.11.2](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.11.1...@adobe/gatsby-theme-aio@3.11.2) (2021-06-14)


### Bug Fixes

* ensure HTML document has a lang attribute ([28404e2](https://github.com/adobe/gatsby-theme-aio/commit/28404e26bf6bf28db7ef3f38e1f8e6711b00d808))
* ensure iframe contain a non empty title attribute ([ffc135d](https://github.com/adobe/gatsby-theme-aio/commit/ffc135de448f0863cb7f11b928e3d85ee39ee345))





## [3.11.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.11.0...@adobe/gatsby-theme-aio@3.11.1) (2021-06-11)


### Bug Fixes

* use GatsbyLink for ResourceCard link ([9e16a68](https://github.com/adobe/gatsby-theme-aio/commit/9e16a6854c557781e9e28e8be867774d26083a6b))





# [3.11.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.10.1...@adobe/gatsby-theme-aio@3.11.0) (2021-06-11)


### Features

* support column layout Resource Cards ([0994b90](https://github.com/adobe/gatsby-theme-aio/commit/0994b9075168fb2de4a6f1d8bf089beba2979a1d))





## [3.10.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.10.0...@adobe/gatsby-theme-aio@3.10.1) (2021-06-10)


### Bug Fixes

* Added onReady function for ims to better handle loading and initing ([997c71d](https://github.com/adobe/gatsby-theme-aio/commit/997c71dff20a17543c73f2d2d3fd138720f4f57d))





# [3.10.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.9.5...@adobe/gatsby-theme-aio@3.10.0) (2021-06-08)


### Features

* Support custom classname for certain blocks ([b93967b](https://github.com/adobe/gatsby-theme-aio/commit/b93967b52d6fc930e5d5f25f4add78b27733e184))
* Support external link opening in same tab ([9389357](https://github.com/adobe/gatsby-theme-aio/commit/9389357fa7eb08986a0ba4b1ee24031d1d19f481))
* Support Frame scrollTop() ([03b804f](https://github.com/adobe/gatsby-theme-aio/commit/03b804f5eb29e5c98913bf4abf2367be14d51efc))





## [3.9.5](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.9.4...@adobe/gatsby-theme-aio@3.9.5) (2021-06-07)


### Bug Fixes

* Default home path is empty ([2089f5c](https://github.com/adobe/gatsby-theme-aio/commit/2089f5c447098d07060fea36736ab3796f3d4bfd))





## [3.9.4](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.9.3...@adobe/gatsby-theme-aio@3.9.4) (2021-06-07)


### Bug Fixes

* Always show console link ([4f53536](https://github.com/adobe/gatsby-theme-aio/commit/4f535362fd76cc12187ae197189d2745e7187efd))





## [3.9.3](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.9.2...@adobe/gatsby-theme-aio@3.9.3) (2021-06-07)


### Bug Fixes

* Show correct IMS avatar ([06d1ee0](https://github.com/adobe/gatsby-theme-aio/commit/06d1ee02a5da939eadf73bc3d7432f1ce9eb5df9))





## [3.9.2](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.9.1...@adobe/gatsby-theme-aio@3.9.2) (2021-06-04)


### Bug Fixes

* GlobalHeader mobile space hole ([bd0dadf](https://github.com/adobe/gatsby-theme-aio/commit/bd0dadf21c22e25f8d37f4211ae02d15152443f2))





## [3.9.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.9.0...@adobe/gatsby-theme-aio@3.9.1) (2021-06-04)


### Bug Fixes

* Frame getURL() is not returning the current location ([f88faca](https://github.com/adobe/gatsby-theme-aio/commit/f88faca05a8f7b71faed73783b28aa81dc252799))





# [3.9.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.8.1...@adobe/gatsby-theme-aio@3.9.0) (2021-06-04)


### Bug Fixes

* Add CSS transitions to home link ([fcf7efe](https://github.com/adobe/gatsby-theme-aio/commit/fcf7efe3a3abad05b2634216a9483121705d876c))


### Features

* Support Frame onShow() and onHide() ([776029e](https://github.com/adobe/gatsby-theme-aio/commit/776029ec2b7b86e9129f62d4d72e7847b28de182))





## [3.8.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.8.0...@adobe/gatsby-theme-aio@3.8.1) (2021-06-03)


### Bug Fixes

* Hero breaks if home is empty ([896a92b](https://github.com/adobe/gatsby-theme-aio/commit/896a92b0ac402683e71bf280d2658eff5a52fb84))





# [3.8.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.7.2...@adobe/gatsby-theme-aio@3.8.0) (2021-06-03)


### Features

* Support home hidden config ([73f1ca5](https://github.com/adobe/gatsby-theme-aio/commit/73f1ca5c283d531a53f37214203f9860b0e9a9e2))





## [3.7.2](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.7.1...@adobe/gatsby-theme-aio@3.7.2) (2021-06-03)


### Bug Fixes

* Remove Safari flex gap workaround ([74b741d](https://github.com/adobe/gatsby-theme-aio/commit/74b741d50cf4095aadc8ba1747e904bc15ed992e))





## [3.7.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.7.0...@adobe/gatsby-theme-aio@3.7.1) (2021-06-03)


### Bug Fixes

* Remove overflowing content on mobile screen size ([549f695](https://github.com/adobe/gatsby-theme-aio/commit/549f695426fb12947e3b8e0a4b7181d011870974))





# [3.7.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.6.3...@adobe/gatsby-theme-aio@3.7.0) (2021-05-28)


### Bug Fixes

* Remove duplicated function calls ([d4c9d33](https://github.com/adobe/gatsby-theme-aio/commit/d4c9d337164c876c4f44c1d88aa0c926beb87cb2))


### Features

* Support no layout SideNav ([6f13335](https://github.com/adobe/gatsby-theme-aio/commit/6f133354e77b38495b9ee8fc7f5f1ef0fa0a60dd))
* Support selected version ([af25568](https://github.com/adobe/gatsby-theme-aio/commit/af25568d546600ff2f3e1f92dec85bb7704e42fb))





## [3.6.3](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.6.2...@adobe/gatsby-theme-aio@3.6.3) (2021-05-27)


### Bug Fixes

* Home link styles update ([db7d2c8](https://github.com/adobe/gatsby-theme-aio/commit/db7d2c81ace9f1e4ad024c946c08e0c7993613da))





## [3.6.2](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.6.1...@adobe/gatsby-theme-aio@3.6.2) (2021-05-27)


### Bug Fixes

* Home link line break ([5d74fc9](https://github.com/adobe/gatsby-theme-aio/commit/5d74fc9c4e63ea4846d4cc9feafba79c597e5e1a))





## [3.6.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.6.0...@adobe/gatsby-theme-aio@3.6.1) (2021-05-27)


### Bug Fixes

* Remove fallback title and description ([ae2192b](https://github.com/adobe/gatsby-theme-aio/commit/ae2192bd66469158eebc2226cf2c1d75130a069d))
* Support external links defined in gatsby-config ([dca90aa](https://github.com/adobe/gatsby-theme-aio/commit/dca90aa25215a6e9c267ee3b40085b50e8f950a0))





# [3.6.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.5.2...@adobe/gatsby-theme-aio@3.6.0) (2021-05-27)


### Bug Fixes

* Update home to link instead of button ([19d9390](https://github.com/adobe/gatsby-theme-aio/commit/19d93909b5d9f7357b9709d55cc3d3b13e47c6ac))


### Features

* Support custom paths in gatsby-config ([805cd6d](https://github.com/adobe/gatsby-theme-aio/commit/805cd6d09a3dc40d4b2cd56200e40b089a35997d))





## [3.5.2](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.5.1...@adobe/gatsby-theme-aio@3.5.2) (2021-05-26)


### Bug Fixes

* Menu popover not closing when IMS is missing ([1c256ed](https://github.com/adobe/gatsby-theme-aio/commit/1c256edf7644c210e746b2cd506391b8b828495e))





## [3.5.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.5.0...@adobe/gatsby-theme-aio@3.5.1) (2021-05-25)


### Bug Fixes

* Cannot query field "componentPath" on type "SitePage" ([a4565d3](https://github.com/adobe/gatsby-theme-aio/commit/a4565d3dfabd196aed63b0a19f960db58a6aeb29))





# [3.5.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.4.0...@adobe/gatsby-theme-aio@3.5.0) (2021-05-25)


### Bug Fixes

* Footer is taking too much space on mobile screen ([f1bf1ba](https://github.com/adobe/gatsby-theme-aio/commit/f1bf1ba5a0f9332e82e0c6d37bd05cbde694a779))
* Remove Frame default margin ([c59013a](https://github.com/adobe/gatsby-theme-aio/commit/c59013abbcc89dfabc1f8d87b7ac51bf8f045ea5))


### Features

* Refresh Global Navigation Header ([f7526ec](https://github.com/adobe/gatsby-theme-aio/commit/f7526ec6776e4c11a3b9c30082eb997b2f232a11))





# [3.4.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.3.1...@adobe/gatsby-theme-aio@3.4.0) (2021-05-17)


### Features

* Enable reference style links ([#340](https://github.com/adobe/gatsby-theme-aio/issues/340)) ([6c926b7](https://github.com/adobe/gatsby-theme-aio/commit/6c926b7221e9a3a29de90253acefeb1e1c66fc48))
* Support Frame getURL() ([956d97e](https://github.com/adobe/gatsby-theme-aio/commit/956d97e45176adb46edcbb16c84c29a23e1f4ff4))





## [3.3.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.3.0...@adobe/gatsby-theme-aio@3.3.1) (2021-05-12)


### Bug Fixes

* Add new breakpoint between desktop and mobile ([6be95db](https://github.com/adobe/gatsby-theme-aio/commit/6be95db953f7ebf4132b6940eef29545da355778))
* Tabs navigation hidden by console button on mobile ([7fdbad8](https://github.com/adobe/gatsby-theme-aio/commit/7fdbad8bbf761b7173e99ffa7d80b428567e32fa))





# [3.3.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.2.1...@adobe/gatsby-theme-aio@3.3.0) (2021-05-11)


### Features

* Add IMS Profile viewer ([52e80ad](https://github.com/adobe/gatsby-theme-aio/commit/52e80ad80a176550eb338a6ae371baf59a971381))
* Support setting initial frame height ([6510ed8](https://github.com/adobe/gatsby-theme-aio/commit/6510ed89544aaec3632a2fa4981a31a60bfb72d1))





## [3.2.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.2.0...@adobe/gatsby-theme-aio@3.2.1) (2021-05-07)


### Bug Fixes

* Update IMS env naming ([4ebfe3e](https://github.com/adobe/gatsby-theme-aio/commit/4ebfe3e24090158be7edecce3083fc83e70f10f9))





# [3.2.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.1.9...@adobe/gatsby-theme-aio@3.2.0) (2021-05-07)


### Features

* Add Frame and IMS support ([f73371a](https://github.com/adobe/gatsby-theme-aio/commit/f73371ad9b41c7bb9721a3838641c3875e9712f8))





## [3.1.9](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.1.8...@adobe/gatsby-theme-aio@3.1.9) (2021-04-29)


### Bug Fixes

* Transcluded images from external repositories are ignored (fixes [#313](https://github.com/adobe/gatsby-theme-aio/issues/313)) ([1346c83](https://github.com/adobe/gatsby-theme-aio/commit/1346c83fcb96b80ee7cd2d8e41c44aa3fba6286e))





## [3.1.8](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.1.7...@adobe/gatsby-theme-aio@3.1.8) (2021-04-13)


### Bug Fixes

* Revert previous commit ([7bb26fe](https://github.com/adobe/gatsby-theme-aio/commit/7bb26fed3986e26b270bbe5cdb3a8f71de34a535))





## [3.1.7](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.1.6...@adobe/gatsby-theme-aio@3.1.7) (2021-04-13)


### Bug Fixes

* Rename launch var ([7949673](https://github.com/adobe/gatsby-theme-aio/commit/794967328fc8307317ed2399e9d8b605c0c86332))





## [3.1.6](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.1.5...@adobe/gatsby-theme-aio@3.1.6) (2021-04-13)


### Bug Fixes

* Rename launch vars ([6157bd6](https://github.com/adobe/gatsby-theme-aio/commit/6157bd63ea18b0d77040eb470bbc1c0b9df54081))





## [3.1.5](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.1.4...@adobe/gatsby-theme-aio@3.1.5) (2021-04-12)


### Bug Fixes

* Better support for internal markdown links ([96717a6](https://github.com/adobe/gatsby-theme-aio/commit/96717a68d94972583b59d433ca7a7bea24a0d22e))





## [3.1.4](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.1.3...@adobe/gatsby-theme-aio@3.1.4) (2021-04-12)


### Bug Fixes

* Build is broken without React dependencies ([d0f99ea](https://github.com/adobe/gatsby-theme-aio/commit/d0f99eaf4c00056ed7d5c6b8253b5d805ff200f0))
* Links to markdown files are broken ([e34a233](https://github.com/adobe/gatsby-theme-aio/commit/e34a233cd82debcea9ec7cada8411f242147c96a))
* Some images are stretched vertically ([c7930ab](https://github.com/adobe/gatsby-theme-aio/commit/c7930aba591438e62c182b0bd0f4d5427dff7103))





## [3.1.3](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.1.2...@adobe/gatsby-theme-aio@3.1.3) (2021-03-26)


### Bug Fixes

* Add more spacing for headings 4, 5 and 6 ([5d379c0](https://github.com/adobe/gatsby-theme-aio/commit/5d379c0665dd6b9bbb7668bf5c0d45531953f572))





## [3.1.2](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.1.1...@adobe/gatsby-theme-aio@3.1.2) (2021-03-25)


### Bug Fixes

* Support relative links in Google Docs for Anchor Buttons ([c69d56c](https://github.com/adobe/gatsby-theme-aio/commit/c69d56cecba06f0ccf6c466171fe6e5e77309c22))





## [3.1.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.1.0...@adobe/gatsby-theme-aio@3.1.1) (2021-03-25)


### Bug Fixes

* Support relative links in Google Docs ([65abcb7](https://github.com/adobe/gatsby-theme-aio/commit/65abcb751dedd6f7a8a3876a177e07eebf8966f1))





# [3.1.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.0.9...@adobe/gatsby-theme-aio@3.1.0) (2021-03-24)


### Features

* Add Google Docs support ([228d4dd](https://github.com/adobe/gatsby-theme-aio/commit/228d4ddb969e42c9dec19dc2c825baf027913e75))





## [3.0.9](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.0.8...@adobe/gatsby-theme-aio@3.0.9) (2021-03-19)


### Bug Fixes

* Images and layout are broken when JS is disabled ([8732009](https://github.com/adobe/gatsby-theme-aio/commit/873200905e78895d5b39a2c82192e6df16d33a77))
* Replace Alert with InlineAlert ([db4f671](https://github.com/adobe/gatsby-theme-aio/commit/db4f67157af5ae04a2e71afc1958d604bda26edd))





## [3.0.8](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.0.7...@adobe/gatsby-theme-aio@3.0.8) (2021-03-17)


### Bug Fixes

* Image wrapper overlapping with sibling content ([0f2f1cd](https://github.com/adobe/gatsby-theme-aio/commit/0f2f1cd1914014dccdf8deaafca6fb3742100d64))





## [3.0.7](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.0.6...@adobe/gatsby-theme-aio@3.0.7) (2021-03-16)


### Bug Fixes

* Image loading animation not working with SSR ([af3d1fc](https://github.com/adobe/gatsby-theme-aio/commit/af3d1fcbb2c28aa9ed2cc689e1d595371d871820))
* Restore temp GlobalHeader ([b257a42](https://github.com/adobe/gatsby-theme-aio/commit/b257a42a76d18d22408ee486fc5964efa98af4c1))





## [3.0.6](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.0.5...@adobe/gatsby-theme-aio@3.0.6) (2021-03-15)


### Bug Fixes

* Restore local image SVG format support ([fafe0d2](https://github.com/adobe/gatsby-theme-aio/commit/fafe0d23ea67b24889064d675cda48723893a8a1))





## [3.0.5](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.0.4...@adobe/gatsby-theme-aio@3.0.5) (2021-03-12)


### Bug Fixes

* Restore Image component for svg and gif support ([fc4a41d](https://github.com/adobe/gatsby-theme-aio/commit/fc4a41db512839576d090907758edd785aa05bd4))





## [3.0.4](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.0.3...@adobe/gatsby-theme-aio@3.0.4) (2021-03-12)


### Bug Fixes

* Remove GlobalHeaderTemp leftover in 404 page ([35e9da9](https://github.com/adobe/gatsby-theme-aio/commit/35e9da9070de6f57ea9a631a9ab178f78200706e))
* Restore remote images support ([31cb29c](https://github.com/adobe/gatsby-theme-aio/commit/31cb29c959d098d2b8bae3023add50d9dfdbba6f))





## [3.0.3](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.0.2...@adobe/gatsby-theme-aio@3.0.3) (2021-03-12)


### Bug Fixes

* Restore spacing between next/prev links ([e464dc6](https://github.com/adobe/gatsby-theme-aio/commit/e464dc666731264a9d791b55a5ecf2249b0cf8fd))
* Update dependencies and remove dead code ([d76b7cb](https://github.com/adobe/gatsby-theme-aio/commit/d76b7cb03743e857e00e19e9a1a478e507eb56e4))





## [3.0.2](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.0.1...@adobe/gatsby-theme-aio@3.0.2) (2021-03-11)


### Bug Fixes

* Add GlobalHeader spacing and remove dead code ([656c10f](https://github.com/adobe/gatsby-theme-aio/commit/656c10f237efa097bed4ee50de5dcbec2a7a3750))





## [3.0.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@3.0.0...@adobe/gatsby-theme-aio@3.0.1) (2021-03-11)


### Bug Fixes

* Add PostCSS 8.x dependency ([846fdd9](https://github.com/adobe/gatsby-theme-aio/commit/846fdd9626d7d7e009f0765e88b0b235d88a8925))





# [3.0.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.15.0...@adobe/gatsby-theme-aio@3.0.0) (2021-03-11)


### Performance Improvements

* Update to Gatsby v3.x ([308cbc1](https://github.com/adobe/gatsby-theme-aio/commit/308cbc15c042a2a61820cfe64c512e29af1e0999))


### BREAKING CHANGES

* Gatsby v3 includes breaking changes see official Gatsby docs





# [2.15.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.14.1...@adobe/gatsby-theme-aio@2.15.0) (2021-01-27)


### Features

* Support "no layout" pages for advanced customizations ([b01db3f](https://github.com/adobe/gatsby-theme-aio/commit/b01db3fb602afc44e1ebeed76838b4d1332f238a))





## [2.14.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.14.0...@adobe/gatsby-theme-aio@2.14.1) (2021-01-15)


### Bug Fixes

* Update @adobe/gatsby-source-github-file-contributors to fix Windows issue ([cc9e727](https://github.com/adobe/gatsby-theme-aio/commit/cc9e7279cddadbbdba387bf08172bf8f8d802ffd))





# [2.14.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.13.5...@adobe/gatsby-theme-aio@2.14.0) (2020-11-26)


### Features

* Support internal md links ([d8388c5](https://github.com/adobe/gatsby-theme-aio/commit/d8388c55a0c8d26420f4cf9b9ac8d4de23462f5d))





## [2.13.5](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.13.4...@adobe/gatsby-theme-aio@2.13.5) (2020-11-07)


### Bug Fixes

* Support Gatsby Link in Menus ([7711ccb](https://github.com/adobe/gatsby-theme-aio/commit/7711ccb4cd3b435fd851793dd08df0dee447c8b6))





## [2.13.4](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.13.3...@adobe/gatsby-theme-aio@2.13.4) (2020-11-07)


### Bug Fixes

* Remove duplicated Gatsby link path prefix for absolute paths ([24b5ddf](https://github.com/adobe/gatsby-theme-aio/commit/24b5ddf2635f44d712761d6f99aaddb2aa3ab335))





## [2.13.3](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.13.2...@adobe/gatsby-theme-aio@2.13.3) (2020-11-07)


### Bug Fixes

* ProductCardGrid filterByIds order ([5442cac](https://github.com/adobe/gatsby-theme-aio/commit/5442cacd3b0e98462c2f6d4cb9fe06d52d6535f3))





## [2.13.2](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.13.1...@adobe/gatsby-theme-aio@2.13.2) (2020-11-06)


### Bug Fixes

* Handle internal and external links in the code ([1c64308](https://github.com/adobe/gatsby-theme-aio/commit/1c64308af2e988841a39dc20610a27df3407b565))
* Remove dead code ([c2ef35b](https://github.com/adobe/gatsby-theme-aio/commit/c2ef35bbfba48d449690770c6d53c7226aade8a9))





## 2.13.1 (2020-11-06)


### Bug Fixes

* Update dependencies ([00b0ee0](https://github.com/adobe/gatsby-theme-aio/commit/00b0ee06c2c9ed4baa492e0096629dfd75a474ce))





# [2.13.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.12.1...@adobe/gatsby-theme-aio@2.13.0) (2020-11-04)


### Features

* Support external Gatsby links ([c723072](https://github.com/adobe/gatsby-theme-aio/commit/c7230727d1dc5a380621ed6565d50aeb4c72c400))





## [2.12.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.12.0...@adobe/gatsby-theme-aio@2.12.1) (2020-11-03)


### Bug Fixes

* ButtonGroup alignment ([8f88000](https://github.com/adobe/gatsby-theme-aio/commit/8f8800029501c81bbe959719add278a5bbfe30a0))
* Gatsby Link duplicated path prefix ([8a1a0f7](https://github.com/adobe/gatsby-theme-aio/commit/8a1a0f74df3cc42d86a1d4e111658958bc98ab92))





# [2.12.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.11.1...@adobe/gatsby-theme-aio@2.12.0) (2020-11-02)


### Bug Fixes

* Remove dead code ([ab3d54f](https://github.com/adobe/gatsby-theme-aio/commit/ab3d54f3cdc8c0ba2bc2a0a795dbf3eda74f53d2))


### Features

* Support Gatsby Link in MDX buttons and anchor links ([aaa0b0e](https://github.com/adobe/gatsby-theme-aio/commit/aaa0b0ed2c1126d2569e3e65265ae3f274771c67))





## [2.11.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.11.0...@adobe/gatsby-theme-aio@2.11.1) (2020-10-28)


### Bug Fixes

* Jumping SSR heading 2 on docs overview page ([ddb3c9e](https://github.com/adobe/gatsby-theme-aio/commit/ddb3c9e8e67b840af55cb72ac582362fca59e2ea))





# [2.11.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.10.0...@adobe/gatsby-theme-aio@2.11.0) (2020-10-26)


### Bug Fixes

* API SideNav is not collapsed ([9470fd4](https://github.com/adobe/gatsby-theme-aio/commit/9470fd4dbb353b5d049125fa5b2f57fd0a2b0252))
* ProductCardGrid sort by name regression ([59b6662](https://github.com/adobe/gatsby-theme-aio/commit/59b6662aaec0f559d5cf6eaa09350491e8ab7c24))


### Features

* Restore ProductCardGrid orderBy ([64c9b4b](https://github.com/adobe/gatsby-theme-aio/commit/64c9b4be834b33e49f53931021b283d611306bd2))





# [2.10.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.9.10...@adobe/gatsby-theme-aio@2.10.0) (2020-10-22)


### Features

* Support ProductCardGrid filterById ([a208326](https://github.com/adobe/gatsby-theme-aio/commit/a2083264e53034a451421af79a77b8319c45dcb7))





## [2.9.10](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.9.9...@adobe/gatsby-theme-aio@2.9.10) (2020-10-21)


### Bug Fixes

* Remove dead code ([e27cea8](https://github.com/adobe/gatsby-theme-aio/commit/e27cea82ca71f7309851091c87c153224475e0d0))
* Remove GlobalHeader unnecessary spacing on mobile ([a1dd3ef](https://github.com/adobe/gatsby-theme-aio/commit/a1dd3efd0ea997604a6c4ac8bc5a8268bd718514))





## [2.9.9](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.9.8...@adobe/gatsby-theme-aio@2.9.9) (2020-10-21)


### Bug Fixes

* Rename Github to GitHub ([1f6770c](https://github.com/adobe/gatsby-theme-aio/commit/1f6770c8c6bd1bcb00a9b2a4b29b5aee47bda42b))
* Use default branch for GitHub interactions ([55f340d](https://github.com/adobe/gatsby-theme-aio/commit/55f340d2408002f6616dbe13b6e885b1f6269c6b))





## [2.9.8](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.9.7...@adobe/gatsby-theme-aio@2.9.8) (2020-10-20)


### Bug Fixes

* Stretch the fullwidth Hero without image ([197c81e](https://github.com/adobe/gatsby-theme-aio/commit/197c81e954546a673726eabf671f357683081f04))





## [2.9.7](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.9.6...@adobe/gatsby-theme-aio@2.9.7) (2020-10-20)


### Bug Fixes

* Ensure ProductCard image is updated in the DOM on filtering ([c10fcf0](https://github.com/adobe/gatsby-theme-aio/commit/c10fcf060482faabec738e1615dad1caf1f425dd))





## [2.9.6](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.9.5...@adobe/gatsby-theme-aio@2.9.6) (2020-10-19)


### Bug Fixes

* Add space gap between Next / Prev links ([5725312](https://github.com/adobe/gatsby-theme-aio/commit/5725312de4c274b330b60d6230c796cbe58dfa60))





## [2.9.5](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.9.4...@adobe/gatsby-theme-aio@2.9.5) (2020-10-19)


### Bug Fixes

* Anchor OnThisPage at the top for scrollable pages ([bed0087](https://github.com/adobe/gatsby-theme-aio/commit/bed0087a6f7b8810cc87afe23fd8900ea44fa93a))





## [2.9.4](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.9.3...@adobe/gatsby-theme-aio@2.9.4) (2020-10-18)


### Bug Fixes

* Design Q&A follow-up issues ([6956080](https://github.com/adobe/gatsby-theme-aio/commit/6956080a1ef7334670efebfdfe944445475d00c2))





## [2.9.3](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.9.2...@adobe/gatsby-theme-aio@2.9.3) (2020-10-18)


### Bug Fixes

* Support SideNav paths with special characters ([af3ee52](https://github.com/adobe/gatsby-theme-aio/commit/af3ee523cbe5d3ef33652832e427a5c9e78dfca2))





## [2.9.2](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.9.1...@adobe/gatsby-theme-aio@2.9.2) (2020-10-18)


### Bug Fixes

* Remove unnecessary check ([0600a81](https://github.com/adobe/gatsby-theme-aio/commit/0600a81655d146cd31f626291d1833952e544431))





## [2.9.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.9.0...@adobe/gatsby-theme-aio@2.9.1) (2020-10-18)


### Bug Fixes

* Design Q&A follow up issues ([35f825c](https://github.com/adobe/gatsby-theme-aio/commit/35f825c236285d1b96e378d156eb919589db2f96))





# [2.9.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.8.1...@adobe/gatsby-theme-aio@2.9.0) (2020-10-17)


### Bug Fixes

* Duplicated Discover menu links on desktop ([cc04b3e](https://github.com/adobe/gatsby-theme-aio/commit/cc04b3efef7fe197d3530684584886d8256cd429))


### Features

* Support lazy loading images by default ([b7cf30d](https://github.com/adobe/gatsby-theme-aio/commit/b7cf30d49985ce4611b78768725c67475d97e84f))





## [2.8.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.8.0...@adobe/gatsby-theme-aio@2.8.1) (2020-10-17)


### Bug Fixes

* Center ProductCardGrid ([7cb4b52](https://github.com/adobe/gatsby-theme-aio/commit/7cb4b5254ff5afb9be9c64ec713afc2576708dba))
* Show Discover menu link on mobile ([20daa03](https://github.com/adobe/gatsby-theme-aio/commit/20daa031c0eb4c403a843a7275322aa45d971faa))





# [2.8.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.7.0...@adobe/gatsby-theme-aio@2.8.0) (2020-10-16)


### Bug Fixes

* Design QA (closes [#27](https://github.com/adobe/gatsby-theme-aio/issues/27)) ([#72](https://github.com/adobe/gatsby-theme-aio/issues/72)) ([664ef19](https://github.com/adobe/gatsby-theme-aio/commit/664ef190c4e5a16c23f1fa4ee9e8b78f719c1302))
* Formatting and fix ProductCard filterBy prop type ([12e25c4](https://github.com/adobe/gatsby-theme-aio/commit/12e25c4167827763f601e240d26f4d82b0fea6e7))
* Move JsDocFilter func to JsDoc component ([fc3a05b](https://github.com/adobe/gatsby-theme-aio/commit/fc3a05b9ef4f08edbd7f78b38b270d037a2fbb7b))
* Remove horizontal scrollbar with SideNav layout and restore scrollbar for OnThisPage ([3bcb277](https://github.com/adobe/gatsby-theme-aio/commit/3bcb2771a8fa56dba61365fa4b3ce833265609ba))
* Update blog path in temp GlobalHeader ([39b5c06](https://github.com/adobe/gatsby-theme-aio/commit/39b5c06ec6995bc8c2976993ed63a6645e0f3ef2))


### Features

* Add mobile best effort ([077bb64](https://github.com/adobe/gatsby-theme-aio/commit/077bb64bbd630859cc981c0c2eda96a5313287a9))





# [2.7.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.6.2...@adobe/gatsby-theme-aio@2.7.0) (2020-10-14)


### Bug Fixes

* Update 404 page with homepage link and temp GlobalHeader ([10b4111](https://github.com/adobe/gatsby-theme-aio/commit/10b411154a805d27e2fa0d4a590debfd857f8441))


### Features

* Update ProductCardFilter for general use ([fa0a42a](https://github.com/adobe/gatsby-theme-aio/commit/fa0a42ad27116f2d073c569c10b32a4da22d06e0))





## [2.6.2](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.6.1...@adobe/gatsby-theme-aio@2.6.2) (2020-10-13)


### Bug Fixes

* Remove .html suffix for most links ([44d33c3](https://github.com/adobe/gatsby-theme-aio/commit/44d33c3690bdfa0156135d1f94a92d8550563f85))





## [2.6.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.6.0...@adobe/gatsby-theme-aio@2.6.1) (2020-10-13)


### Bug Fixes

* Remove overflowing ResourceCard content ([89101e2](https://github.com/adobe/gatsby-theme-aio/commit/89101e25525d9308ade87086c606a6b51d0a0d35))





# [2.6.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.5.2...@adobe/gatsby-theme-aio@2.6.0) (2020-10-13)


### Bug Fixes

* Adjust TextBlock size ([5227e34](https://github.com/adobe/gatsby-theme-aio/commit/5227e34bf5a341abb04597c2a162bd7370dd449e))
* Fix ProductCard alignment ([a9449e3](https://github.com/adobe/gatsby-theme-aio/commit/a9449e3f7a52410269e272670fd4e2b02b584973))
* Fix ResourceCard alignment ([cd716c7](https://github.com/adobe/gatsby-theme-aio/commit/cd716c7868e0eb2eb19cd75e295189aa6d9878bc))
* Temp fix for overflow footer ([138db76](https://github.com/adobe/gatsby-theme-aio/commit/138db7629c1a1779ca2715adb7d461449017f5ec))


### Features

* Add default 404 page ([43d7b1c](https://github.com/adobe/gatsby-theme-aio/commit/43d7b1c2737b501b0054d827682d8c1a873214ea))





## [2.5.2](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.5.1...@adobe/gatsby-theme-aio@2.5.2) (2020-10-13)


### Bug Fixes

* Stretch temp GlobalNav links ([3b93af3](https://github.com/adobe/gatsby-theme-aio/commit/3b93af3b5aba745c588544073d18183c885e92e0))





## [2.5.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.5.0...@adobe/gatsby-theme-aio@2.5.1) (2020-10-13)


### Bug Fixes

* Update path /apis.html to /apis ([35c95f9](https://github.com/adobe/gatsby-theme-aio/commit/35c95f91bbb0b8ea9f07df8ed29c8841eb3684ff))





# [2.5.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.4.1...@adobe/gatsby-theme-aio@2.5.0) (2020-10-12)


### Bug Fixes

* FOUC ProductCard text on desktop ([b12cda8](https://github.com/adobe/gatsby-theme-aio/commit/b12cda80694e3f3cc98842c4545f14d5ad41c651))
* Update Adobe logo color ([1490901](https://github.com/adobe/gatsby-theme-aio/commit/149090101cce3afb4a5b8a4a7a9e58cc5f8cc8cf))


### Features

* Support frontmatter favIcon ([8116b2c](https://github.com/adobe/gatsby-theme-aio/commit/8116b2cd54d2efa852f8d90fe90b3506dbc30acb))





## [2.4.1](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.4.0...@adobe/gatsby-theme-aio@2.4.1) (2020-10-12)


### Bug Fixes

* ProductCard without icon should display heading at the top ([e8c243a](https://github.com/adobe/gatsby-theme-aio/commit/e8c243a5cd6dda43a288c8295a875dd01511690e))
* Restore GlobalHeader temp focus state ([ad4b581](https://github.com/adobe/gatsby-theme-aio/commit/ad4b581dca7b6e106dcfcae8277cc9c7d899f112))





# [2.4.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.3.0...@adobe/gatsby-theme-aio@2.4.0) (2020-10-10)


### Bug Fixes

* Add space for copy button in Code Block ([903a573](https://github.com/adobe/gatsby-theme-aio/commit/903a57302faebefac8d1da85bd8c015d3343a825))
* Cache API pages ([26ee329](https://github.com/adobe/gatsby-theme-aio/commit/26ee329d3d97fb031d0fc47f400cf79027b2472f))
* Move ProductCardFilter content out of component ([a3a2f78](https://github.com/adobe/gatsby-theme-aio/commit/a3a2f782ed6757fbc28a69c6593b9bf646a84d79))
* Remove adobe.io links ([aa8ac7d](https://github.com/adobe/gatsby-theme-aio/commit/aa8ac7dd31d07e70d0790efb9e389f12cf8e3b35))
* Remove sort icon from ProductCard filter ([275c126](https://github.com/adobe/gatsby-theme-aio/commit/275c12654ccdd92d12f89d52c3b13cd9d8cb2b54))
* Restore visuals of deep nested SideNav items ([2e96dcf](https://github.com/adobe/gatsby-theme-aio/commit/2e96dcf146850fde2d5607b9a3d5f46e2c634119))
* Support multiline heading in Text Block ([6a04b32](https://github.com/adobe/gatsby-theme-aio/commit/6a04b32ba58afe428419546fefe7bfd66bf72358))
* Support youtu.be videos in Text Blocks ([2c03442](https://github.com/adobe/gatsby-theme-aio/commit/2c03442b9c7b127f6e2141a032402d311c9f3fc1))
* TextBlocks in 3 columns are not always in a row ([c8cc3f8](https://github.com/adobe/gatsby-theme-aio/commit/c8cc3f8f31b3063788245b9956332f205d4ef274))


### Features

* Support multiple text in Hero Block ([d299b2c](https://github.com/adobe/gatsby-theme-aio/commit/d299b2c77516770106422e6ad65015c9d99e7aa5))





# [2.3.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.2.0...@adobe/gatsby-theme-aio@2.3.0) (2020-10-06)


### Bug Fixes

* Add support for JSDocParameters in transcluded content ([5d7447b](https://github.com/adobe/gatsby-theme-aio/commit/5d7447b8b799cdf2559046eefed9a2ac7cd45ec6))


### Features

* Add brand icons to ProductCardFilter ([122b9af](https://github.com/adobe/gatsby-theme-aio/commit/122b9af2fbfbc5d3977a271a7a7a06f0ca6df153))
* Add ProductCardFilter and index page example ([180f756](https://github.com/adobe/gatsby-theme-aio/commit/180f75643c16c29bacbba0679a9897ba0b86d2b4))
* Add temporary support for old GlobalHeader ([989eca3](https://github.com/adobe/gatsby-theme-aio/commit/989eca31113987e61de07995ba79e9e1dc463eba))





# [2.2.0](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.1.13...@adobe/gatsby-theme-aio@2.2.0) (2020-10-02)


### Bug Fixes

* Refactor Footer ([5f8ce9e](https://github.com/adobe/gatsby-theme-aio/commit/5f8ce9eefc43d9a8f3f0453c00609e1d8b4f4354))


### Features

* Support single link section in GlobalNav ([2db04d7](https://github.com/adobe/gatsby-theme-aio/commit/2db04d7a355dfda183ddb2d793c8d053e50d477f))





## [2.1.13](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.1.12...@adobe/gatsby-theme-aio@2.1.13) (2020-10-01)


### Bug Fixes

* Close Search Popover on form submit ([d2f976f](https://github.com/adobe/gatsby-theme-aio/commit/d2f976f9a541198552abebc859f89b3a4eca37a6))





## [2.1.12](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.1.11...@adobe/gatsby-theme-aio@2.1.12) (2020-10-01)


### Bug Fixes

* Fix Search form submit missing path prefix ([363f4c6](https://github.com/adobe/gatsby-theme-aio/commit/363f4c650d9237feac8394de2cb51e6f4672c4da))
* Update links in menus and footer ([1058e9f](https://github.com/adobe/gatsby-theme-aio/commit/1058e9f98275aef9f00310409858f2376dc57233))





## [2.1.11](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.1.10...@adobe/gatsby-theme-aio@2.1.11) (2020-10-01)


### Bug Fixes

* Fix centered Text blocks overflow text scrollbars ([e29da19](https://github.com/adobe/gatsby-theme-aio/commit/e29da19deaf7d86fe369bc51bd9856764c7f64d4))
* Fix Text blocks width ([d59d7e4](https://github.com/adobe/gatsby-theme-aio/commit/d59d7e4da24e5f7cebd5258dcd59e5a7498e41f1))





## [2.1.10](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.1.9...@adobe/gatsby-theme-aio@2.1.10) (2020-10-01)


### Bug Fixes

* Fix SideNav single level without headers ([a90c118](https://github.com/adobe/gatsby-theme-aio/commit/a90c11887f30a53ca7da23943729d208919f6a28))





## [2.1.9](https://github.com/adobe/gatsby-theme-aio/compare/@adobe/gatsby-theme-aio@2.1.8...@adobe/gatsby-theme-aio@2.1.9) (2020-09-30)


### Bug Fixes

* prepare lerna ([4961f18](https://github.com/adobe/gatsby-theme-aio/commit/4961f184fcf2fa6b8a69381d082ffd6d25c51fbe))





## 2.1.8 (2020-09-30)


### Bug Fixes

* add README ([b952f20](https://github.com/adobe/gatsby-theme-aio/commit/b952f2050c8a8c089406e5ff7eafd0c4509f7dd2))
* remove duplicated levels ([6dfb509](https://github.com/adobe/gatsby-theme-aio/commit/6dfb50910a6ed7dc49eda816f9d8af47fd54bfd1))
* remove unused data attribute ([a32fbd3](https://github.com/adobe/gatsby-theme-aio/commit/a32fbd3bf46bb070efbe9b8d4869e22e2981c020))



## 2.1.7 (2020-09-29)



## 2.1.6 (2020-09-28)



## 2.1.5 (2020-09-25)



## 2.1.4 (2020-09-25)



## 2.1.3 (2020-09-23)



## 2.1.2 (2020-09-22)



## 2.0.1 (2020-09-15)



# 2.0.0 (2020-09-15)


### Bug Fixes

* change Github Contributor plugin config env vars ([#21](https://github.com/adobe/gatsby-theme-aio/issues/21)) ([5fac4f6](https://github.com/adobe/gatsby-theme-aio/commit/5fac4f698054f36b364f3504afedab514042d125))



## 1.2.1 (2020-09-15)



# 1.2.0 (2020-09-14)



# 1.1.0 (2020-09-11)



# 1.0.0 (2020-08-28)



## 0.0.7 (2020-08-17)


### Bug Fixes

* update @adobe/gatsby-launch-script to 0.0.4 ([27d196e](https://github.com/adobe/gatsby-theme-aio/commit/27d196edcda71185a0e8b1ad97aa2b6fd01e4e9e))



## 0.0.6 (2020-08-17)



## 0.0.5 (2020-08-14)



## 0.0.4 (2020-08-14)



## 0.0.3 (2020-08-14)



## 0.0.2 (2020-08-10)
