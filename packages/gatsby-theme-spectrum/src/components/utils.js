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

import { withPrefix } from 'gatsby';

export const layoutColumns = (columns, gutters = []) =>
  `calc(${columns} * var(--spectrum-global-dimension-static-grid-fixed-max-width) / var(--spectrum-global-dimension-static-grid-columns)${
    gutters.length > 0 ? ` - ${gutters.join(' - ')}` : ''
  })`;

export const findSelectedTopPage = (pathname, pages) => {
  return pages.find((page) => pathname.startsWith(withPrefix(page.path)));
};

export const findSubPages = (pathname, pages, subPages) => {
  const selectedTopPage = findSelectedTopPage(pathname, pages);
  return subPages.filter((page) => withPrefix(page.path).startsWith(withPrefix(selectedTopPage.path)));
};

export const findSelectedPage = (pathname, pages) => {
  return pages.find((page) => pathname === withPrefix(page.path));
};

export const findSelectedPages = (pathname, pages) => {
  let selectedPages = [];

  const find = (page) => {
    let subPages = [];
    if (page.path && pathname.startsWith(withPrefix(page.path))) {
      subPages.push(page);
    }

    if (page.pages) {
      page.pages.forEach((subPage) => {
        subPages = [...subPages, ...find(subPage)];
      });
    }

    return subPages;
  };

  pages.forEach((page) => {
    const subPages = find(page);
    if (subPages.length) {
      selectedPages.push(subPages);
    }
  });

  return selectedPages.length ? selectedPages.pop() : [];
};

export const flattenPages = (pages) => {
  let flat = [];
  const find = (page) => {
    flat.push(page);

    if (page.pages) {
      page.pages.forEach(find);
    }
  };

  pages.forEach(find);

  flat = flat.flat();
  return flat.filter((page, index) => page.path && page.path !== flat[index + 1]?.path);
};

export const findSelectedPageNextPrev = (pathname, pages) => {
  const flat = flattenPages(pages);
  const selectedPage = flat.find((page) => withPrefix(page.path) === pathname);

  return {
    nextPage: flat[flat.indexOf(selectedPage) + 1],
    previousPage: flat[flat.indexOf(selectedPage) - 1]
  };
};

export const findSelectedPageSiblings = (pathname, pages) => {
  let siblings = [];

  const find = (page) => {
    if (page.pages) {
      const selectedPage = page.pages.find((subPage) => withPrefix(subPage.path) === pathname);
      if (selectedPage) {
        siblings = [...page.pages];
      } else {
        page.pages.forEach(find);
      }
    }
  };

  pages.forEach((page) => {
    find(page);
  });

  return siblings;
};
