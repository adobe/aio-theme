import React from 'react';
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
  connectStateResults
} from 'react-instantsearch-dom';
import withURLSync from './URLSync';
import algoliasearch from 'algoliasearch/lite';
import { NoResults } from '../SearchWidgets';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

import './test.css';
import './index.css';

const searchClient = algoliasearch('E642SEDTHL', '36561fc0f6d8f1ecf996bc7bf41af00f');

const Hit = ({ hit }) => {
  return (
    <article className="hit">
      <h1 className="hit-title">
        <Highlight attribute="contentHeading" hit={hit} />
      </h1>
      <p className="hit-description">
        <Highlight attribute="content" hit={hit} />
      </p>
    </article>
  );
};

export const SearchPage = (props) => (
  <InstantSearch
    searchClient={searchClient}
    indexName="uxp-photoshop"
    searchState={props.searchState}
    createURL={props.createURL}
    onSearchStateChange={props.onSearchStateChange}>
    <Configure attributesToSnippet={['description:10']} snippetEllipsisText="…" removeWordsIfNoResults="allOptional" />
    <SearchHeader />
    <SearchStats />
    <SearchResults />
    <SearchFilters />
    <SearchFooter />
  </InstantSearch>
);

const SearchHeader = () => (
  <header className="search-header ">
    <div className="search-header-inner">
      <SearchBox className="search-header-searchBox" />
    </div>
  </header>
);

const SearchStats = () => (
  <section className="search-stats">
    <Stats />
  </section>
);

const SearchResults = () => (
  <section className="search-results">
    <HitsPerPage
      className="container-option"
      items={[
        {
          label: '16 hits per page',
          value: 16
        },
        {
          label: '32 hits per page',
          value: 32
        },
        {
          label: '64 hits per page',
          value: 64
        }
      ]}
      defaultRefinement={16}
    />
    <Hits hitComponent={Hit} />
    <NoResults />
  </section>
);

const SearchFilters = () => (
  <aside className="search-filters">
    <ClearRefinements translations={{ reset: 'Clear all filters' }} />
    <Panel header="Filters">
      <RefinementList attribute="keywords" />
    </Panel>
  </aside>
);

const SearchFooter = () => (
  <footer className="search-footer">
    <Pagination showLast={true} />
  </footer>
);

export default withURLSync(SearchPage);
