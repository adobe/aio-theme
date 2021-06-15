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

require('dotenv').config();

class AlgoliaConfig {
  constructor() {
    try {
      this.config = require('../algolia-config');
    } catch (ex) {
      this.config = require('../algolia-config.sample');
    }

    // indexation mode and index name suffix can be override by site .env variables
    if (process.env.ALGOLIA_INDEXATION_MODE) {
      this.config.ALGOLIA_INDEXATION_MODE = process.env.ALGOLIA_INDEXATION_MODE;
    }
    if (process.env.ALGOLIA_INDEX_NAME_SUFFIX) {
      this.config.ALGOLIA_INDEX_NAME_SUFFIX = process.env.ALGOLIA_INDEX_NAME_SUFFIX;
    }

    // by default: skip indexation (no run indexation, no push data to real index)
    this.config.ALGOLIA_SKIP_INDEXING = true;
    this.config.ALGOLIA_DRY_RUN = false;
    if (this.config.ALGOLIA_INDEXATION_MODE) {
      switch (this.config.ALGOLIA_INDEXATION_MODE) {
        case 'skip':
          this.config.ALGOLIA_SKIP_INDEXING = true;
          this.config.ALGOLIA_DRY_RUN = false;
          break;
        case 'console':
          this.config.ALGOLIA_SKIP_INDEXING = false;
          this.config.ALGOLIA_DRY_RUN = true;
          break;
        case 'index':
          this.config.ALGOLIA_SKIP_INDEXING = false;
          this.config.ALGOLIA_DRY_RUN = false;
          break;
        default:
          throw new Error('Wrong value for ALGOLIA_INDEXATION_MODE. Should be [skip | console | index]');
      }
    }
  }

  /**
   * @return {String}
   */
  getAppId() {
    return this.config.ALGOLIA_APP_ID;
  }

  /**
   * @return {String}
   */
  getWriteApiKey() {
    return this.config.ALGOLIA_WRITE_API_KEY;
  }

  /**
   * @return {String}
   */
  getSearchApiKey() {
    return this.config.ALGOLIA_SEARCH_API_KEY;
  }

  /**
   * @return {String}
   */
  getIndexName() {
    return this.config.ALGOLIA_INDEX_NAME_SUFFIX
      ? process.env.REPO_NAME + this.config.ALGOLIA_INDEX_NAME_SUFFIX
      : process.env.REPO_NAME;
  }

  /**
   * @return {String}
   */
  getSkipIndexing() {
    return this.config.ALGOLIA_SKIP_INDEXING;
  }

  /**
   * @return {String}
   */
  getDryRun() {
    return this.config.ALGOLIA_DRY_RUN;
  }
}
module.exports = AlgoliaConfig;
