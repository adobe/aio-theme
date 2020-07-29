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

import React, { useContext, useEffect, useState, useRef } from 'react';
import { withPrefix } from 'gatsby';
import { css } from '@emotion/core';
import classNames from 'classnames';
import { Link } from './Link';
import '@spectrum-css/typography';
import Context from './Context';
import { layoutColumns } from './utils';

const OnThisPage = () => {
  const [activeHeadingLink, setActiveHeadingLink] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const outlineRef = useRef(null);
  const { location, allMdx, allSitePage } = useContext(Context);

  const { componentPath } = allSitePage.nodes.find(({ path }) => withPrefix(path) === location.pathname);
  const { tableOfContents } = allMdx.nodes.find(({ fileAbsolutePath }) => fileAbsolutePath === componentPath);
  const tableOfContentsItems = tableOfContents?.items?.[0]?.items;

  let activeHeadingLinks = [];

  useEffect(() => {
    const observer = new window.IntersectionObserver((entries) => {
      for (const entry of entries) {
        setIsPinned(!entry.isIntersecting);
      }
    });

    if (outlineRef?.current) {
      observer.observe(outlineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observers = [];
    const headingLinks = Array.from(document.querySelectorAll('h2 a, h3 a'));
    const findActiveHeadingLink = () => {
      let activeHref = null;

      headingLinks.some((headingLink) => {
        const href = headingLink.getAttribute('href');
        return activeHeadingLinks.some((activeSection) => {
          if (activeSection === href) {
            activeHref = href;
            return true;
          }
        });
      });

      return activeHref;
    };

    headingLinks.forEach((headingLink) => {
      const observer = new window.IntersectionObserver((entries) => {
        for (const entry of entries) {
          const href = headingLink.getAttribute('href');
          activeHeadingLinks = activeHeadingLinks.filter((activeHref) => activeHref !== href);

          if (entry.isIntersecting) {
            activeHeadingLinks.push(href);
          }
        }

        setActiveHeadingLink(findActiveHeadingLink());
      });

      observer.observe(headingLink);
      observers.push(observer);
    });

    return () => {
      headingLinks.forEach((i) => observers?.[i]?.disconnect());
    };
  }, []);

  const Outline = ({ withSubHeading }) => (
    <nav
      role="navigation"
      aria-label="Article Outline"
      css={css`
        margin: var(--spectrum-global-dimension-static-size-400) 0;
      `}>
      <h4
        className="spectrum-Detail--L"
        css={css`
          color: var(--spectrum-global-color-gray-600);
        `}>
        On this page
      </h4>
      <ol
        className="spectrum-Body--M"
        css={css`
          list-style: none;
          padding: 0;

          & a.is-active {
            font-weight: bold;
            color: var(--spectrum-global-color-gray-900);
          }
        `}>
        {tableOfContentsItems.map((section, index) => (
          <li
            key={index}
            css={css`
              margin-top: var(--spectrum-global-dimension-static-size-150);
            `}>
            <Link
              className={classNames({ 'is-active': withSubHeading && activeHeadingLink === section.url })}
              href={section.url}>
              {section.title}
            </Link>
            {withSubHeading && section?.items?.length && (
              <ul
                css={css`
                  list-style: none;
                  padding-left: var(--spectrum-global-dimension-static-size-200);
                `}>
                {section.items.map((subSection, subIndex) => (
                  <li key={subIndex} css={css``}>
                    <Link
                      className={classNames({ 'is-active': withSubHeading && activeHeadingLink === subSection.url })}
                      href={subSection.url}>
                      {subSection.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );

  return tableOfContentsItems ? (
    <React.Fragment>
      <div ref={outlineRef}>
        <Outline />
      </div>
      <aside
        className={isPinned ? 'is-pinned' : ''}
        aria-hidden={!isPinned}
        css={css`
          position: fixed;
          top: var(--spectrum-global-dimension-static-size-800);
          padding-left: var(--spectrum-global-dimension-static-size-900);
          left: ${layoutColumns(9)};
          min-width: ${layoutColumns(3, [
            'var(--spectrum-global-dimension-static-size-400)',
            'var(--spectrum-global-dimension-static-size-100)'
          ])};
          margin-left: var(--spectrum-global-dimension-static-size-400);
          transition: opacity var(--spectrum-global-animation-duration-100) ease-in-out;
          opacity: 0;

          &.is-pinned {
            opacity: 1;
          }
        `}>
        <Outline withSubHeading={true} />
      </aside>
    </React.Fragment>
  ) : null;
};

export { OnThisPage };
