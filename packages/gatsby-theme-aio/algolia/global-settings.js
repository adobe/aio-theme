// These are the search settings that determine which records are retrieved from the site's index.
// These settings determine the relevance, order, and content of the search results shown on the screen.

module.exports = {
  ALGOLIA_SEARCH_SETTINGS: {
    searchableAttributes: [
      'title',
      'contentHeading',
      'unordered(description)',
      'unordered(excerpt)',
      'unordered(content)',
    ],
    advancedSyntax: true,
    allowTyposOnNumericTokens: true,
    attributeForDistinct: 'title',
    attributesForFaceting: ['product', 'category', 'keywords'],
    attributesToHighlight: ['title', 'description', 'contentHeading', 'content', 'excerpt'],
    attributesToRetrieve: ['*'],
    attributesToSnippet: ['content:20', 'description:20', 'excerpt:20'],
    camelCaseAttributes: ['contentHeading', 'description', 'excerpt'],
    customRanking: ['desc(featured)', 'desc(new)', 'desc(updated)', 'desc(size)'],
    distinct: 1,
    hitsPerPage: 20,
    ignorePlurals: true,
    minProximity: 1,
    minWordSizefor1Typo: 4,
    minWordSizefor2Typos: 8,
    ranking: ['typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom'],
    removeWordsIfNoResults: 'none',
    responseFields: ['*'],
    restrictHighlightAndSnippetArrays: false,
    snippetEllipsisText: '…',
    typoTolerance: true,
  },
};
