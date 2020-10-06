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

export default [
  {
    name: 'Adobe Creative Cloud',
    products: [
      {
        name: 'Adobe Creative Cloud',
        description: 'Extend Creative Cloud apps and integrate Creative Cloud API services.',
        icon: CC,
        discover: 'https://www.adobe.io/apis/creativecloud.html',
        docs: '',
        lastUpdated: '10/5/2020'
      },
      {
        name: 'Adobe XD',
        description:
          "The Adobe XD SDK enables you to build plugins that can create and manipulate content, automate design workflows, and unleash your user's creativity.",
        icon: XD,
        discover: 'https://www.adobe.io/apis/creativecloud/xd.html',
        docs: '',
        lastUpdated: '10/5/2018'
      },
      {
        name: 'Common Extensibility Platform (CEP)',
        description: 'Build extensions with HTML, CSS, JavaScript, and Node. Deploy across multiple Adobe apps.',
        icon: '',
        discover: 'https://www.adobe.io/apis/creativecloud/cep.html',
        docs: '',
        lastUpdated: '10/5/2017'
      },
      {
        name: 'CC Storage API',
        description:
          "CC Storage API lets you access and modify assets stored in the Creative Cloud, the world's most popular creative platform.",
        icon: '',
        discover: 'https://www.adobe.io/apis/creativecloud/ccstorageapi.html',
        docs: '',
        lastUpdated: '10/5/2016'
      },
      {
        name: 'Stock',
        description: 'Give your users access to the perfect Adobe Stock asset to enhance their creative projects.',
        icon: ST,
        discover: 'https://www.adobe.io/apis/creativecloud/stock.html',
        docs: '',
        lastUpdated: '10/5/2015'
      },
      {
        name: 'Photoshop',
        description:
          'Build custom extensions for unique image processing workflows, connect to web services, and more.',
        icon: PS,
        discover: 'https://www.adobe.io/apis/creativecloud/photoshop.html',
        docs: '',
        lastUpdated: '10/5/2015'
      },
      {
        name: 'Lightroom',
        description: 'Create effects, define presets and brushes, manipulate metadata, and much more in Lightroom.',
        icon: LR,
        discover: 'https://www.adobe.io/apis/creativecloud/lightroom.html',
        docs: '',
        lastUpdated: '10/5/2014'
      },
      {
        name: 'InDesign',
        description: 'Give your InDesign users the power to streamline their editorial and publishing workflows.',
        icon: ID,
        discover: 'https://www.adobe.io/apis/creativecloud/indesign.html',
        docs: '',
        lastUpdated: '10/5/2013'
      },
      {
        name: 'Illustrator',
        description: 'Give users enhanced power over their vector image projects with effects, automation, and more.',
        icon: AI,
        discover: 'https://www.adobe.io/apis/creativecloud/illustrator.html',
        docs: '',
        lastUpdated: '10/5/2012'
      },
      {
        name: 'Premier Pro',
        description:
          'Automate complex tasks, communicate with external hardware, add support for new codecs, and more.',
        icon: PR,
        discover: 'https://www.adobe.io/apis/creativecloud/premierepro.html',
        docs: '',
        lastUpdated: '10/5/2011'
      },
      {
        name: 'After Effects',
        description:
          'Create stunning visual effects, manipulate project elements, and automate complex tasks in After Effects.',
        icon: AE,
        discover: 'https://www.adobe.io/apis/creativecloud/aftereffects.html',
        docs: '',
        lastUpdated: '10/5/2010'
      },
      {
        name: 'Bridge',
        description:
          'The ExtendScript SDK, Common Extensibility Platform, for Adobe Bridge let you enhance and extend the application with ExtendScript and HTML-based panels.',
        icon: BR,
        discover: 'https://www.adobe.io/apis/creativecloud/bridge.html',
        docs: '',
        lastUpdated: '10/5/2009'
      },
      {
        name: 'Animate',
        description: 'Build Animate extensions that provide custom tools for creatives, automate workflows, and more.',
        icon: AN,
        discover: 'https://www.adobe.io/apis/creativecloud/animate.html',
        docs: '',
        lastUpdated: '10/5/2008'
      },
      {
        name: 'Audition',
        description: 'Tune Adobe Audition to your specs by automating tasks, connecting to web services, and more.',
        icon: AU,
        discover: 'https://www.adobe.io/apis/creativecloud/audition.html',
        docs: '',
        lastUpdated: '10/5/2007'
      },
      {
        name: 'Dreamweaver',
        description: 'Add powerful features for building web apps. Automate your cross-application workflows.',
        icon: DW,
        discover: 'https://www.adobe.io/apis/creativecloud/dreamweaver.html',
        docs: '',
        lastUpdated: '10/5/2006'
      },
      {
        name: 'Adobe Fonts',
        description:
          'The Typekit API gives you programmatic access to the functionality of Typekit over a RESTful HTTP based API.',
        icon: AF,
        discover: 'https://www.adobe.io/apis/creativecloud/adobe-fonts.html',
        docs: '',
        lastUpdated: '10/5/2005'
      },
      {
        name: 'Adobe Camera Raw',
        description:
          'Adobe Camera Raw SDKs allows you to create DNG images, and distribute Presets and Profiles for use inside of ACR, Lightroom Classic, and Lightroom CC.',
        icon: '',
        discover: 'https://www.adobe.io/apis/creativecloud/camera-raw.html',
        docs: '',
        lastUpdated: '10/5/2004'
      }
    ]
  },
  {
    name: 'Adobe Document Cloud',
    products: [
      {
        name: 'Adobe Document Cloud',
        description:
          'Improve the way you engage with documents. With Adobe services, you can extend applications like Adobe Acrobat Reader DC and integrate our platform into your systems and apps.',
        icon: DC,
        discover: 'https://www.adobe.io/apis/documentcloud.html',
        docs: '',
        lastUpdated: '10/5/2020'
      },
      {
        name: 'Acrobat DC',
        description: 'Create, edit, sign, and share PDFs faster and easier than ever.',
        icon: AC,
        discover: 'https://www.adobe.io/apis/documentcloud/acrobat.html',
        docs: '',
        lastUpdated: '10/5/2019'
      },
      {
        name: 'Acrobat Sign',
        description: 'Create, edit, sign, and share PDFs faster and easier than ever.',
        icon: AS,
        discover: 'https://www.adobe.io/apis/documentcloud/sign.html',
        docs: 'https://www.adobe.io/apis/documentcloud/sign/docs.html',
        lastUpdated: '10/5/2018'
      },
      {
        name: 'Acrobat Document Services API',
        description:
          'Modern cloud-based APIs to embed PDF documents in websites and manipulate PDFs in document workflows.',
        icon: '',
        discover: 'https://www.adobe.io/apis/documentcloud/dcsdk.html',
        docs: '',
        lastUpdated: '10/5/2017'
      }
    ]
  },
  {
    name: 'Adobe Experience Cloud',
    products: [
      {
        name: 'Adobe Experience Cloud',
        description:
          'The most complete set of marketing solutions available. And it gives you everything you need to get deep insight into your customers, build personalized campaigns and manage your content and assets.',
        icon: EC,
        discover: 'https://www.adobe.io/apis/experiencecloud.html',
        docs: '',
        lastUpdated: '10/5/2020'
      },
      {
        name: 'Analytics',
        description:
          'The industry-leading solution for applying real-time analytics and detailed segmentation across all of your marketing channels.',
        icon: '',
        discover: 'https://www.adobe.io/apis/experiencecloud/analytics.html',
        docs: 'https://www.adobe.io/apis/experiencecloud/analytics/docs.html',
        lastUpdated: '10/5/2019'
      },
      {
        name: 'Audience Manager',
        description:
          'Helps you build unique audience profiles so you can identify your most valuable segments and use them across any digital channel.',
        icon: '',
        discover: 'https://www.adobe.io/apis/experiencecloud/audiencemanager.html',
        docs: '',
        lastUpdated: '10/5/2018'
      },
      {
        name: 'Campaign',
        description:
          'A set of solutions that help you personalize and deliver campaigns across all of your online and offline channels.',
        icon: '',
        discover: 'https://www.adobe.io/apis/experiencecloud/campaign.html',
        docs: '',
        lastUpdated: '10/5/2017'
      },
      {
        name: 'Experience Manager',
        description: 'A comprehensive content management solution for building websites, mobile apps and forms.',
        icon: '',
        discover: 'https://www.adobe.io/apis/experiencecloud/aem.html',
        docs: '',
        lastUpdated: '10/5/2016'
      },
      {
        name: 'Primetime',
        description:
          'A multiscreen TV platform that helps broadcasters, cable networks and service providers create and monetize engaging and personalized TV and film experiences.',
        icon: '',
        discover: 'https://www.adobe.io/apis/experiencecloud/primetime.html',
        docs: '',
        lastUpdated: '10/5/2015'
      },
      {
        name: 'Adobe Mobile SDK',
        description:
          'These SDKs allow you to capture native app activity (user, usage, behavior, gestures) and forward that data to Adobe collection servers for use in Analytics reporting.',
        icon: '',
        discover: 'https://www.adobe.io/apis/cloudplatform/mobile.html',
        docs: '',
        lastUpdated: '10/5/2014'
      },
      {
        name: 'Target',
        description:
          'A personalization solution that makes it easy to identify your best content through tests that are easy to execute, enabling you to deliver the right experience to the right customer. The APIs can be integrated neatly into a range of application stacks.',
        icon: '',
        discover: 'https://www.adobe.io/apis/experiencecloud/target.html',
        docs: '',
        lastUpdated: '10/5/2013'
      },
      {
        name: 'Commerce Integration Framework',
        description:
          'Cloud-based version of the Commerce Integration Framework integrates any commerce solution with the Experience Cloud, based on standardized APIs and XDM compatible data.',
        icon: '',
        discover: 'https://www.adobe.io/apis/experiencecloud/commerce-integration-framework.html',
        docs: '',
        lastUpdated: '10/5/2012'
      },
      {
        name: 'GDPR API',
        description:
          'General Data Protection Regulation (GDPR) is the European Union’s new privacy law that harmonizes and modernizes data protection requirements.',
        icon: '',
        discover: 'https://www.adobe.io/apis/experiencecloud/gdpr.html',
        docs: '',
        lastUpdated: '10/5/2011'
      },
      {
        name: 'Cloud Manager',
        description: 'Enables organizations to self-manage Experience Manager environments in the cloud.',
        icon: '',
        discover: 'https://www.adobe.io/apis/experiencecloud/cloud-manager.html',
        docs: 'https://www.adobe.io/apis/experiencecloud/cloud-manager/docs.html',
        lastUpdated: '10/5/2010'
      }
    ]
  },
  {
    name: 'Adobe Experience Platform',
    products: [
      {
        name: 'Adobe Experience Platform',
        description:
          'Adobe Experience Platform provides a central service for Data Ingestion, Governance, Insights, and Actioning. These services are built API First.',
        icon: EP,
        discover: 'https://www.adobe.io/apis/experienceplatform.html',
        docs: '',
        lastUpdated: '10/5/2020'
      },
      {
        name: 'Adobe Developer Console',
        description: 'How to access all Adobe APIs using the Adobe I/O API Gateway.',
        icon: '',
        discover: 'https://www.adobe.io/apis/experienceplatform/console.html',
        docs: 'https://www.adobe.io/apis/experienceplatform/console/docs.html',
        lastUpdated: '10/5/2019'
      },
      {
        name: 'Project Firefly',
        description:
          'Project Firefly is a complete framework for building custom cloud native Adobe apps that extend Adobe solutions and run on our infrastructure.',
        icon: '',
        discover: 'https://www.adobe.io/apis/experienceplatform/project-firefly.html',
        docs: 'https://www.adobe.io/apis/experienceplatform/project-firefly/docs.html',
        lastUpdated: '10/5/2018'
      },
      {
        name: 'Adobe Experience Platform Launch',
        description:
          'Adobe Experience Platform Launch, by Adobe is a next-generation tag management system that unifies the client-side marketing ecosystem by empowering developers to build integrations on a robust, extensible platform that partners, clients, and the broader industry can build on and contribute to.',
        icon: '',
        discover: 'https://www.adobe.io/apis/experienceplatform/experienceplatformlaunch.html',
        docs: '',
        lastUpdated: '10/5/2017'
      },
      {
        name: 'Adobe I/O Events',
        description:
          'Lightning-fast event-based integrations using WebHooks.With Adobe I/O Events, you can code event-driven experiences, applications, and custom workflows that leverage and combine Adobe Experience Cloud, Creative Cloud, and Document Cloud.',
        icon: '',
        discover: 'https://www.adobe.io/apis/experienceplatform/events.html',
        docs: 'https://www.adobe.io/apis/experienceplatform/events/docs.html',
        lastUpdated: '10/5/2016'
      },
      {
        name: 'Adobe I/O Runtime',
        description:
          'The Adobe I/O Runtime is a serverless platform that allows you to quickly deploy custom code to respond to events and execute functions right in the cloud, all with no server set-up required.',
        icon: '',
        discover: 'https://www.adobe.io/apis/experienceplatform/runtime.html',
        docs: 'https://www.adobe.io/apis/experienceplatform/runtime/docs.html',
        lastUpdated: '10/5/2015'
      },
      {
        name: 'Adobe Mobile SDK',
        description:
          'These SDKs allow you to capture native app activity (user, usage, behavior, gestures) and forward that data to Adobe collection servers for use in Analytics reporting.',
        icon: '',
        discover: 'https://www.adobe.io/apis/experienceplatform/mobile.html',
        docs: 'https://www.adobe.io/apis/experienceplatform/mobile/docs.html',
        lastUpdated: '10/5/2014'
      },
      {
        name: 'Places API',
        description:
          'Places service consists of set of REST APIs, which allows Adobe Experience Cloud and third-party product users to integrate with geo-location functionality. The API suite also provides query APIs, which can be integrated in web and mobile applications to access information about proximity to the geo-fences. Using the Places APIs with Experience Cloud SDKs helps mobile developers enrich Adobe Experience Platform with location data.',
        icon: '',
        discover: 'https://www.adobe.io/apis/experienceplatform/placesapi.html',
        docs: '',
        lastUpdated: '10/5/2013'
      },
      {
        name: 'Privacy Service API',
        description:
          'Privacy Service provides a RESTful API and user interface to help companies manage customer data requests for Experience Cloud solutions, and was developed in response to a fundamental shift in how businesses are required to manage the personal data of their customers.',
        icon: '',
        discover: 'https://www.adobe.io/apis/experienceplatform/gdpr.html',
        docs: 'https://www.adobe.io/apis/experienceplatform/gdpr/docs.html',
        lastUpdated: '10/5/2012'
      },
      {
        name: 'Project Griffon',
        description:
          'We’ve created Project Griffon for you. Your input is vital to our design and development process. Let us know how we can make this product more intuitive to fit, naturally, with your existing workflows.',
        icon: '',
        discover: 'https://www.adobe.io/apis/experienceplatform/griffon.html',
        docs: '',
        lastUpdated: '10/5/2011'
      },
      {
        name: 'User Management API',
        description:
          "Adobe's User Management API allows the programmatic management of users, groups, and entitlements in Adobe Creative Cloud. Manage Creative Cloud Enterprise users with an API.",
        icon: '',
        discover: 'https://www.adobe.io/apis/experienceplatform/umapi-new.html',
        docs: '',
        lastUpdated: '10/5/2010'
      }
    ]
  }
];
