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

import React, { useContext, useEffect, useRef, useState } from 'react';
import Context from '../Context';

import {
  InstantSearch,
  Panel,
  Hits,
  HitsPerPage,
  RefinementList,
  SearchBox,
  Stats,
  Pagination,
  ClearRefinements,
  Highlight,
  Configure,
  connectStateResults,
  Index
} from 'react-instantsearch-dom';

import algoliasearch from 'algoliasearch/lite';

import { css } from '@emotion/react';

import 'instantsearch.css/themes/satellite.css';
import './index.css';
import SearchIndexes from '../SearchWidgets/SearchIndexes';

const searchClient = algoliasearch('E642SEDTHL', '36561fc0f6d8f1ecf996bc7bf41af00f');

const SearchPage = (props) => {
  const { siteMetadata } = useContext(Context);

  return (
    <InstantSearch
      css={css`
        min-height: 100%;
      `}
      searchClient={searchClient}
      indexName={siteMetadata.searchIndex}
      searchState={props.searchState}
      createURL={props.createURL}
      onSearchStateChange={props.onSearchStateChange}>
      <Configure
        attributesToSnippet={['description:10']}
        snippetEllipsisText="…"
        removeWordsIfNoResults="allOptional"
      />
      <SearchHeader />
      <div className="search-results-main">
        <SearchIndexes indexName={siteMetadata.searchIndex} />
      </div>
    </InstantSearch>
  );
};

const SearchHeader = () => (
  <header className="search-header ">
    <div className="search-header-inner">
      <SearchBox />
      <HitsPerPage
        items={[
          {
            label: '20 hits per page',
            value: 20
          },
          {
            label: '32 hits per page',
            value: 40
          },
          {
            label: '64 hits per page',
            value: 60
          }
        ]}
        defaultRefinement={20}
      />
    </div>
  </header>
);

export default SearchPage;
