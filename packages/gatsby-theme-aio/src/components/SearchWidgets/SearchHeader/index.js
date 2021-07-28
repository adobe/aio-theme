import React from 'react';
import { connectHitsPerPage, SearchBox } from 'react-instantsearch-dom';
import { Picker } from '../../Picker';
import 'instantsearch.css/themes/satellite.css';
import '../index.css';

const HitsPerPageSpectrum = ({ items, refine }) => (
  <Picker
    isQuiet
    items={items.map((item, i) => ({
      title: item.label,
      selected: i === 0
    }))}
    onChange={(index) => {
      refine(items[index].value);
    }}
  />
);

const CustomHitsPerPage = connectHitsPerPage(HitsPerPageSpectrum);

const SearchHeader = () => {
  return (
    <header className="search-header ">
      <div className="search-header-inner">
        <SearchBox />
        <CustomHitsPerPage
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
};

export default SearchHeader;
