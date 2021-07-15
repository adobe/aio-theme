import { Hit } from '@algolia/client-search';

type SearchRecord = {
  product: string;
  title: string;
  keywords: string[];
  description: string;
  content: string;
  headings: string[];
  contributors: string[];
  excerpt: string;
  image: string;
  url: string;
};

type WithAutocompleteAnalytics<THit> = THit & {
  __autocomplete_indexName: string;
  __autocomplete_queryID: string;
};

export type SearchHit = WithAutocompleteAnalytics<Hit<SearchRecord>>;
