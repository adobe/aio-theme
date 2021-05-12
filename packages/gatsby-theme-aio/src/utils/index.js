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

import React, { Children, cloneElement } from 'react';
import { withPrefix } from 'gatsby';
import globals from '../../conf/globals';

const cleanMarkdownExtension = (pathname) => {
  return pathname.replace('/src/pages/', '/').replace('/index.md', '').replace('index.md', '').replace('.md', '');
};

export const gdocsRelativeLinkFix = (href) => {
  // Support gdoc relative links
  if (href && href.startsWith('#!')) {
    href = href.substr(2);
  }

  return href;
};

export const trailingSlashFix = (pathname) => {
  if (!pathname.endsWith('/')) {
    return `${pathname}/`;
  }

  return pathname;
};

export const rootFix = (pathname) => {
  if (pathname === withPrefix('/')) {
    return withPrefix('/_ROOT_/');
  }

  return trailingSlashFix(pathname);
};

export const rootFixPages = (pages) => {
  return pages.map((page) => {
    if (page.path === '/') {
      return {
        title: page.title,
        path: '/_ROOT_/'
      };
    } else if (page.path) {
      page.path = trailingSlashFix(page.path);
    }

    return page;
  });
};

export const layoutColumns = (columns, gutters = []) =>
  `calc(${columns} * var(--spectrum-global-dimension-static-grid-fixed-max-width) / var(--spectrum-global-dimension-static-grid-columns)${
    gutters.length > 0 ? ` - ${gutters.join(' - ')}` : ''
  })`;

export const findSelectedTopPage = (pathname, pages) => {
  pathname = trailingSlashFix(pathname);
  return pages.find((page) => pathname.startsWith(withPrefix(page.path)));
};

export const findSubPages = (pathname, pages, subPages) => {
  pathname = trailingSlashFix(pathname);

  if (subPages === null) {
    return [];
  }

  const selectedTopPage = findSelectedTopPage(pathname, pages);
  return subPages.filter((page) => withPrefix(page.path).startsWith(withPrefix(selectedTopPage?.path)));
};

export const findSelectedPage = (pathname, pages) => {
  pathname = trailingSlashFix(pathname);

  if (pages === null) {
    return [];
  }

  return pages.find((page) => pathname === withPrefix(page.path));
};

export const findSelectedPages = (pathname, pages) => {
  pathname = trailingSlashFix(pathname);

  if (pages === null) {
    return [];
  }

  let selectedPages = [];
  let level = 1;

  const find = (page) => {
    let subPages = [];
    if (page.path && pathname.startsWith(withPrefix(page.path))) {
      page.level = level;
      subPages.push(page);
    }

    if (page.pages) {
      level++;
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
  if (pages === null) {
    return [];
  }

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
  pathname = trailingSlashFix(pathname);

  const flat = flattenPages(pages);
  const selectedPage = flat.find((page) => withPrefix(page.path) === pathname);

  return {
    nextPage: flat[flat.indexOf(selectedPage) + 1],
    previousPage: flat[flat.indexOf(selectedPage) - 1]
  };
};

export const findSelectedPageSiblings = (pathname, pages) => {
  pathname = trailingSlashFix(pathname);

  let siblings = [];

  if (pages === null) {
    return siblings;
  }

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

export const isInternalLink = (pathname, location, pages) => {
  if (!pathname) {
    return false;
  }

  const base = 'https://example.com';
  const href = new URL(encodeURI(location.pathname), base);

  pathname = decodeURI(trailingSlashFix(cleanMarkdownExtension(new URL(pathname, href).pathname)));

  return pages.some((path) => path === pathname);
};

export const fixInternalLink = (pathname, pathPrefix) => {
  return cleanMarkdownExtension(pathname.replace(pathPrefix, ''));
};

export const isExternalLink = (url) => {
  url = String(url).replace('#', '');

  let isExternal = true;
  try {
    new URL(url);
  } catch (e) {
    isExternal = false;
  }

  return isExternal;
};

export const getExternalLinkProps = (url = null) =>
  url === null || isExternalLink(url)
    ? {
        target: '_blank',
        rel: 'noopener noreferrer nofollow'
      }
    : {};

export const getElementChild = (element) => React.Children.toArray(element.props.children)[0];

export const cloneChildren = (children, changeProps) => {
  return Children.map(children, (child) => {
    if (child?.props?.children) {
      child = cloneElement(child, {
        children: cloneChildren(child.props.children, changeProps)
      });
    }

    return changeProps(child);
  });
};

export const SIDENAV_WIDTH = globals.SIDENAV_WIDTH;
export const MOBILE_SCREEN_WIDTH = globals.MOBILE_SCREEN_WIDTH;
export const TABLET_SCREEN_WIDTH = globals.TABLET_SCREEN_WIDTH;
export const DESKTOP_SCREEN_WIDTH = globals.DESKTOP_SCREEN_WIDTH;
