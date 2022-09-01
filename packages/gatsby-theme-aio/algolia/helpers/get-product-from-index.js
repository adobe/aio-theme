/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const products = require('./adobe-products');
const indexes = require('./adobe-indexes');

function getProductFromIndex(indexName) {
  const adobeProducts = {
    // Adobe After Effects
    'adobe-after-effects': () => products.adobe_after_effects,

    // Adobe Analytics
    'analytics-2.0-apis': () => products.adobe_analytics,

    // Adobe Animate
    animate: () => products.adobe_animate,

    // Adobe Audition
    audition: () => products.adobe_audition,

    // Adobe Bridge
    bridge: () => products.adobe_bridge,

    // Adobe Cloud Manager
    'cloudmanager-api-docs': () => products.adobe_cloud_manager,

    // Adobe Camera Raw
    'camera-raw': () => products.adobe_camera_raw,

    // Adobe Commerce
    'commerce-extensibility': () => products.adobe_commerce,
    'commerce-marketplace': () => products.adobe_commerce,
    'commerce-contributor': () => products.adobe_commerce,
    'commerce-cloud-tools': () => products.adobe_commerce,
    'commerce-webapi': () => products.adobe_commerce,
    'commerce-php': () => products.adobe_commerce,
    'commerce-frontend-core': () => products.adobe_commerce,
    'commerce-admin-developer': () => products.adobe_commerce,
    'commerce-xd-kits': () => products.adobe_commerce,
    'commerce-pwa-studio': () => products.adobe_commerce,

    //Adobe Creative Cloud
    'cc-developer-platform-pages': () => products.adobe_creative_cloud,
    'creative-cloud-libraries': () => products.adobe_creative_cloud,
    'cc-libraries-api': () => products.adobe_creative_cloud,

    // Adobe Customer Journey Analytics
    'cja-apis': () => products.adobe_customer_journey_analytics,

    // Adobe Developer App Builder
    'app-builder': () => products.adobe_developer_app_builder,
    'graphql-mesh-gateway': () => products.adobe_developer_app_builder,
    'app-builder-template-registry': () => products.adobe_developer_app_builder,

    // Adobe Developer Console
    'adobe-dev-console': () => products.adobe_developer_console,

    // Adobe Developer Enablement
    dep: () => products.adobe_developer_enablement,

    // Adobe Dreamweaver
    dreamweaver: () => products.adobe_dreamweaver,

    //Adobe Document Services
    'document-services': () => products.adobe_document_services,
    'pdfservices-api-documentation': () => products.adobe_document_services,

    // Adobe Experience Manager
    'aem-developer-materials': () => products.adobe_experience_manager,
    'experience-manager-forms-cloud-service-developer-reference': () =>
      products.adobe_experience_manager,

    // Adobe Experience Platform
    'experience-platform-apis': () => products.adobe_experience_platform,

    // Adobe Express
    'cc-everywhere': () => products.adobe_express,

    // Adobe Fonts
    fonts: () => products.adobe_fonts,

    // Adobe Illustrator
    illustrator: () => products.adobe_illustrator,

    // Adobe InDesign
    indesign: () => products.adobe_indesign,
    'indesign-api-docs': () => products.adobe_indesign,

    // Adobe I/O
    'adobe-io-events': () => products.adobe_io,
    'adobe-io-runtime': () => products.adobe_io,

    // Adobe Journey Optimizer
    'journey-optimizer-apis': () => products.adobe_journey_optimizer,

    // Adobe Lightroom
    lightroom: () => products.adobe_lightroom,
    'lightroom-public-apis': () => products.adobe_lightroom,
    'lightroom-classic': () => products.adobe_lightroom_classic,

    // Adobe Photoshop
    photoshop: () => products.adobe_photoshop,
    'uxp-photoshop': () => products.adobe_photoshop,
    'uxp-photoshop-2021': () => products.adobe_photoshop,
    'cis-photoshop-api-docs': () => products.adobe_photoshop,
    'photoshop-api': () => products.adobe_photoshop,

    // Adobe Premiere Pro
    'premiere-pro': () => products.adobe_premiere_pro,

    // Adobe Stock
    stock: () => products.adobe_stock,
    'stock-api-docs': () => products.adobe_stock,
    'stock-api-specs': () => products.adobe_stock,

    // Adobe Substance 3D
    'substance-3d-automation': () => products.adobe_substance_3D,

    // Adobe Target
    'target-developers': () => products.adobe_target,

    // Adobe Workfront
    'wf-apis': () => products.adobe_workfront,
    'workfront-api-explorer': () => products.adobe_workfront, // frameSrc: Use to test frameSrc searching

    // Adobe XD
    xd: () => products.adobe_xd,
    'uxp-xd': () => products.adobe_xd,

    // Adobe XMP
    'xmp-docs': () => products.adobe_xmp,

    // Testing Only
    'aio-theme': () => products.aio_theme,
  };

  const product = adobeProducts[indexName]();
  return product;
}

module.exports = getProductFromIndex;
