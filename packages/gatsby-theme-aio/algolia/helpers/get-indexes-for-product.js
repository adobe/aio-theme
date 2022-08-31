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

const indexes = require('./adobe-indexes');
const products = require('./adobe-products');

function getIndexesForProduct(productName) {
  const adobeIndexes = {
    'Adobe After Effects': () => [indexes.after_effects],
    'Adobe Analytics': () => [indexes.analytics_2_0_apis],
    'Adobe Animate': () => [indexes.animate],
    'Adobe Audition': () => [indexes.audition],
    'Adobe Bridge': () => [indexes.bridge],
    'Adobe Cloud Manager': () => [indexes.cloudmanager_api_docs],
    'Adobe Camera Raw': () => [indexes.camera_raw],
    'Adobe Commerce': () => [
      indexes.commerce_extensibility,
      indexes.commerce_marketplace,
      indexes.commerce_contributor,
      indexes.commerce_cloud_tools,
      indexes.commerce_webapi,
      indexes.commerce_php,
      indexes.commerce_frontend_core,
      indexes.commerce_admin_developer,
      indexes.commerce_xd_kits,
      indexes.commerce_pwa_studio,
    ],
    'Adobe Creative Cloud': () => [
      indexes.cc_developer_platform_pages,
      indexes.creative_cloud_libraries,
      indexes.cc_libraries_api,
    ],
    'Adobe Customer Journey Analytics': () => [indexes.cja_apis],
    'App Builder': () => [
      indexes.app_builder,
      indexes.app_builder_template_registry,
      indexes.graphql_mesh_gateway,
    ],
    'Adobe Developer Console': () => [indexes.adobe_dev_console],
    'Adobe Developer Enablement': () => [indexes.dep],
    'Adobe Dreamweaver': () => [indexes.dreamweaver],
    'Adobe Document Services': () => [
      indexes.document_services,
      indexes.pdfservices_api_documentation,
    ],
    'Adobe Experience Manager': () => [
      indexes.aem_developer_materials,
      indexes.experience_manager_forms_cloud_service_developer_reference,
    ],
    'Adobe Experience Platform': () => [indexes.experience_platform_apis],
    'Adobe Express': () => [indexes.cc_everywhere],
    'Adobe Fonts': () => [indexes.fonts],
    'Adobe Illustrator': () => [indexes.illustrator],
    'Adobe InDesign': () => [indexes.indesign, indexes.indesign_api_docs],
    'Adobe I/O': () => [indexes.adobe_io_events, indexes.adobe_io_runtime],
    'Adobe Journey Optimizer': () => [indexes.journey_optimizer_apis],
    'Adobe Lightroom': () => [
      indexes.lightroom,
      indexes.lightroom_public_apis,
      indexes.lightroom_classic,
    ],
    'Adobe Photoshop': () => [
      indexes.photoshop,
      indexes.uxp_photoshop,
      indexes.uxp_photoshop_2021,
      indexes.cis_photoshop_api_docs,
      indexes.photoshop_api,
    ],
    'Adobe Premiere Pro': () => [indexes.premiere_pro],
    'Adobe Stock': () => [indexes.stock, indexes.stock_api_docs, indexes.stock_api_specs],
    'Adobe Substance 3D': () => [indexes.substance_3d_automation],
    'Adobe Target': () => [indexes.target_developers],
    'Adobe Workfront': () => [indexes.wf_apis, indexes.workfront_api_explorer],
    'Adobe XD': () => [indexes.xd, indexes.uxp_xd],
    'Adobe XMP': () => [indexes.xmp_docs],
  };

  const indexes = adobeIndexes[productName]();
  return indexes;
}

module.exports = getIndexesForProduct;
