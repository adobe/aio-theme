import React from 'react';
import { Heading1 } from '../Heading';
import { css } from '@emotion/react';

import algoliasearch from 'algoliasearch/lite';
import PropTypes from 'prop-types';
import {
  InstantSearch,
  Hits,
  HitsPerPage,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Stats
} from 'react-instantsearch-dom';

export const SearchPage = () => {
  return (
    <div
      css={css`
        display: flex; align-items: center; justify-content: center; flex-direction: column; min-height: 200px; }
      `}>
      <Heading1>Hello, Search Page</Heading1>
    </div>
  );
};
