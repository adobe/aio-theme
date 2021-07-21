import { useContext } from 'react';
import { withPrefix } from 'gatsby';
import { Tabs, Item as TabsItem, Label as TabsItemLabel } from '../Tabs';
import Context from '../Context';

import {
  InstantSearch,
  Index,
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

import 'instantsearch.css/themes/satellite.css';
import './index.css';

const searchClient = algoliasearch('E642SEDTHL', '36561fc0f6d8f1ecf996bc7bf41af00f');

const Hit = ({ hit }) => {
  return (
    <div>
      <a className="hit-title" href={withPrefix(hit.slug + hit.anchor)}>
        <Highlight attribute="title" hit={hit} />
      </a>
      <p className="hit-full-path">{hit.url}</p>
      <p className="hit-description">
        <Highlight attribute="content" hit={hit} />
      </p>
    </div>
  );
};

const SearchState = {
  refinementList: {
    keywords: [
      'Creative Cloud',
      'API Documentation',
      'UXP',
      'Plugins',
      'JavaScript',
      'ExtendScript',
      'SDK',
      'C++',
      'Scripting'
    ]
  }
};

export const SearchPage = (props) => {
  const { siteMetadata } = useContext(Context);

  return (
    <InstantSearch
      indexName="uxp-photoshop"
      searchClient={searchClient}
      searchState={SearchState}
      createURL={props.createURL}
      onSearchStateChange={props.onSearchStateChange}>
      <Configure
        attributesToSnippet={['description:10']}
        snippetEllipsisText="…"
        removeWordsIfNoResults="allOptional"
      />
      <Index indexName="uxp-photoshop" />
      <SearchHeader />
      <div className="search-results-main">
        <SearchIndexes />
        <hr className="horizontal-line" />
        <SearchStats />
        <div className="search-results">
          <SearchResults />
          <hr className="vertical-line" />
          <SearchFilters />
        </div>
        <SearchFooter />
      </div>
    </InstantSearch>
  );
};

const SearchHeader = () => (
  <header className="search-header ">
    <div className="search-header-inner">
      <SearchBox
        searchAsYouType
        onClick={(event) => {
          console.log(event.currentTarget);
        }}
      />
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

const SearchIndexes = () => (
  <section className="search-main-indexes">
    <Tabs
      css={css`
        padding-bottom: 0;
        margin-top: 0;
      `}>
      <TabsItem>
        <TabsItemLabel>
          <strong>Photoshop</strong>
        </TabsItemLabel>
      </TabsItem>
      <TabsItem>
        <TabsItemLabel>Area for index tabs</TabsItemLabel>
      </TabsItem>
    </Tabs>
  </section>
);

const SearchStats = () => (
  <section className="search-stats">
    <Stats />
  </section>
);

const SearchResults = () => (
  <section className="search-results">
    <Hits hitComponent={Hit} />
    <NoResults />
  </section>
);

const SearchFilters = () => (
  <aside className="search-filters">
    <Panel header="Filters">
      <ClearRefinements translations={{ reset: 'Clear all filters' }} />
      <RefinementList attribute="keywords" operator="and" limit={20} showMore />
    </Panel>
  </aside>
);

const SearchFooter = () => (
  <footer className="search-footer">
    <Pagination showLast={true} />
  </footer>
);

export default withURLSync(SearchPage);
