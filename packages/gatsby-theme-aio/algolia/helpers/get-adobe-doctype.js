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

/*
 * The standard documentation types (content types) from Experience League:
 * https://experienceleague.adobe.com/docs/authoring-guide-exl/using/authoring/style-guide/content-types.html#product-documentation
*/
const adobeDocTypes = {
  api_guide: 'API guide',
  api_reference: 'API reference',
  conceptual_overviews: 'Conceptual overviews',
  how_to: 'How-to',
  integration_guide: 'Integration guide',
  release_notes: 'Release notes',
  troubleshooting_guide: 'Troubleshooting guide',
  tutorial: 'Tutorial',
  use_cases: 'Use cases',
};

/*
 * Attempts to cover variable values entered into the category key in the frontmatter.
*/
const getAdobeDocType = value => {
  if (value == null) return;
  value = (value?.toLowerCase()).replace(/ /g,"_").replace(/s$/g, "");
  return {
    'api_guide': adobeDocTypes.api_guide,
    'api': adobeDocTypes.api_guide,
    'setup': adobeDocTypes.api_guide,
    'set_up': adobeDocTypes.api_guide,
    'config': adobeDocTypes.api_guide,
    'configuration': adobeDocTypes.api_guide,
    'setting': adobeDocTypes.api_guide,
    'getting_started': adobeDocTypes.api_guide,
    'get_started': adobeDocTypes.api_guide,
    'api_reference': adobeDocTypes.api_reference,
    'component': adobeDocTypes.api_reference,
    'parameter': adobeDocTypes.api_reference,
    'conceptual_overview': adobeDocTypes.conceptual_overviews,
    'concept': adobeDocTypes.conceptual_overviews,
    'conceptual': adobeDocTypes.conceptual_overviews,
    'overview': adobeDocTypes.conceptual_overviews,
    'introduction': adobeDocTypes.conceptual_overviews,
    'intro': adobeDocTypes.conceptual_overviews,
    'outline': adobeDocTypes.conceptual_overviews,
    'how_to': adobeDocTypes.how_to,
    'howto': adobeDocTypes.how_to,
    'instruction': adobeDocTypes.how_to,
    'step': adobeDocTypes.how_to,
    'integration_guide': adobeDocTypes.integration_guide,
    'integration': adobeDocTypes.integration_guide,
    'release_note': adobeDocTypes.release_notes,
    'changelog': adobeDocTypes.release_notes,
    'change_log': adobeDocTypes.release_notes,
    'troubleshooting_guide': adobeDocTypes.troubleshooting_guide,
    'troubleshooting': adobeDocTypes.troubleshooting_guide,
    'issue': adobeDocTypes.troubleshooting_guide,
    'problem': adobeDocTypes.troubleshooting_guide,
    'faq': adobeDocTypes.troubleshooting_guide,
    'tutorial': adobeDocTypes.tutorial,
    'use_case': adobeDocTypes.use_cases,
    'usecase': adobeDocTypes.use_cases,
    'example': adobeDocTypes.use_cases,
    'usage': adobeDocTypes.use_cases,
  }[value];
};

module.exports = {
  adobeDocTypes,
  getAdobeDocType
};
