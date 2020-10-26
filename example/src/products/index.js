/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import CC from './icons/cc_appicon_64.svg';
import XD from './icons/xd_appicon_64.svg';
import ST from './icons/st_appicon_64.svg';
import PS from './icons/ps_appicon_64.svg';
import LR from './icons/lr_appicon_64.svg';
import ID from './icons/id_appicon_64.svg';
import AI from './icons/ai_appicon_64.svg';
import PR from './icons/pr_appicon_64.svg';
import AE from './icons/ae_appicon_64.svg';
import BR from './icons/br_appicon_64.svg';
import AN from './icons/an_appicon_64.svg';
import AU from './icons/au_appicon_64.svg';
import DW from './icons/dw_appicon_64.svg';
import AF from './icons/adobe_fonts_appicon_darktile_32.svg';
import DC from './icons/dc_appicon_64.svg';
import AC from './icons/acrobat_standard_appicon_64.svg';
import AS from './icons/adobe_sign_appicon_64.svg';
import EC from './icons/ec_helpx_ontile_48.svg';
import EP from './icons/experience_platform_appicon_RGB_noshadow_64.svg';
import CA from './icons/camraw_SVG_256.svg';

const clouds = [
  'Adobe Creative Cloud',
  'Adobe Document Cloud',
  'Adobe Experience Cloud',
  'Adobe Experience Platform'
];

