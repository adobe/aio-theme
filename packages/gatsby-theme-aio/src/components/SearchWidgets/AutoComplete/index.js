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

import {autocomplete, getAlgoliaResults} from '@algolia/autocomplete-js';
import React, {createElement, Fragment, useEffect, useRef} from 'react';
import {render} from 'react-dom';
import {connectAutoComplete} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import {createLocalStorageRecentSearchesPlugin} from '@algolia/autocomplete-plugin-recent-searches';
import {withPrefix} from 'gatsby';
import '@algolia/autocomplete-theme-classic';
import './index.css';

const searchClient = algoliasearch('E642SEDTHL', '36561fc0f6d8f1ecf996bc7bf41af00f');

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: 'adobeio-developer-docs-search'
});

const AutoComplete = (props) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment },
      render({ children }, root) {
        render(children, root);
      },
      placeholder: 'Search...',
      plugins: [recentSearchesPlugin],
      openOnFocus: true,
      debug: true,
      getSources({ query }) {
        return [
          {
            sourceId: 'adobeio',
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: 'photoshop',
                    query,
                    params: {
                      hitsPerPage: 5,
                      attributesToHighlight: ['title:10', 'content:20'],
                      snippetEllipsisText: '…'
                    }
                  },
                  {
                    indexName: 'creative-cloud',
                    query,
                    params: {
                      hitsPerPage: 5,
                      attributesToHighlight: ['title:10', 'content:20'],
                      snippetEllipsisText: '…'
                    }
                  }
                ]
              });
            },
            templates: {
              item({ item, components }) {
                return <ContentItem hit={item} components={components} />;
              }
            }
          }
        ];
      },
      ...props
    });
    return () => {
      search.destroy();
    };
  }, [props]);

  return <div ref={containerRef} />;
};

function ContentItem({ hit, components }) {
  return (
    <a className="aa-ItemLink" href={withPrefix(hit.url)}>
      <div className="aa-ItemContent">
        <div className="aa-ItemContentBody">
          <div className="aa-ItemContentTitle">
            <components.Highlight hit={hit} attribute="title" />
          </div>
          <div className="aa-ItemContentDescription">
            <components.Snippet hit={hit} attribute="content" />
          </div>
        </div>
      </div>
      <div className="aa-ItemActions">
        <button className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly" type="button" title="Select">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
          </svg>
        </button>
      </div>
    </a>
  );
}

export const AdobeAutoComplete = connectAutoComplete(AutoComplete);
