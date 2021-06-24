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

const request = require('request');

/**
 * Load content by url
 */
class LoadContentByUrl {
  /**
   * Load cotent by url
   *
   * @param url
   * @returns {Promise}
   */
  execute(url) {
    return new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
        if (error) {
          reject(error);
        }
        if (response.statusCode != 200) {
          reject('Invalid status code <' + response.statusCode + '> for URL:' + url);
        }
        resolve(body);
      });
    });
  }
}
module.exports = LoadContentByUrl;