// Important: lastUpdated date should be unique to ensure stable sort across browsers
const products = [
  {
    id: 0,
    name: 'Adobe Creative Cloud',
    description: 'Adobe Creative Cloud APIs and SDKs enable developers to impact creative work for millions of users worldwide. Build and distribute inspiring, productivity-driving plugins and integrations—all with Adobe Creative Cloud.',
    icon: CC,
    discover: '/creative-cloud',
    docs: false,
    lastUpdated: '2020',
    cloud: clouds[0]
  },
  {
    id: 1,
    name: 'Creative Cloud Libraries',
    description: 'The Libraries API lets you connect your app to Creative Cloud and expand the reach of your users\' creative systems. Enable more efficient workflows by providing users with access to their creative elements, right inside your app.',
    icon: CC,
    discover: '/creative-cloud-libraries',
    docs: false,
    lastUpdated: '2019',
    cloud: clouds[0]
  },
  {
    id: 2,
    name: 'XD',
    description:
      "Adobe XD’s powerful API platform lets developers and users extend XD within the app, or in the cloud. Automate complex tasks, modify and generate document contents, integrate with external services, and more.",
    icon: XD,
    discover: '/xd',
    docs: false,
    lastUpdated: '2017',
    cloud: clouds[0]
  },
  {
    id: 3,
    name: 'Stock',
    description: 'Give your users access to the perfect Adobe Stock asset to enhance their creative projects.',
    icon: ST,
    discover: '/apis/creativecloud/stock',
    docs: false,
    lastUpdated: '2002',
    cloud: clouds[0]
  },
  {
    id: 4,
    name: 'Photoshop',
    description:
      'With Photoshop APIs and SDKs, build plugins and integrations that harness the power of the world\'s best image editing software to transform creative workflows.',
    icon: PS,
    discover: '/photoshop',
    docs: false,
    lastUpdated: '2018',
    cloud: clouds[0]
  },
  {
    id: 5,
    name: 'Lightroom',
    description: 'Create effects, define presets and brushes, manipulate metadata, and much more in Lightroom.',
    icon: LR,
    discover: '/apis/creativecloud/lightroom',
    docs: false,
    lastUpdated: '1999',
    cloud: clouds[0]
  },
  {
    id: 6,
    name: 'InDesign',
    description: 'Give your InDesign users the power to streamline their editorial and publishing workflows.',
    icon: ID,
    discover: '/apis/creativecloud/indesign',
    docs: false,
    lastUpdated: '1997',
    cloud: clouds[0]
  },
  {
    id: 7,
    name: 'Illustrator',
    description: 'Give users enhanced power over their vector image projects with effects, automation, and more.',
    icon: AI,
    discover: '/apis/creativecloud/illustrator',
    docs: false,
    lastUpdated: '1994',
    cloud: clouds[0]
  },
  {
    id: 8,
    name: 'Premiere Pro',
    description:
      'Automate complex tasks, communicate with external hardware, add support for new codecs, and more.',
    icon: PR,
    discover: '/apis/creativecloud/premierepro',
    docs: false,
    lastUpdated: '1992',
    cloud: clouds[0]
  },
  {
    id: 9,
    name: 'After Effects',
    description:
      'Create stunning visual effects, manipulate project elements, and automate complex tasks in After Effects.',
    icon: AE,
    discover: '/apis/creativecloud/aftereffects',
    docs: false,
    lastUpdated: '1990',
    cloud: clouds[0]
  },
  {
    id: 10,
    name: 'Bridge',
    description:
      'Automate complex file conversion processes, manipulate metadata in bulk, create custom workspaces and interfaces, and more.',
    icon: BR,
    discover: '/apis/creativecloud/bridge',
    docs: false,
    lastUpdated: '1987',
    cloud: clouds[0]
  },
  {
    id: 11,
    name: 'Animate',
    description: 'Build Animate extensions that provide custom tools for creatives, automate workflows, and more.',
    icon: AN,
    discover: '/apis/creativecloud/animate',
    docs: false,
    lastUpdated: '1986',
    cloud: clouds[0]
  },
  {
    id: 12,
    name: 'Audition',
    description: 'Tune Adobe Audition to your specs by automating tasks, connecting to web services, and more.',
    icon: AU,
    discover: '/apis/creativecloud/audition',
    docs: false,
    lastUpdated: '1985',
    cloud: clouds[0]
  },
  {
    id: 13,
    name: 'Dreamweaver',
    description: 'Add powerful features for building web apps. Automate your cross-application workflows.',
    icon: DW,
    discover: '/apis/creativecloud/dreamweaver',
    docs: false,
    lastUpdated: '1984',
    cloud: clouds[0]
  },
  {
    id: 14,
    name: 'Adobe Fonts',
    description:
      'The Adobe Fonts API gives you programmatic access to the Adobe Fonts service over a RESTful HTTP API.',
    icon: AF,
    discover: '/fonts',
    docs: false,
    lastUpdated: '1983',
    cloud: clouds[0]
  },
  {
    id: 15,
    name: 'Camera Raw',
    description:
      'Adobe Camera Raw SDKs allows you to create DNG images, and distribute Presets and Profiles for use inside of ACR, Lightroom Classic, and Lightroom CC.',
    icon: CA,
    discover: '/apis/creativecloud/camera-raw',
    docs: false,
    lastUpdated: '1982',
    cloud: clouds[0]
  },
  {
    id: 16,
    name: 'Adobe PDF Embed API',
    description:
      'With only a few lines of JavaScript, provide an industry leading PDF viewing and collaboration experience. Easily integrate discovery and engagement data into Analytics platforms.',
    icon: DC,
    discover: '/apis/documentcloud/viesdk',
    docs: false,
    lastUpdated: '2016',
    cloud: clouds[1]
  },
  {
    id: 17,
    name: 'Adobe Document Cloud',
    description: 'Improve the way you engage with documents. With Adobe services, you can extend applications like Adobe Acrobat Reader DC and integrate our platform into your systems and apps.',
    icon: DC,
    discover: '/apis/documentcloud.html',
    docs: false,
    lastUpdated: '2014',
    cloud: clouds[1]
  },
  {
    id: 18,
    name: 'Acrobat DC',
    description: 'Create, edit, sign, and share PDFs faster and easier than ever.',
    icon: AC,
    discover: '/apis/documentcloud/acrobat',
    docs: false,
    lastUpdated: '2013',
    cloud: clouds[1]
  },
  {
    id: 19,
    name: 'Adobe Sign',
    description: 'Easily integrate e-signatures and 100% digital workflows to your organization.',
    icon: AS,
    discover: '/apis/documentcloud/sign',
    docs: '/apis/documentcloud/sign/docs',
    lastUpdated: '2010',
    cloud: clouds[1]
  },
  {
    id: 20,
    name: 'Adobe PDF Tools API',
    description:
      'An easy-to-use cloud-based API that can automate creation, manipulation and transformation of PDF documents.',
    icon: DC,
    discover: '/apis/documentcloud/Services',
    docs: false,
    lastUpdated: '2007',
    cloud: clouds[1]
  },
  {
    id: 21,
    name: 'Adobe Experience Cloud',
    description:
      'The most complete set of marketing solutions available. And it gives you everything you need to get deep insight into your customers, build personalized campaigns and manage your content and assets.',
    icon: EC,
    discover: '/apis/experiencecloud',
    docs: false,
    lastUpdated: '2016',
    cloud: clouds[2]
  },
  {
    id: 22,
    name: 'Adobe Analytics',
    description:
      'The industry-leading solution for applying real-time analytics and detailed segmentation across all of your marketing channels.',
    icon: false,
    discover: '/apis/experiencecloud/analytics',
    docs: '/apis/experiencecloud/analytics/docs',
    lastUpdated: '2012',
    cloud: clouds[2]
  },
  {
    id: 23,
    name: 'Adobe Audience Manager',
    description:
      'Helps you build unique audience profiles so you can identify your most valuable segments and use them across any digital channel.',
    icon: false,
    discover: '/apis/experiencecloud/audiencemanager',
    docs: false,
    lastUpdated: '2009',
    cloud: clouds[2]
  },
  {
    id: 24,
    name: 'Adobe Campaign',
    description:
      'A set of solutions that help you personalize and deliver campaigns across all of your online and offline channels.',
    icon: false,
    discover: '/apis/experiencecloud/campaign',
    docs: false,
    lastUpdated: '2006',
    cloud: clouds[2]
  },
  {
    id: 25,
    name: 'Adobe Experience Manager',
    description: 'A comprehensive content management solution for building websites, mobile apps and forms.',
    icon: false,
    discover: '/apis/experiencecloud/aem',
    docs: false,
    lastUpdated: '2004',
    cloud: clouds[2]
  },
  {
    id: 26,
    name: 'Adobe Primetime',
    description:
      'A multiscreen TV platform that helps broadcasters, cable networks and service providers create and monetize engaging and personalized TV and film experiences.',
    icon: false,
    discover: '/apis/experiencecloud/primetime',
    docs: false,
    lastUpdated: '2001',
    cloud: clouds[2]
  },
  {
    id: 27,
    name: 'Adobe Target',
    description:
      'A personalization solution that makes it easy to identify your best content through tests that are easy to execute, enabling you to deliver the right experience to the right customer. The APIs can be integrated neatly into a range of application stacks.',
    icon: false,
    discover: '/apis/experiencecloud/target',
    docs: false,
    lastUpdated: '1996',
    cloud: clouds[2]
  },
  {
    id: 28,
    name: 'AEM Connectors',
    description:
      'AEM Connectors are integrations written and maintained by AEM\'s partner community. They are listed in the Adobe Exchange where customers can read about their features and how to access them.',
    icon: false,
    discover: '/apis/experiencecloud/aem/aemconnectors.html',
    docs: false,
    lastUpdated: '1981',
    cloud: clouds[2]
  },
  {
    id: 29,
    name: 'Cloud Manager',
    description: 'Enables organizations to self-manage Experience Manager environments in the cloud.',
    icon: false,
    discover: '/apis/experiencecloud/cloud-manager',
    docs: '/apis/experiencecloud/cloud-manager/docs',
    lastUpdated: '1989',
    cloud: clouds[2]
  },
  {
    id: 30,
    name: 'Adobe Commerce Cloud Integrations',
    description: 'Adobe Commerce Cloud Integrations Cloud-based version of the Commerce Integration Framework integrates any commerce solution with the Experience Cloud.',
    icon: false,
    discover: '/apis/experiencecloud/commerce-integration-framework.html',
    lastUpdated: '1980',
    cloud: clouds[2]
  },
  {
    id: 31,
    name: 'Adobe Experience Platform',
    description:
      'Adobe Experience Platform provides a central service for Data Ingestion, Governance, Insights, and Actioning. These services are built API First.',
    icon: EP,
    discover: '/apis/experienceplatform',
    docs: false,
    lastUpdated: '2015',
    cloud: clouds[3]
  },
  {
    id: 32,
    name: 'Adobe Developer Console',
    description: 'Adobe I/O Console gives you access to APIs, SDKs and developer tools to build on, integrate, and extend Adobe products.',
    icon: false,
    discover: '/apis/experienceplatform/console',
    docs: '/apis/experienceplatform/console/docs',
    lastUpdated: '2011',
    cloud: clouds[3]
  },
  {
    id: 33,
    name: 'Project Firefly',
    description:
      'Project Firefly is a complete framework for building custom cloud native Adobe apps that extend Adobe solutions and run on our infrastructure.',
    icon: false,
    discover: '/apis/experienceplatform/project-firefly',
    docs: '/apis/experienceplatform/project-firefly/docs',
    lastUpdated: '2008',
    cloud: clouds[3]
  },
  {
    id: 34,
    name: 'Adobe Experience Platform Launch',
    description:
      'Adobe Experience Platform Launch, by Adobe is a next-generation tag management system that unifies the client-side marketing ecosystem by empowering developers to build integrations on a robust, extensible platform that partners, clients, and the broader industry can build on and contribute to.',
    icon: false,
    discover: '/apis/experienceplatform/experienceplatformlaunch',
    docs: false,
    lastUpdated: '2005',
    cloud: clouds[3]
  },
  {
    id: 35,
    name: 'Adobe I/O Events',
    description:
      'Lightning-fast event-based integrations using WebHooks.With Adobe I/O Events, you can code event-driven experiences, applications, and custom workflows that leverage and combine Adobe Experience Cloud, Creative Cloud, and Document Cloud.',
    icon: false,
    discover: '/apis/experienceplatform/events',
    docs: '/apis/experienceplatform/events/docs',
    lastUpdated: '2003',
    cloud: clouds[3]
  },
  {
    id: 36,
    name: 'Adobe I/O Runtime',
    description:
      'The Adobe I/O Runtime is a serverless platform that allows you to quickly deploy custom code to respond to events and execute functions right in the cloud, all with no server set-up required.',
    icon: false,
    discover: '/apis/experienceplatform/runtime',
    docs: '/apis/experienceplatform/runtime/docs',
    lastUpdated: '2000',
    cloud: clouds[3]
  },
  {
    id: 37,
    name: 'Adobe Mobile SDK',
    description:
      'These SDKs allow you to capture native app activity (user, usage, behavior, gestures) and forward that data to Adobe collection servers for use in Analytics reporting.',
    icon: false,
    discover: '/apis/experienceplatform/mobile',
    docs: '/apis/experienceplatform/mobile/docs',
    lastUpdated: '1998',
    cloud: clouds[3]
  },
  {
    id: 38,
    name: 'Places API',
    description:
      'Places service consists of set of REST APIs, which allows Adobe Experience Cloud and third-party product users to integrate with geo-location functionality. The API suite also provides query APIs, which can be integrated in web and mobile applications to access information about proximity to the geo-fences. Using the Places APIs with Experience Cloud SDKs helps mobile developers enrich Adobe Experience Platform with location data.',
    icon: false,
    discover: '/apis/experienceplatform/placesapi',
    docs: false,
    lastUpdated: '1995',
    cloud: clouds[3]
  },
  {
    id: 39,
    name: 'Privacy Service API',
    description:
      'Privacy Service provides a RESTful API and user interface to help companies manage customer data requests for Experience Cloud solutions, and was developed in response to a fundamental shift in how businesses are required to manage the personal data of their customers.',
    icon: false,
    discover: '/apis/experienceplatform/gdpr',
    docs: '/apis/experienceplatform/gdpr/docs',
    lastUpdated: '1993',
    cloud: clouds[3]
  },
  {
    id: 40,
    name: 'Project Griffon',
    description:
      'We’ve created Project Griffon for you. Your input is vital to our design and development process. Let us know how we can make this product more intuitive to fit, naturally, with your existing workflows.',
    icon: false,
    discover: '/apis/experienceplatform/griffon',
    docs: false,
    lastUpdated: '1991',
    cloud: clouds[3]
  },
  {
    id: 41,
    name: 'User Management API',
    description:
      "Adobe's User Management API allows the programmatic management of users, groups, and entitlements in Adobe Creative Cloud. Manage Creative Cloud Enterprise users with an API.",
    icon: false,
    discover: '/apis/experienceplatform/umapi-new',
    docs: false,
    lastUpdated: '1988',
    cloud: clouds[3]
  }
];

export {clouds, products};
